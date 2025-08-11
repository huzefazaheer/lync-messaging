import styles from './sidebar.module.css'

export default function Sidebar() {
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
          <img src="/profileimg.png" alt="" />
          <div>
            <p className={styles.displayname}>John Doe</p>
            <p className={styles.username}>@exampleuser</p>
          </div>
          <img className={styles.logout} src="/logout.svg" alt="" />
        </div>
      </div>
    </>
  )
}
