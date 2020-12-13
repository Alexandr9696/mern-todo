import React, {useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import {AlertContext} from "../context/alert/alertContext";

export const Login = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const {show} = useContext(AlertContext)
  const {loading, request} = useHttp()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  // обработка inputs
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value} )
  }

  // авторизация
  const loginHandler = async () => {
    try {
      const data = await request('/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
      history.push('/')
    } catch (e) {
      show(e.message, 'danger')
    }
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h1 className='text-center mb-2'>Авторизация</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">Введите email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Введите пароль</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={form.password}
              onChange={changeHandler}
            />
          </div>
        </form>
        { !loading ?
          <button
            className="btn btn-primary"
            onClick={loginHandler}
          >
            Войти
          </button>
          :
          <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-grow spinner-grow-sm mr-2" role="status" aria-hidden="true" />
            Войти
          </button>
        }
      </div>
    </div>
  )
}