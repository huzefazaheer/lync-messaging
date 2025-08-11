import styles from './styles.module.css'

export default function SignUp() {
  return (
    <div className={styles.authform}>
      <h1>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <input type="text" />
      <label htmlFor="username">Password</label>
      <input type="password" />
      <label htmlFor="username">Confirm Password</label>
      <input type="password" />
      <button type="submit">Sign Up</button>
      <button type="submit" className={styles.secondary}>
        Continue as Guest
      </button>
      <p>
        Already have an account? <span className={styles.link}>Login</span>
      </p>
    </div>
  )
}
