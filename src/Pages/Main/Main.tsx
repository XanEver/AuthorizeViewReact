import React from 'react';
import {Button} from "antd";
import loginApi from "../../Services/login/loginService";
import Cookies from 'js-cookie';

function Main() {
  
    const checkToken = async ():Promise<void> => {
      const access_token = Cookies.get("access_token")
      //@ts-ignore
      await loginApi.validate(access_token)
      
    }
  

    return (
    <>
      <Button type="primary" onClick={checkToken}>Проверить валидность токена</Button>
    </>
    );
}
export default Main;