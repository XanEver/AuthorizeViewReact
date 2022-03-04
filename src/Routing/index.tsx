import { RouteObject, useRoutes } from 'react-router-dom'


export interface IRouting {
    routes:Array<RouteObject>
}

function Routing({routes}:IRouting)
{
  let elements = useRoutes(routes)
    
  return elements
}

export default Routing;