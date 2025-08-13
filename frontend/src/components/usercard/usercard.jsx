import styles from './usercard.module.css'
import Cookies from 'js-cookie'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { appContext } from '../../App'

export default function UserCard() {
  const { user, resetData } = useContext(appContext)

  const navigate = useNavigate()

  async function logout() {
    resetData()
    navigate('/login')
    Cookies.remove('connect.sid')
  }

  return (
    <div className={styles.usercard}>
      <img
        src={user?.profile_picture ? user.profile_picture : '/profileimg.png'}
        alt=""
      />

      <div>
        <p className={styles.displayname}>
          {user?.display_name ? user.display_name : ''}
        </p>
        <p className={styles.username}>
          @{user?.username ? user.username : ''}
        </p>
      </div>

      <img
        onClick={logout}
        className={styles.logout}
        src="/logout.svg"
        alt=""
      />
    </div>
  )
}
