import React, {useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useHistory} from "react-router-dom";
import {AlertContext} from "../context/alert/alertContext";


export const Reset = () => {
  const history = useHistory()
  const {show} = useContext(AlertContext)
  const {request} = useHttp()

  const [form, setForm] = useState({
    email: '',
  })

  // обработка inputs
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value} )
  }

  const resetHandler = async () => {
    try {
      const data = await request('/auth/reset', 'POST', {...form})
      show(data.message, 'success')
      history.push('/auth/login')
    } catch (e) {
      show(e.message, 'danger')
    }
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h1 className='text-center mb-2'>Забыли пароль?</h1>
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
        </form>
          <button
            className="btn btn-primary"
            onClick={resetHandler}
          >
            Сбросить пароль
          </button>
      </div>
    </div>
)
}