import { useContext } from 'react'
import styles from './sidebar.module.css'
import { appContext } from '../../App'

export default function Sidebar() {
  const { user } = useContext(appContext)

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="" />
          <p>Lync Messaging</p>
        </div>
        <div className={styles.menu}>
          <div>
            <div className={styles.menuitem}>
              <img src="/home.svg" alt="" />
              <p>Home</p>
            </div>
            <div className={styles.menuitem}>
              <img src="/friends.svg" alt="" />
              <p>Friends</p>
            </div>
            <div className={styles.menuitem}>
              <img src="/profile.svg" alt="" />
              <p>Profile</p>
            </div>
          </div>

          <div>
            <div className={styles.menuitem}>
              <img src="/notifications.svg" alt="" />
              <p>Notifications</p>
            </div>
            <div className={styles.menuitem}>
              <img src="/settings.svg" alt="" />
              <p>Settings</p>
            </div>
          </div>
        </div>

        <div className={styles.usercard}>
          <img
            src={
              user?.profile_picture ? user.profile_picture : '/profileimg.png'
            }
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
          <img className={styles.logout} src="/logout.svg" alt="" />
        </div>
      </div>
    </>
  )
}
