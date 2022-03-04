import jwt_decode, { JwtPayload } from "jwt-decode"
import loginApi from "../login/loginService";

export enum ExpiredTokenEnum{Expired,Alive,None}

type ExpiredTokenStrings = keyof typeof ExpiredTokenEnum

const AuthCheckToken = {
  checkAccessToken:async (access_token:string | undefined,refresh_token:string | undefined):Promise<ExpiredTokenStrings> => { 
    if(access_token !== undefined){
      const jwtToken : JwtPayload = jwt_decode(access_token)
      if(jwtToken?.exp !== undefined && jwtToken?.exp > Math.floor(new Date().getTime() / 1000)){
        return "Alive"
      }
    }
    if(refresh_token !== undefined){
      return "Expired"
    }
    return "None"
  },
  refresh_token: async (refresh_token:string | undefined):Promise<{ access_token: string; refresh_token: string; }> => {
    if(refresh_token !== undefined){
      const newTokens = await loginApi.refresh(refresh_token).then(e => e)
      return newTokens.result;
    }
    document.location.href = '/'
    throw new Error("Токен обновления либо отсутствует, либо неверный")
    
  }
}

export default AuthCheckToken