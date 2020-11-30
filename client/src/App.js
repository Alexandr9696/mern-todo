import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {Route, Switch} from "react-router";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";

function App() {
  const {login, logout, token, userId, ready} = useAuth()
  const isAuthenticated = !!token
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        <Navbar/>
        <div className='container'>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/about'>
              <About/>
            </Route>
            <Route exact path='/auth/register'>
              <Register/>
            </Route>
            <Route exact path='/auth/login'>
              <Login/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
