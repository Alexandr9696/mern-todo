import React from 'react'

export const NoteForm = ({addNote, formHandler, form}) => {

  return (
    <>
        <div className="form-group">
          <h1 className='mb-2'>Добавьте заметку</h1>
          <input type="text"
                 name="title"
                 className="form-control"
                 placeholder='Введите название заметки'
                 value={form.title}
                 onChange={formHandler}
          />
          <button className='btn btn-success mt-2' onClick={addNote}>Добавить</button>
        </div>
    </>
  )
}