import React from 'react'
import {Route, Switch} from "react-router";
import {Home} from "./pages/Home";
import {NoteList} from "./pages/NoteList";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";


export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route exact path='/notes'>
          <NoteList/>
        </Route>
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route exact path='/auth/register'>
        <Register/>
      </Route>
      <Route exact path='/auth/login'>
        <Login/>
      </Route>
    </Switch>
  )
}