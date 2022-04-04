import React from 'react'
import  "../CssModules/authLoader.css";

function AuthLoader() {
  return (
    <div className='auth-loader'>
      <div className='loader'></div>
      <div className="content">Авторизация...</div>
    </div>
  )
}

export default AuthLoader