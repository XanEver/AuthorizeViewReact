import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { Fragment } from 'react'
import { CSSProperties } from 'react'
import SiderLogo from '../Layout/Logo'
import LeftSideMenu from '../LeftSideMenu'

type LeftSideProps = {
  style?:CSSProperties,
  collapsible?:boolean,
  collabsed:boolean,
  onCollabsed?:(collabsed:boolean) => void
}

function LeftSide({collapsible = false,collabsed,style,onCollabsed} : LeftSideProps) {
  return (
    <aside style={{...style}} className={collabsed ? "leftSider collabsed" : "leftSider"}>
      <div style={{ display:"flex",alignItems:"center",flexGrow:"1" }}>
        <SiderLogo collapsed={collabsed} style={{ flexGrow:"1" }}/>
      </div>
      <LeftSideMenu >

      </LeftSideMenu>
      <Fragment>
        <input type="checkbox" hidden name="" id="#menuCheckBoxCollabed" checked={collabsed} onChange={(e) => onCollabsed && onCollabsed(e.currentTarget.checked)}/>
        <label style={{alignSelf:"center",cursor:"pointer"}} htmlFor="menuCheckBoxCollabed" onClick={() => onCollabsed && onCollabsed(!collabsed)}>
          {
            collabsed 
              ? <RightOutlined/>
              : <LeftOutlined />
          }
        </label>
      </Fragment>
    </aside>
  )
}

export default LeftSide