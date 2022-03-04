import { ReactChild, useLayoutEffect, useState,FC } from "react"
import { Card, Avatar, Layout as LAntd,Menu as MAntd, Typography, Dropdown} from "antd"
import routes, { IRoutesProp } from "../../Routing/routs"
import Routing from "../../Routing"
import { Link, RouteObject, useLocation } from "react-router-dom"
import { LogoIcon, ShortLogoIcon } from "../../Pages/Login"
import "./layoutStyle.css"
import { LogoutOutlined, QuestionOutlined, SettingTwoTone } from "@ant-design/icons"
import loginApi from "../../Services/login/loginService"



const { Header, Content, Footer, Sider } = LAntd
const { Meta,Grid } = Card
const { Text:T } = Typography


const { SubMenu,Item:MItem } = MAntd;


const createMenu = (routes:Array<IRoutesProp>,initialKey = 0) => {
  return routes.map((item,key) => {
    if(item.children){
      return <SubMenu title={item.title} key={`sub${initialKey + key}`}>
        { createMenu(item.children,key) }
      </SubMenu>
    }
    if(item.path && item.title){
      return <MItem key={item.path === "" ? "/" : item.path} icon={item.icon} ><Link to={item.path}>{ item.title }</Link></MItem>
    }
    return false
  })
}

const userSettings = (
    <MAntd style={{ width:150 }}>
      <MItem key={"0"} className="logout-user" onClick={() => loginApi.logout()}>
        <T><LogoutOutlined/> <T style={{ textAlign:"center",width:"100%",display:"inline-block" }}>Выход</T></T>
      </MItem>
    </MAntd>
  )

const Layout = ({ children }:{ children?:Array<ReactChild> }) => {
  
  const { pathname } = useLocation()

  const [ currentItem, setCurrentItem ] = useState<string>(pathname)
  const [ collapsed, setCollapsed ] = useState<boolean>(false)
  const collapsedWidth = 70

  useLayoutEffect(() => {
    setCurrentItem(pathname)
  },[pathname])

  return(
   <LAntd hasSider style={{ height:"100%" }}>
     <Sider theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={e => setCollapsed(e)}
      collapsedWidth={collapsedWidth}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0
      }}
      className="custom-layout-sider"
    >
    <div className="logo" style={{ height: 32, margin: 16,display:"flex",justifyContent:"center" }}>
      {
        collapsed 
          ? <ShortLogoIcon style={{ width:collapsed ? `50%` : `100%` }}/>
          : <LogoIcon />
      }
    </div>
      <MAntd mode="inline" className="navigation-menu" defaultOpenKeys={[currentItem]} selectedKeys={[currentItem]}>
        { createMenu(routes) }
      </MAntd>
    </Sider>
    <LAntd className="site-layout" style={{ marginLeft:collapsed ? 70 : 200 ,backgroundColor:"#f0f0f0",transition:"all .4s ease"}}>
      <Header className="site-layout-background header custom-header">
        <div style={{ flex:"1 1 0%" }}></div>
        <Card style={{ width: 250,height:"100%",padding:0,margin:0 }}>
          <Avatar icon={<QuestionOutlined />} />
          <T className="name-user">Иван Иванович</T>
          <Dropdown overlay={userSettings} trigger={["click"]} >
            <SettingTwoTone style={{ cursor:"pointer",fontSize:20 }}/>
          </Dropdown>
        </Card>
      </Header>
      <Content className="content"  style={{ margin: '24px 16px 0', overflow: 'initial',height:"100%" }}>
        <div className="site-layout-background inside-content" style={{ padding: 24, textAlign: 'center',background: "#fff",height:"100%" }}>
          <Routing routes={routes as Array<RouteObject>} />
        </div>
      </Content>
    </LAntd>
   </LAntd>
  )
}

export default Layout