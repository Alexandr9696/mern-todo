import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {NoteForm} from "../components/NoteForm";
import {NoteList} from "../components/NoteList";
import {useAlert} from "../hooks/alert.hook";
import {Alert} from "../components/Alert";


export const NotePage = () => {
  const {token} = useContext(AuthContext)
  const {request} = useHttp()
  const {alert, hide, show} = useAlert()

  const [notes, setNotes] = useState([])
  const [form, setForm] = useState({
    title: ''
  })

  const formHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const fetchNotes = useCallback(async () => {
    try {
      const fetched = await request('/note/list', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setNotes(fetched)
    } catch (e) {}
  }, [token, request])

  const addNote = async () => {
    try {
      const data = await request('/note/add', 'POST', {...form}, {
        Authorization: `Bearer ${token}`
      })
      setNotes(data)
      setForm({title: ''})
    } catch (e) {
      console.log(e.message, e.type)
      // show(e.message, e.type)
      // setTimeout(() => {
      //   hide()
      // }, 2000)
    }
  }

  const removeNote = async (id) => {
    try {
      const data = await request('/note/remove', 'POST', {id}, {
        Authorization: `Bearer ${token}`
      })
      setNotes(data)
    } catch (e) {}
  }


  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])


  return (
    <>
      <Alert alert={alert} hide={hide}/>
      <NoteForm
        addNote={addNote}
        formHandler={formHandler}
        form={form}
      />

      <hr />
      <h3>Список ваших заметок:</h3>

      {
        <NoteList notes={notes} removeNote={removeNote}/>
      }
    </>
  )
}

