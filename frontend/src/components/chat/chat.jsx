import styles from './chat.module.css'

import ChatMessage from '../../components/chatmessage/chatmessage'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../App'

export default function Chat() {
  const { activeChatId, user, activeChatUser } = useContext(appContext)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [change, setChange] = useState(false)

  useEffect(() => {
    console.log(activeChatUser)
    if (activeChatId != '') {
      getChatData()
    }
  }, [activeChatId, change])

  if (user == null) return

  async function getChatData() {
    const response = await fetch(
      'http://localhost:8080/chats/' + activeChatId,
      {
        method: 'GET',
        credentials: 'include',
      },
    )
    const data = await response.json()

    setMessages(data.messages)
  }

  async function sendChatMessage() {
    const response = await fetch('http://localhost:8080/messages', {
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

  const messagesjsx =
    messages.length > 0
      ? messages.map((msg) => {
          return <ChatMessage msg={msg.text} isSent={msg.authorId == user.id} />
        })
      : 'Nothing to see here '

  return (
    <div className={styles.chat}>
      <div className={styles.top}>
        <div className={styles.usercard}>
          <img
            className={activeChatUser?.username ? '' : styles.hidden}
            src={
              activeChatUser?.profile_picture
                ? activeChatUser.profile_picture
                : '/profileimg.png'
            }
            alt=""
          />
          <div>
            <p className={styles.displayname}>
              {activeChatUser?.display_name ? activeChatUser?.display_name : ''}
            </p>
            <p className={styles.username}>
              {activeChatUser?.username ? '@' + activeChatUser?.username : ''}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.msgs}>{messagesjsx}</div>
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
    </div>
  )
}
