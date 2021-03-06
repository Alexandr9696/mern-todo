import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useHistory, useParams} from "react-router-dom";
import {AlertContext} from "../context/alert/alertContext";


export const PasswordReset = () => {
  const {token} = useParams()
  const history = useHistory()
  const {show} = useContext(AlertContext)
  const {request} = useHttp()

  const [form, setForm] = useState({
    password: ''
  })

  const [state, setState] = useState({
    userId: '',
    token: ''
  })

  // получение токена и id
  const fetchToken = useCallback(async () => {
    try {
      const fetched = await request(`/auth/password/${token}`, 'GET')
      setState(fetched)
    } catch (e) {
      show(e.message, 'danger')
    }
  }, [token, request])

  useEffect(() => {
    fetchToken()
  }, [fetchToken])

  // обработка inputs
  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value} )
  }

  // изменение пароля
  const passwordHandler = async () => {
    try {
      const data = await request('/auth/password', 'POST', {...state, ...form})
      show(data.message, 'success')
      history.push('/auth/login')
    } catch (e) {
      show(e.message, 'danger')
    }
  }

  return (
    <div className="row">
      <div className="col-6 offset-3">
        <h1 className='text-center mb-2'>Задайте новый пароль</h1>
        <form>
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
          onClick={passwordHandler}
        >
          Сбросить пароль
        </button>
      </div>
    </div>
  )
}