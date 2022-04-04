import React, { CSSProperties, FC } from 'react'
import Item from './Item'
import SubMenu from './SubMenu'

type LeftSideMenuType = {
  children?:Array<other>
  style?:CSSProperties
  collabsed?:boolean
  onCollabse?:((collabed:boolean) => void)
}

type other = {
  Item:typeof Item,
  SubMenu:typeof SubMenu
}

const LeftSideMenu : FC<LeftSideMenuType> & Required<other> = ({children,style}) => {
  return (
    <ul className='leftSideMenu' style={style}>
      <Item/>
      { children }
    </ul>
  )
}

LeftSideMenu.Item = Item;
LeftSideMenu.SubMenu = SubMenu;

export default LeftSideMenu