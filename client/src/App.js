import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {Route, Switch} from "react-router";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Register} from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/auth/register'>
            <Register />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
