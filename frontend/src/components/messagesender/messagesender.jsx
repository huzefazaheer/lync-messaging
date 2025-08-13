import styles from './messagesender.module.css'
import { useContext, useState } from 'react'
import { appContext } from '../../App'

export default function MessageSender({ setChange }) {
  const { user, activeChatId } = useContext(appContext)
  const [text, setText] = useState('')

  async function sendChatMessage() {
    await fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        chatId: activeChatId,
        id: user.id,
        message: text,
      }),
    })
    setText('')
    setChange((e) => !e)
  }

  return (
    <div className={styles.sendmsg}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <p className={styles.msghint}>Send a message</p>
      <div className={styles.control}>
        <img src="/emojis.svg" alt="" />
        <img src="/options.svg" alt="" />
        <button onClick={sendChatMessage}>Send</button>
      </div>
    </div>
  )
}
