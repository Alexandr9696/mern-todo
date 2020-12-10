import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {NoteForm} from "../components/NoteForm";
import {NoteList} from "../components/NoteList";
import {AlertContext} from "../context/alert/alertContext";


export const NotePage = () => {
  const {token} = useContext(AuthContext)
  const {request} = useHttp()
  const {show} = useContext(AlertContext)
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
    } catch (e) {
      show(e.message, 'danger')
    }
  }, [token, request])

  const addNote = async () => {
    try {
      const data = await request('/note/add', 'POST', {...form}, {
        Authorization: `Bearer ${token}`
      })
      setNotes(data.notes)
      setForm({title: ''})
      show(data.message, 'success')
    } catch (e) {
      show(e.message, 'danger')
    }
  }

  const removeNote = async (id) => {
    try {
      const data = await request('/note/remove', 'POST', {id}, {
        Authorization: `Bearer ${token}`
      })
      setNotes(data.notes)
      show(data.message, 'success')
    } catch (e) {
      show(e.message, 'danger')
    }
  }


  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return (
    <>
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

