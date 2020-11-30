import React, {useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const Login = () => {
  const auth = useContext(AuthContext)

  const {loading, error, request, clearError} = useHttp()

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
      console.log('Вы авторизованы')
      console.log(data.token)
      console.log(auth.token)
    } catch (e) {
      throw e
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
        <button
          className="btn btn-primary"
          onClick={loginHandler}
        >
          Войти
        </button>
      </div>
    </div>
  )
}