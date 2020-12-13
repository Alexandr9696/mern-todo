import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {useRoutes} from "./routes";
import {Loader} from "./components/Loader";
import {Alert} from "./components/Alert";
import {AlertState} from "./context/alert/AlertState";


function App() {
  const {name, login, logout, token, userId, ready} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader/>
  }

  return (
    <AuthContext.Provider value={{
      name, token, login, logout, userId, isAuthenticated
    }}>
      <AlertState>
        <BrowserRouter>
          <Navbar/>
          <div className='container'>
            <Alert/>
            {routes}
          </div>
        </BrowserRouter>
      </AlertState>
    </AuthContext.Provider>
  )
}

export default App;
