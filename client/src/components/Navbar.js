import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";


export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/auth/login')
  }

  return (
    <nav className='navbar navbar-dark navbar-expand-lg bg-primary mb-3'>
      <div className='navbar-brand'>
        Note App
      </div>

      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink exact className="nav-link" to="/">Главная</NavLink>
        </li>

        { auth.isAuthenticated ?
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/notes">Список задач</NavLink>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/" onClick={logoutHandler}>Выйти</a>
            </li>
          </> : null
        }
        { !auth.isAuthenticated ?
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/auth/register">Регистрация</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/auth/login">Войти</NavLink>
            </li>
          </> : null
        }
      </ul>
    </nav>
  )
}