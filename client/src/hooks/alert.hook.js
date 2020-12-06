import {useState} from 'react'

export const useAlert = () => {

  const initialState = {
    text: '',
    type: '',
    visible: false
  }

  const [alert, setAlert] = useState(initialState)

  const show = (text, type) => {
    setAlert({
      text, type,
      visible: true,
    })
  }

  const hide = () => {
    setAlert(initialState)
  }

  return { alert, show, hide }
}