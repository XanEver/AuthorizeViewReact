import { Spin } from "antd"
import { Fragment, useEffect, VFC } from "react"
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";


const RediretionAuth : VFC = () => {
  // const [,setCookie] = useCookies(["access_token", "refresh_token"])
  // const navigate = useNavigate();
  // let { search } = useLocation()

  // const setToken = (tokens: Array<{ [any: string]: string }>) => {
  //   const date = new Date();
  //   date.setDate(date.getHours() + ((60 * 60 * 1000) / 2))
  //   //@ts-ignore
  //   setCookie('access_token', tokens.access_token, { maxAge: 60 * 30, sameSite: "strict", secure: true })
  //   //@ts-ignore
  //   setCookie('refresh_token', tokens.refresh_token, { maxAge: 2592000, sameSite: "strict", secure: true })
  // }

  // useEffect(() => {
  //   if (search) {
  //     setToken(Object.fromEntries(search.replace("?", "").split("&").map(e => e.split("="))))
  //     document.location.href = '/'
  //   }else{
  //     const redirectURI= document.location.toString()
  //     document.location.href = `https://auth.corp.tatneft.ru/login?Url=${encodeURIComponent(redirectURI)}`
  //   }
  // }, [search])

  return(
    <Fragment>
      {
        <div style={{display:"flex",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",backgroundColor:"#f8fdff",transform:"scale(1.4)",overflow:"hidden"}}>
          <Spin tip="Авторизация"/>
        </div>
      }
    </Fragment>
  )
}

export default RediretionAuth;