import React from 'react'
import {useHttp} from "../../hooks/http.hook";

const {request} = useHttp()


export const NotesState = ({children}) => {

  const initialState = {
    notes: []
  }

  const [state, dispatch] = useReducer()


  const fetchNotes = async () => {

  }

}