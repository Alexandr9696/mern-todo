import React from 'react'
import {NavLink} from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className='navbar navbar-dark navbar-expand-lg bg-primary mb-3'>
      <div className='navbar-brand'>
        Note App
      </div>

      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/">Главная</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">Информация</NavLink>
        </li>
      </ul>
    </nav>
  )
}