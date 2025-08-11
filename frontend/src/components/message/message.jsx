import styles from './message.module.css'

export default function Message({ active }) {
  return (
    <div className={`${styles.msg} ${active ? styles.active : ''}`}>
      <div className={styles.usercard}>
        <img src="/profileimg.png" alt="" />
        <div>
          <p className={styles.displayname}>John Doe</p>
          <p className={styles.username}>@exampleuser</p>
        </div>
      </div>
      <p>Sure thing im hopping on to manchester right now, best believe </p>
    </div>
  )
}
