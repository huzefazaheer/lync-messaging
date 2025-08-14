import { useContext } from 'react'
import styles from './message.module.css'
import { appContext } from '../../App'

export default function Message({ id, chat, users }) {
  const app = useContext(appContext)

  if (app.user == null) return

  //Get name of other user
  const displayUser = users.filter(
    (user) => user.username != app.user.username,
  )[0]

  function setActiveChat() {
    app.setActiveChatId(id)
    app.setActiveChatUser(displayUser)
    app.setActiveChatType('DIRECT')
  }

  const imgsrc = `https://avatar.iran.liara.run/public?username=${displayUser?.username}`

  return (
    <div
      onClick={setActiveChat}
      key={id}
      className={`${styles.msg} ${app.activeChatId == id ? styles.active : ''}`}
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

export function GroupChat({ id, chat, users, name, photo }) {
  const app = useContext(appContext)

  if (app.user == null) return

  //Get name of other user
  const displayUser = users.filter((user) => user.username != app.user.username)
  let displayString = ''
  for (const user in displayUser) {
    displayString += displayUser[user].display_name + ', '
    if (displayString.length > 40) {
      displayString += '...'
      break
    }
  }

  function setActiveChat() {
    app.setActiveChatId(id)
    app.setActiveChatUser({ username: '', display_name: name, photo: photo })
    app.setActiveChatType('GROUP')
  }

  const imgsrc = photo

  return (
    <div
      onClick={setActiveChat}
      key={id}
      className={`${styles.msg} ${app.activeChatId == id ? styles.active : ''}`}
    >
      <div className={styles.usercard}>
        <img className={styles.groupchatimg} src={imgsrc} alt="" />
        <div>
          <p className={styles.displayname}>{name}</p>
          <p className={styles.username}>{displayString}</p>
        </div>
      </div>
      <p>{chat}</p>
    </div>
  )
}
