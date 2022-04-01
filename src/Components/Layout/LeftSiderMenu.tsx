import React from 'react'
import { Menu } from "antd";
import { Link } from 'react-router-dom';
import { IRoutesProp } from '../../Routing';

const { SubMenu,Item } = Menu

type LeftSiderMenuType = {
  routes:Array<IRoutesProp>,
  currentItem:string,
}

const LeftSiderMenu = ( { routes, currentItem }:LeftSiderMenuType )  => {
  const createMenu = (routes:Array<IRoutesProp>,initialKey = 0) => {
    return routes.map((item,key) => {
      return item.children 
        ? <SubMenu title={item.title} key={`sub_${key}`} >
            { createMenu(item.children,key) }
          </SubMenu>
        : item.path && item.title 
        ? <Item key={item.path === "" ? "/" : item.path} icon={item.icon}><Link to={item.path}>{ item.title }</Link></Item>
        : false
    })
  }
  return (
    <Menu mode="inline" className="navigation-menu" defaultSelectedKeys={[currentItem]} >
      { createMenu(routes) }
    </Menu>
  )
}

export default LeftSiderMenu;