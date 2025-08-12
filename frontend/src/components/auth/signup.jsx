import { useContext, useState } from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import checkPassword from '../../utils/checkPassword'
import { appContext } from '../../App'

//TODO add user response on signup

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  const app = useContext(appContext)

  const navigate = useNavigate()

  function handleSignup() {
    if (username == '') {
      setError('Please choose a username')
      return
    }
    if (!showPassword) {
      setShowPassword(true)
      return
    }
    if (password == '') {
      setError('Please create a password')
      return
    }
    const passwordSecurityError = checkPassword(password)
    if (passwordSecurityError) {
      setError(passwordSecurityError)
      return
    }
    if (password !== password2) {
      setError('Passwords do not match')
      return
    }
    setError('')
    sendRequest()
  }

  async function sendRequest() {
    if (username == '' || password == '') return
    const response = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: username,
        password: password,
        display_name: username,
      }),
    })
    const data = await response.json()
    if (data.error) {
      setError('Username already exists')
    } else {
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
      app.setUser(data.user)
      navigate('/')
    }
  }

  return (
    <>
      {' '}
      <img className={styles.logo} src="/logo.svg" alt="Lync messaging logo" />
      <div className={styles.authform}>
        <h1>Welcome to Lync</h1>
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
        <label htmlFor="username" className={showPassword ? '' : styles.hidden}>
          Confirm Password
        </label>
        <input
          type="password"
          className={showPassword ? '' : styles.hidden}
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <p className={`${styles.error} ${error != '' ? '' : styles.hidden}`}>
          {error}
        </p>
        <button type="submit" onClick={handleSignup}>
          {showPassword ? 'Sign Up' : 'Continue'}
        </button>
        <button type="submit" className={styles.secondary}>
          Continue as Guest
        </button>
        <p>
          Already have an account?{' '}
          <span className={styles.link}>
            <Link to={'/login'}>Login</Link>
          </span>
        </p>
      </div>
    </>
  )
}
