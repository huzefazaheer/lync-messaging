import styles from './styles.module.css'

export default function Login() {
  return (
    <div className={styles.authform}>
      <h1>Login</h1>
      <label htmlFor="username">Username</label>
      <input type="text" />
      <label htmlFor="username">Password</label>
      <input type="password" />
      <button type="submit">Login</button>
      <button type="submit" className={styles.secondary}>
        Continue as Guest
      </button>
      <p>
        Don't have an account? <span className={styles.link}>Sign Up</span>
      </p>
    </div>
  )
}
