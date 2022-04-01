import { RouteObject, useRoutes } from 'react-router-dom'
import PageNotFound from '../Pages/PageNotFound'


export interface IRouting {
    routes:Array<RouteObject>
}

const pageNotF:RouteObject = {
  path:"*",
  element:<PageNotFound/>
}

export interface IRoutesProp extends RouteObject{
  title?:string
  icon?:any
  children?:Array<IRoutesProp | RouteObject>
}

const Routing = ({routes}:IRouting) => useRoutes([pageNotF,...routes].map(r => r))

export default Routing;