import React from 'react'
import styles from "../CssModules/authLoader.css"

function AuthLoader() {
  return (
    <div className='auth-loader'>
      <div className='loader'></div>
      <div className="content"></div>
    </div>
  )
}

export default AuthLoader