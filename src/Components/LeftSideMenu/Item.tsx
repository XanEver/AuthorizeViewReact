import React from 'react'

type ItemType = {
  title?:string,
  key?:string,
  icon?:any
}

function Item({icon,key,title} : ItemType) {
  return (
    <li className='leftSideMenu-item'>
      {
        icon && <span className='leftSideMenu-item-icon'></span>
      }
      <span className='leftSideMenu-item-content'>Item</span>
    </li>
  )
}

export default Item