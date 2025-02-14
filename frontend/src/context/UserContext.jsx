import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [email, setEmail] = useState(() => localStorage.getItem('email') || null)

  const { VITE_APIURL: APIURL } = import.meta.env

  const login = async (email, password) => {
    try {
      const response = await fetch(`${APIURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Error en la autenticación')
      }

      const data = await response.json()
      setToken(data.token)
      setEmail(email)
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', email)
    } catch (error) {
      console.error('Error en login:', error.message)
      alert('Error en login: ' + error.message)
    }
  }

  const register = async (email, password) => {
    try {
      const response = await fetch(`${APIURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Error en el registro')
      }

      const data = await response.json()
      setToken(data.token)
      setEmail(email)
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', email)
    } catch (error) {
      console.error('Error en registro:', error.message)
      alert('Error en registro: ' + error.message)
    }
  }

  const logout = () => {
    setToken(null)
    setEmail(null)
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  }

  const getProfile = async () => {
    try {
      const response = await fetch(`${APIURL}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        throw new Error(data.message || 'Failed to fetch profile')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      alert(error.message)
    }
  }

  return (
    <UserContext.Provider value={{ token, email, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContext(UserContext)
