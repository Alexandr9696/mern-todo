import React, {useState} from "react"
import {useHttp} from "../hooks/http.hook";

export const Register = () => {

  const {loading, error, request, clearError} = useHttp()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    repassword: ''
  })

  // обработка inputs
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value} )
  }


  // регистрация
  const registerHandler = async () => {
    try {
      const data = await request('/auth/register', 'POST', {...form})
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h1 className='text-center mb-2'>Регистрация</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Введите имя</label>
            <input
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={form.name}
              onChange={changeHandler}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="repassword">Введите повторно пароль</label>
            <input
              id="repassword"
              name="repassword"
              type="password"
              className="form-control"
              value={form.repassword}
              onChange={changeHandler}
            />
          </div>
        </form>
        <button
          className="btn btn-primary"
          onClick={registerHandler}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  )
}