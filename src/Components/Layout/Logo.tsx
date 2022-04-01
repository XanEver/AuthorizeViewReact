
import React from 'react'
import { LogoIcon, ShortLogoIcon } from '../../Pages/Login'

type LogoType = {
  collapsed: boolean;
}

const SiderLogo = ({ collapsed } : LogoType) => {

  return (
    <div className="logo" style={{ height: 32, margin: 16,display:"flex",justifyContent:"center" }}>
      {
        collapsed 
          ? <ShortLogoIcon style={{ width:collapsed ? `50%` : `100%` }}/>
          : <LogoIcon />
      }
    </div>
  )
}

export default SiderLogo;