import { useContext, useEffect, useState } from 'react'
import LoggedUserContext from './loggedUserContext'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LogIn = () => {
  const navigate = useNavigate()

  const [login, loginDispatch] = useContext(LoggedUserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('login'))
    const autoLogin = async () => {
      const logged = await loginService.login(user)
      loginDispatch({ type: 'LOGIN', payload: { ...logged } })
    }
    user && autoLogin()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      if (!user) {
        throw new Error(console.error(user))
      }
      loginDispatch({ type: 'LOGIN', payload: { ...user } })
      localStorage.setItem('login', JSON.stringify({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }
  const handleLogout = () => {
    loginDispatch({ type: 'LOGOUT' })
    localStorage.removeItem('login')
    navigate('/')
  }

  return (
    <>
      {login === null
        ?
        <div className='container'>
          <h1 className='text-center'>log in to application</h1>
          <Form onSubmit={e => handleLogin(e)}>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>password</Form.Label>
              <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" >log in</Button>
          </Form>
        </div>
        :
        <div>
          <p>{login.name} logged in</p>
          <Button variant="danger" size="sm" onClick={handleLogout}>logout</Button>
        </div>
      }
    </>
  )
}

export default LogIn