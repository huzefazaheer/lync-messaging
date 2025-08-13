import styles from './userinfo.module.css'

import { useContext } from 'react'
import { appContext } from '../../App'

export default function UserTop({ img, username, display_name }) {
  const { user } = useContext(appContext)

  return (
    <div className={styles.top}>
      <div className={styles.usercard}>
        <img
          src={img ? img : user.photo ? user.photo : '/profileimg.png'}
          alt=""
        />
        <div>
          <p className={styles.displayname}>
            {display_name ? display_name : user.display_name}
          </p>
          <p className={styles.username}>
            @{username ? username : user.username}
          </p>
        </div>
      </div>
    </div>
  )
}
