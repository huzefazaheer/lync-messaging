import styles from './messagesender.module.css'
import { useContext, useState } from 'react'
import { appContext } from '../../App'

export default function MessageSender({ setChange, setMessages }) {
  const { user, activeChatId } = useContext(appContext)
  const [text, setText] = useState('')

  async function sendChatMessage() {
    setMessages((messages) => [
      ...messages,
      {
        text: text,
        authorId: user.id,
        author: { username: user.username },
      },
    ])
    await fetch('https://lync-messaging.onrender.com/messages', {
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
