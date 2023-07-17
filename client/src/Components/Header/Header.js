import React, { useEffect, useState } from 'react'
import './Header.css'
import {Link, useLocation} from 'react-router-dom'

const Header = () => {

  const [activeTab,setActiveTab] = useState("Home");


  return (
    <div className='header'>
        <p className='logo'>Gestion Produit</p>
        <div className='header-right'>
            <Link to="/">
              <p className={`${activeTab === "Home" ? "active" : ""}`} onClick={()=>setActiveTab("Home")}>Home</p>
            </Link>

            <Link to="/add">
              <p className={`${activeTab === "Ajouter" ? "active" : ""}`} onClick={()=>setActiveTab("Ajouter")}>Ajouter</p>
            </Link>
        </div>
    </div>
  )
}

export default Header