import React, {useEffect, useState} from 'react'

export const About = () => {

  const [state, setState] = useState('')

  useEffect(() => {
    fetch('/about')
      .then(res => res.json())
      .then(title => setState(title))
  })

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">Лучшее React приложение</h1>
        <h1 className="display-4">{state}</h1>
        <p className="lead">Версия приложения <strong>1.0.42</strong></p>
      </div>
    </div>
  )
}

