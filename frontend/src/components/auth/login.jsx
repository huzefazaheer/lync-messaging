import { useContext, useState } from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { appContext } from '../../App'

//TODO: add session login

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const app = useContext(appContext)

  const navigate = useNavigate()

  function handleLogin() {
    if (username == '') {
      setError('Please provide your username')
      return
    }
    if (!showPassword) {
      setShowPassword(true)
      return
    }
    if (password == '') {
      setError('Please provide your password')
      return
    }
    setError('')
    sendData()
  }

  async function sendData() {
    if (username == '' || password == '') return
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    const data = await response.json()
    console.log(data)
    if (data.error) {
      setError('Invalid username or password')
    } else {
      app.setUser(data.user)
      navigate('/')
    }
  }

  return (
    <>
      <img className={styles.logo} src="/logo.svg" alt="Lync messaging logo" />
      <div className={styles.authform}>
        <h1>Login to Lync</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="username" className={showPassword ? '' : styles.hidden}>
          Password
        </label>
        <input
          type="password"
          className={showPassword ? '' : styles.hidden}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={`${styles.error} ${error != '' ? '' : styles.hidden}`}>
          {error}
        </p>
        <button type="submit" onClick={handleLogin}>
          {showPassword ? 'Login' : 'Continue'}
        </button>
        <button type="submit" className={styles.secondary}>
          Continue as Guest
        </button>
        <p>
          Don't have an account?{' '}
          <span className={styles.link}>
            <Link to={'/signup'}>Sign Up</Link>
          </span>
        </p>
      </div>
    </>
  )
}
