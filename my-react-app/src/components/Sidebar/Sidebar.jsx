import React from "react"
import './Sidebar.css'
import favoriteIcon from '../../../public/icons8-heart-50.png'
import addImageIcon from '../../../public/icons8-add-image-64.png'
import imageIcon from '../../../public/icons8-image-64.png'
import logoutIcon from '../../../public/icons8-logout-50.png'

export default function Sidebar() {

    return (
     <div className="div-sidebar">
        <div className="container-sidebar">
            <ul className="sidebar-list">
                <li><img src={imageIcon} alt="all images" /></li>
                <li><img src={favoriteIcon} alt="favorite images" /></li>
                <li><img src={addImageIcon} alt="add image" /></li>
                <li><img src={logoutIcon} alt="logout" /></li>
            </ul>
        </div>
     </div>
    )
  }