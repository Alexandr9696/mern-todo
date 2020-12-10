import React, {useReducer} from 'react'
import {alertReducer} from "./alertReducer";
import {AlertContext} from "./alertContext";

export const AlertState = ({children}) => {

  const [state, dispatch] = useReducer(alertReducer, {visible: false})

  const show = (text, type = 'warning') => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: {text, type}
    })

    setTimeout(() => {
      hide()
    }, 5000)
  }

  const hide = () => dispatch({type: 'HIDE_ALERT'})

  return (
    <AlertContext.Provider value={{
      show, hide, alert: state
    }}>
      {children}
    </AlertContext.Provider>
  )
}