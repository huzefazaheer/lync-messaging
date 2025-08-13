import { useContext, useState } from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from 'react-router-dom'
import checkPassword from '../../utils/checkPassword'
import { appContext } from '../../App'
import useFetch from '../../utils/useFetch'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  const app = useContext(appContext)
  const signupFetch = useFetch('signup', 'POST', {
    username: username,
    password: password,
    display_name: username,
  })
  const loginFetch = useFetch('login', 'POST', {
    username: username,
    password: password,
  })
  const navigate = useNavigate()

  function handleSignup(e) {
    e.preventDefault()
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

    const data = await signupFetch.fetchData()
    if (data.error) {
      setError('Username already exists')
    } else {
      const data = loginFetch.fetchData()
      app.setUser(data.user)
      navigate('/')
    }
  }

  return (
    <>
      <img className={styles.logo} src="/logo.svg" alt="Lync messaging logo" />
      <form className={styles.authform}>
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
        {!loginFetch.loading && !signupFetch.loading ? (
          <>
            <button type="submit" onClick={(e) => handleSignup(e)}>
              {showPassword ? 'Sign Up' : 'Continue'}
            </button>
            <button type="submit" className={styles.secondary}>
              Continue as Guest
            </button>
          </>
        ) : (
          <img className={styles.load} src="loading.gif" alt="" />
        )}
        <p>
          Already have an account?{' '}
          <span className={styles.link}>
            <Link to={'/login'}>Login</Link>
          </span>
        </p>
      </form>
    </>
  )
}
