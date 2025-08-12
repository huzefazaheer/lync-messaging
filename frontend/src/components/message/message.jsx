import styles from './message.module.css'

export default function Message({ key, active, chat }) {
  return (
    <div key={key} className={`${styles.msg} ${active ? styles.active : ''}`}>
      <div className={styles.usercard}>
        <img src="/profileimg.png" alt="" />
        <div>
          <p className={styles.displayname}>John Doe</p>
          <p className={styles.username}>@exampleuser</p>
        </div>
      </div>
      <p>{chat}</p>
    </div>
  )
}
