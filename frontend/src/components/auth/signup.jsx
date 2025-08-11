import { useState } from 'react'
import styles from './styles.module.css'
import { Link } from 'react-router-dom'

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')

  async function handleSignup() {
    if (!showPassword && username != '') {
      setShowPassword(true)
      return
    } else setError('Please provide your username')
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
