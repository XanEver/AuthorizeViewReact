import React, {  useState, FC, useEffect, Fragment, useLayoutEffect } from "react"
import {  useCookies } from "react-cookie";
import AuthorizedView from "./AuthorizedView";
import NonAuthorizedView from "./NonAuthorizedView";
import AuthCheckToken from "../../Services/auth/authCheck";
import { useLocation } from "react-router-dom";
import NonAuthView from "./NonAuthorizedView";



interface AuthViewProps {
  readonly children:[JSX.Element,JSX.Element]
}

type TokenNames = "access_token" | "refresh_token"

type ICookieProps = {
  [key in TokenNames]:string
}

type AuthUser = typeof AuthorizedView;
type NonAuthUser = typeof NonAuthorizedView

interface AuthViewComposition{
  AuthorizedView:AuthUser;
  NonAuthorizedView:NonAuthUser;
}

const AuthView : FC<Required<AuthViewProps>> & Required<AuthViewComposition> = ({ children }) => {
  const { pathname } = useLocation();
  const [ ,setCookie,removeCookie ] = useCookies(["access_token","refresh_token"])
  const [ ,setIsAuthorized ] = useState<boolean>(false);
  const initValue = children.filter(child => child.type.name === "AuthorizedView")[0]
  const [ renderComponent, setRenderComponent ] = useState<JSX.Element>(initValue);

  const setAuthToken = ({access_token, refresh_token}:ICookieProps) => {
    setCookie("access_token",access_token,{maxAge:60*30,sameSite:"strict",secure:true})
    setCookie("refresh_token",refresh_token,{maxAge:2592000,sameSite:"strict",secure:true})
  }

  const removeAuthToken = () => {
    removeCookie("access_token")
    removeCookie("refresh_token")
  }

  const AuthCheck = async ():Promise<boolean> => {
    const cookie:ICookieProps = Object.fromEntries(document.cookie.split(";").map(e => e.trim().split("=")))
    const check = await AuthCheckToken.checkAccessToken(cookie.access_token,cookie.refresh_token)
    if(check === "Alive"){
      return true;
    }else if(check === "Expired"){
      try{
        const newToken = await AuthCheckToken.refresh_token(cookie.refresh_token)
        setAuthToken(newToken)
        return true;
      }catch (e) {}
    }
    removeAuthToken();
    return false;
  }


  useLayoutEffect(() =>{
    let existComponetns:Partial<["AuthorizedView" | "NonAuthView","AuthorizedView" | "NonAuthView"]> = [];
    children.forEach(child => {
      const dN = (child.type.displayName as string)
      if(dN === "AuthorizedView" || dN === "NonAuthView"){
        existComponetns.push(dN)
      }else{
        throw new Error("В компоненте разрешены только составные компоненты.")
      }
    })
    if(existComponetns[0] === existComponetns[1]){
      throw new Error("AuthorizedView и NonAuthView компоненты должны быть реализованы единожды.")
    }
  })

  useEffect(() => {
    AuthCheck().then(r => {
      setIsAuthorized(r)
      if(r){
        setRenderComponent(children.filter(child => child.type.name === "AuthorizedView")[0])
      }else{
        setRenderComponent(children.filter(child => child.type.name === "NonAuthView")[0])
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pathname])

  return (
    <Fragment>
      { renderComponent }
    </Fragment>
  )
}

AuthView.AuthorizedView = AuthorizedView
AuthView.NonAuthorizedView = NonAuthView

export {AuthView}
