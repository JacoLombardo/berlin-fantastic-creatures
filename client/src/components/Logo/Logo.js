import React from 'react'
import logo from '../../Images/logo/favicon.png'
import '../../style/style.css'

function Logo() {
  return (
      <>
          <div className="logoDiv">
              <img src={logo} className="logoImg" alt="logo" />
          </div>
      </>
  )
}

export default Logo