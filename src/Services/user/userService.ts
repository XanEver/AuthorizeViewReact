import { AxiosResponse } from "axios";
import { AxiosInstance } from "../login/loginService";
import { AuthUserType } from "./userTypes";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => AxiosInstance.get(url).then(responseBody),
  post: (url: string, body: {}) => AxiosInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => AxiosInstance.put(url, body).then(responseBody),
  delete: (url: string) => AxiosInstance.delete(url).then(responseBody),
};

type getInfoType = {
  result:AuthUserType,
  success:boolean
}

const userApi = {
  getInfo: () : Promise<getInfoType> => requests.get(`app/${process.env.REACT_APP_INSTANCE_NAME}/user`),
}

export default userApi;