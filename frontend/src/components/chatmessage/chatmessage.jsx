import styles from './msg.module.css'

export default function ChatMessage({ msg, isSent }) {
  return (
    <p className={`${styles.txtmsg} ${isSent ? styles.sent : styles.received}`}>
      {msg}
    </p>
  )
}

export function GroupChatMessage({ msg, isSent, sender }) {
  return (
    <div className={`${styles.txtmsg} ${isSent ? styles.right : styles.left}`}>
      <p className={styles.groupp}>{isSent ? 'You' : sender}</p>
      <p
        className={`${styles.txtmsg} ${isSent ? styles.sent : styles.received}`}
      >
        {msg}
      </p>
    </div>
  )
}
