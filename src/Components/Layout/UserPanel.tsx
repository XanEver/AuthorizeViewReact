import { LogoutOutlined, SettingTwoTone } from "@ant-design/icons";
import { Avatar, Card, Dropdown, Menu, Spin, Tooltip, Typography } from "antd";
import { useEffect, useState } from "react";
import loginApi from "../../Services/login/loginService";
import userApi from "../../Services/user/userService";
import { AuthUserType } from "../../Services/user/userTypes";

const { Text:T } = Typography
const { Item } = Menu

const UserPanel = () => {

  const [userInfo,setUserInfo] = useState<AuthUserType>()

  const userSettings = (
    <Menu style={{ width:150 }}>
      <Item key={"0"} className="logout-user" onClick={() => loginApi.logout()}>
        <T><LogoutOutlined/> <T style={{ textAlign:"center",width:"100%",display:"inline-block" }}>Выход</T></T>
      </Item>
    </Menu>
  )

  useEffect(() => { userApi.getInfo().then(res => setUserInfo(res.result)) },[])

  return(
    <Card style={{ width: 250,height:"100%",padding:0,margin:0 }}>
      <Spin spinning={userInfo === undefined} wrapperClassName="user-panel-spin">
        <Avatar icon={ userInfo?.firstName[0] } />
        <Tooltip placement="bottom" title={`${userInfo?.lastName} ${userInfo?.firstName} ${userInfo?.middleName}`}>
          <T className="name-user">{ userInfo?.shortName }</T>
        </Tooltip>
        <Dropdown overlay={userSettings} trigger={["click"]} >
          <SettingTwoTone style={{ cursor:"pointer",fontSize:20 }}/>
        </Dropdown>
      </Spin>
    </Card> 
  )
}

export default UserPanel;