import First from '../Pages/First/First';
import Main from '../Pages/Main/Main';
import Second from '../Pages/Second/Second';
import {Navigate, RouteObject} from "react-router-dom";
import { HomeOutlined, InfoOutlined } from '@ant-design/icons';


export interface IRoutesProp extends RouteObject{
  title?:string
  icon?:any
  children?:Array<IRoutesProp | RouteObject>
}

const routes:Array<IRoutesProp> = [
    {path:'/', element: <Main/>,title:"Главная",caseSensitive:true,icon:<HomeOutlined />},
    {path:'/first', element:<First/>,title:"Первая страница",icon:<InfoOutlined />},
    {path:'/second', element: <Second/>,title:"Вторая страница"},
    {path: "/login",element: <Navigate to={"/"} />},
    {title:"Ну типа саб элемент",children:[{path:'/anyPage',title:"саб элемент"}]}
 ];
 
export default routes;