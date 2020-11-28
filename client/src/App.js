import React from 'react'
import {BrowserRouter} from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {Route, Switch} from "react-router";
import {Home} from "./pages/Home";
import {About} from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className='container'>
        <Switch>
          <Route exact path={'/'} component={Home}/>
          <Route path={'/about'} component={About}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
