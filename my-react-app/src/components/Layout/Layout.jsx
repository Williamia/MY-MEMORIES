import React from "react"
import Menu from "../Menu/Menu"
import Footer from "../Footer/Footer"
import './Layout.css'

export default function Layout({ children }) {

    return (
     <div className="layout-div">
        <Menu />
            {children}
        <Footer />
     </div>
    )
  }