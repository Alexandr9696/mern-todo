import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [ready, setReady] = useState(false)

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken)
    setUserId(id)
    // запись в localStorage
    localStorage.setItem(storageName, JSON.stringify({
      userId, token
    }))

    console.log('useAuth - token', token)
    console.log('useAuth - userId', userId)
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    // очистка localStorage
    localStorage.removeItem(storageName)
  }, [])

  // если в localStorage есть данные то записать их в переменные
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId)
    }

    setReady(true)

  }, [login])


  return {login, logout, token, userId, ready}
}