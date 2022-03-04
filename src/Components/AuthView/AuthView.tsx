import React, { ReactElement, useState, FC, useEffect,ReactFragment } from "react"
import { withCookies, useCookies } from "react-cookie";
import AuthorizedView from "./AuthorizedView";
import NonAuthorizedView from "./NonAuthorizedView";
import AuthCheckToken from "../../Services/auth/authCheck";
import { useLocation } from "react-router-dom";

type AuthUser = typeof AuthorizedView;
type NonAuthUser = typeof NonAuthorizedView;

interface AuthViewProps {
  children:[ReactElement<AuthUser>,ReactElement<NonAuthUser>],
  nonAuthComponent?:Array<ReactElement>
}

interface IAuthToken {
  access_token:string|undefined,
  refresh_token:string|undefined
}

interface ICookieProps{
  [key:string]:string
}

const AuthView : FC<AuthViewProps> = ({children,nonAuthComponent}:AuthViewProps) => {
  const { pathname } = useLocation();
  const [ ,setCookie,removeCookie ] = useCookies(["access_token","refresh_token"])
  const [ isAuthorized,setIsAuthorized ] = useState(true);
  
  const setAuthToken = ({access_token, refresh_token}:IAuthToken) => {
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
      }catch (e) {
      }
    }
    removeAuthToken();
    return false;
  }
  
  


  useEffect(() => {
    AuthCheck().then(r => setIsAuthorized(r))
  },[pathname])

  
  return (
    <React.Fragment>
      {
        isAuthorized 
          ? <AuthorizedView>
            { children }
          </AuthorizedView> 
          : nonAuthComponent !== undefined 
            ? nonAuthComponent
            : <NonAuthorizedView/>
      }
    </React.Fragment>
  )
}


export default withCookies(AuthView);
