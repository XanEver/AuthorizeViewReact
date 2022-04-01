import { ReactChild, FC } from 'react'
import {Navigate, useRoutes} from "react-router-dom";
import Login from "../../Pages/Login";
import RediretionAuth from '../../Pages/Login/RedirectionAuth';

export interface INonAuthorizedProps {
  children?:
    | ReactChild
    | ReactChild[];
}



const NonAuthView:FC<INonAuthorizedProps> = ({children}:INonAuthorizedProps) => {
  const routing = useRoutes([
    {
      path:"/",
      element:children ? children : <RediretionAuth/>
    },
    {
      path:"*",
      element:<Navigate to={"/"} replace />
    }
  ])
  return routing
}

NonAuthView.displayName = "NonAuthView"
export default NonAuthView;
