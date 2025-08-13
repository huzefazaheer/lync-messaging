import { useContext } from 'react'
import styles from './sidebar.module.css'
import { appContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import UserCard from '../usercard/usercard'

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
            <MenuItem id={0} src={'/home.svg'} text={'Home'} url={'/'} />
            <MenuItem
              id={1}
              src={'/profile.svg'}
              text={'Profile'}
              url={'/profile'}
            />
            <MenuItem
              id={2}
              src={'/friends.svg'}
              text={'Friends'}
              url={'/friends'}
            />
          </div>

          <div>
            <MenuItem
              id={3}
              src={'/notifications.svg'}
              text={'Notifications'}
              url={'/'}
            />
            <MenuItem
              id={4}
              src={'/settings.svg'}
              text={'Settings'}
              url={'/'}
            />
          </div>
        </div>

        <UserCard />
      </div>
    </>
  )
}

function MenuItem({ id, src, text, url }) {
  const { setActivePageIndex, activePageIndex } = useContext(appContext)
  const navigate = useNavigate()

  return (
    <div
      className={`${styles.menuitem} ${
        activePageIndex === id ? styles.active : ''
      }`}
      onClick={() => {
        setActivePageIndex(id)
        navigate(url)
      }}
    >
      <img src={src} alt="" />
      <p>{text}</p>
    </div>
  )
}
