import axios, {  AxiosResponse } from 'axios';
import AuthCheckToken from '../auth/authCheck';
import { HttpStatusCode } from './HttpStatusEnum';
import { loginResponse } from './loginResponse';
import loginType from './loginType';
import Cookies  from 'js-cookie';


const getAuthTokens = ():ICookieProps => {
  return Object.fromEntries(document.cookie.split(";").map(e => e.trim().split("=")))
}

export const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URI || 'https://auth.corp.tatneft.ru/api/',
  timeout: 15000,
});

type CookieKeys = "access_token" | "refresh_token"

type ICookieProps = {
  [k in CookieKeys]:string
}

AxiosInstance.interceptors.request.use(
  (config) => {
    const { access_token } = getAuthTokens()
    if(access_token !== undefined){
      //@ts-ignore
      config.headers["Authorization"] = `Bearer ${access_token}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

AxiosInstance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) =>{
    let cookies:ICookieProps = Object.fromEntries(document.cookie.split(";").map(e => e.trim().split("=")))
    switch (error.response.status) {
      case HttpStatusCode.Unauthorized:
       try {
         const date = new Date()
         date.setMinutes(date.getMinutes() + 30)
          await AuthCheckToken.refresh_token(cookies.refresh_token).then((tokens) => {
            for(let [key, value] of Object.entries(tokens)){
              Cookies.set(key,value,{
                secure:true,
                sameSite:"strict",
                expires:(key as CookieKeys) === 'refresh_token' ? new Date().getDay() + 30 : date
              })
            }
          })
          return true
       } catch (error) {
         document.location.href = "/"
       }
       return
      default:
        break;
    }
  }
)

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => AxiosInstance.get(url).then(responseBody),
  post: (url: string, body: {}) => AxiosInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => AxiosInstance.put(url, body).then(responseBody),
  delete: (url: string) => AxiosInstance.delete(url).then(responseBody),
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