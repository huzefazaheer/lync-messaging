import { useContext, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { appContext } from '../../App'
import useFetch from '../../utils/useFetch'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [login, setLogin] = useState(false)
  const app = useContext(appContext)
  const loginFetch = useFetch('login', 'POST', {
    username: username,
    password: password,
  })
  const navigate = useNavigate()

  useEffect(() => {
    handleLogin()
    setLogin(false)
  }, [login])

  async function handleLogin(e = null) {
    if (e != null) e.preventDefault()
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
    await sendData()
  }

  async function sendData() {
    if (username == '' || password == '') return
    const data = await loginFetch.fetchData()
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
      <form className={styles.authform}>
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
        {!loginFetch.loading ? (
          <>
            {' '}
            <button type="submit" onClick={(e) => handleLogin(e)}>
              {showPassword
                ? loginFetch.loading
                  ? 'Logging in'
                  : 'Login'
                : 'Continue'}
            </button>
            <button
              type="submit"
              className={styles.secondary}
              onClick={(e) => {
                e.preventDefault()
                setUsername('user')
                setPassword('user')
                setShowPassword(true)
                setLogin(true)
              }}
            >
              Continue as Guest
            </button>
          </>
        ) : (
          <img className={styles.load} src="loading.gif" alt="" />
        )}
        <p>
          Don't have an account?{' '}
          <span className={styles.link}>
            <Link to={'/signup'}>Sign Up</Link>
          </span>
        </p>
      </form>
    </>
  )
}
