import { useContext, useEffect } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import styles from './profile.module.css'
import { appContext } from '../../App'
import UserTop from '../../components/usertopinfo/userinfo'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const app = useContext(appContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (app.user == null) navigate('/')
  }, [])

  if (app.user == null) return

  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.rest}>
        <UserTop />
        <div className={styles.profile}>
          <h2>My Profile</h2>

          <form action="">
            <h3>Personal Information</h3>
            <div className={styles.hor}>
              <div className={styles.vert}>
                <label htmlFor="Username" className={styles.half}>
                  Username
                </label>
                <input type="text" className={styles.half} />
              </div>
              <div className={styles.vert}>
                <label htmlFor="Username" className={styles.half}>
                  Display Name
                </label>
                <input type="text" className={styles.half} />
              </div>
            </div>
            <label htmlFor="Username">Profile Picture</label>
            <input type="text" />
            <label htmlFor="Username">About</label>
            <input type="text" />
            <button>
              <img src="/savechanges.svg" alt="" />
              <p>Save Changes</p>
            </button>
          </form>

          <form action="">
            <h3>Privacy and Security</h3>
            <label htmlFor="Username">Password</label>
            <input type="password" />
            <label htmlFor="Username">Confirm Password</label>
            <input type="password" />
            <button>
              <img src="/changepassowrd.svg" alt="" />
              <p>Change Password</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
