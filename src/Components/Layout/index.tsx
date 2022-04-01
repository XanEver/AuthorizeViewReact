import { ReactChild, useLayoutEffect, useState } from "react"
import { Layout as LAntd } from "antd"
import Routing, { IRoutesProp } from "../../Routing"
import { RouteObject, useLocation } from "react-router-dom"
import "./layoutStyle.css"
import UserPanel from "./UserPanel"
import SiderLogo from "./Logo"
import LeftSiderMenu from "./LeftSiderMenu"



const { Header, Content, Sider } = LAntd


interface ILayout{
  children?:Array<ReactChild>;
  routes:Array<IRoutesProp>
}

const Layout = ({ routes }:ILayout) => {
  
  const { pathname } = useLocation()

  const [ currentItem, setCurrentItem ] = useState<string>(pathname)
  const [ collapsed, setCollapsed ] = useState<boolean>(false)
  const collapsedWidth = 70

  useLayoutEffect(() => {
    setCurrentItem(pathname)
  },[pathname])

  
  

  return(
   <LAntd hasSider style={{ height:"100%" }}>
     <Sider theme="light" collapsible className="custom-layout-sider"
      collapsed={collapsed} onCollapse={e => setCollapsed(e)} collapsedWidth={collapsedWidth}
    >
      <SiderLogo collapsed={collapsed}/>
      <LeftSiderMenu routes={routes} currentItem={currentItem}/>
    </Sider>
    <LAntd className="site-layout" style={{ marginLeft:collapsed ? 70 : 200 ,backgroundColor:"#f0f0f0",transition:"all .2s"}}>
      <Header className="site-layout-background header custom-header">
        <div style={{ flex:"1 1 0%" }}></div>
        <UserPanel/>
      </Header>
      <Content className="content"   style={{ margin: '24px 16px 0', overflow: 'initial',height:"100%" }}>
        <div className="site-layout-background inside-content" style={{ padding: 24, textAlign: 'center',background: "#fff",height:"100%" }}>
          <Routing routes={routes as Array<RouteObject>} />
        </div>
      </Content>
    </LAntd>
   </LAntd>
  )
}

export default Layout