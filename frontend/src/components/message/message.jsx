import { useContext } from 'react'
import styles from './message.module.css'
import { appContext } from '../../App'

export default function Message({ id, active, chat, users }) {
  const app = useContext(appContext)

  if (app.user == null) return

  //Get name of other user
  const displayUser = users.filter(
    (user) => user.username != app.user.username,
  )[0]

  function setActiveChat() {
    app.setActiveChatId(id)
    app.setActiveChatUser(displayUser)
  }

  const imgsrc = `https://avatar.iran.liara.run/public?username=${displayUser.username}`

  return (
    <div
      onClick={setActiveChat}
      key={id}
      className={`${styles.msg} ${active ? styles.active : ''}`}
    >
      <div className={styles.usercard}>
        <img src={imgsrc} alt="" />
        <div>
          <p className={styles.displayname}>{displayUser?.display_name}</p>
          <p className={styles.username}>
            {displayUser?.username ? '@' + displayUser.username : ''}
          </p>
        </div>
      </div>
      <p>{chat}</p>
    </div>
  )
}
