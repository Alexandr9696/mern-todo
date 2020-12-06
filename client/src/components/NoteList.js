import React from 'react'
import {CSSTransition, TransitionGroup} from "react-transition-group";

export const NoteList = ({notes, removeNote}) => {


  if (!notes.length) {
    return <h2>Список заметок пуст</h2>
  }

  return (
    <TransitionGroup component='ul' className='list-group'>
      {
        notes.map(note => (
          <CSSTransition
            classNames={'note'}
            timeout={800}
            key={note._id}
          >
            <li
              className='list-group-item note'
              id={note._id}
            >
              <div>
                <strong>{note.title}</strong>

                <small>{note.date}</small>
              </div>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={event => removeNote(event.target.offsetParent.id)}
              >
                &times;
              </button>
            </li>
          </CSSTransition>
        ))
      }
    </TransitionGroup>
  )
}