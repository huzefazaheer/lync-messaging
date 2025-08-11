import styles from './msg.module.css'

export default function ChatMessage({ msg, isSent }) {
  return (
    <p className={`${styles.txtmsg} ${isSent ? styles.sent : styles.received}`}>
      {msg}
    </p>
  )
}
