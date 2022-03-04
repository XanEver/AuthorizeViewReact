import axios, { AxiosResponse } from 'axios';
import AuthCheckToken from '../auth/authCheck';
import { HttpStatusCode } from './HttpStatusEnum';
import { loginResponse } from './loginResponse';
import loginType from './loginType';
import Cookies  from 'js-cookie';


const getAuthTokens = ():ICookieProps => {
  return Object.fromEntries(document.cookie.split(";").map(e => e.trim().split("=")))
}

export const instance = axios.create({
  baseURL: 'https://auth.corp.tatneft.ru/api/',
  timeout: 15000,
});

interface ICookieProps{
  [key:string]:string | undefined,
  access_token?:string,
  refresh_token?:string
}

instance.interceptors.request.use(
  (config) => {
    const { access_token } = getAuthTokens()
    if(access_token !== undefined){
      // @ts-ignore
      config.headers["Authorization"] = `Bearer ${access_token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  (config) => {
    return config
  },
  (error) =>{
    let cookies:ICookieProps = Object.fromEntries(document.cookie.split(";").map(e => e.trim().split("=")))
    switch (error.response.status) {
      case HttpStatusCode.Unauthorized:
       try {
         const date = new Date()
         date.setMinutes(date.getMinutes() + 30)
          AuthCheckToken.refresh_token(cookies.refresh_token).then(tokens => {
            Object.keys(tokens).map((nameToken:keyof ICookieProps) => {
              //@ts-ignore
              return Cookies.set(nameToken,tokens[nameToken],{
                secure:true,
                expires:nameToken === "refresh_token" ? new Date().getDay() + 30 : date,
                sameSite:"strict"
              })
            })
          })
          return true
       } catch (error) {
         document.location.href = "/"
       }
      break;
      default:
        break;
    }
  }
)

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

export interface IRefreshToken{
  result:{
    access_token:string,
    refresh_token:string,
    userName:string
  },
  success:boolean
}



const loginApi = {
  login: (login: loginType): Promise<loginResponse> => requests.post('login', login),
  validate: (token: string): Promise<boolean> => requests.get(`tokens/${token}/validate`),
  refresh: (refresh_token: string): Promise<IRefreshToken> => requests.get(`tokens/${refresh_token}/refresh`),
  logout: (): void => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")
    document.location.reload();
  }
};
export default loginApi;