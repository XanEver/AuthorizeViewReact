import jwt_decode, { JwtPayload } from "jwt-decode"
import loginApi, { IRefreshToken } from "../login/loginService";

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
      const respTokens = await loginApi.refresh(refresh_token)
      Object.keys(respTokens.result).forEach((e) => {
        const key = e.split("").map(char => char.toUpperCase() ===  char ? `_${char.toLowerCase()}` : char).join("")
        //@ts-ignore
        delete Object.assign(respTokens.result,{[key]:respTokens.result[e]})[e]
      })
      
      return respTokens.result
    }
    document.location.href = '/'
    throw new Error("Токен обновления либо отсутствует, либо неверный")
    
  }
}


export default AuthCheckToken