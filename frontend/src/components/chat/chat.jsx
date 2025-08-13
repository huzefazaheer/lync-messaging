import styles from './chat.module.css'

import ChatMessage from '../../components/chatmessage/chatmessage'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../App'
import MessageSender from '../messagesender/messagesender'
import UserTop from '../usertopinfo/userinfo'

export default function Chat() {
  const { activeChatId, user, activeChatUser } = useContext(appContext)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (activeChatId != '') {
      getChatData()
    }
  }, [activeChatId])

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

  const messagesjsx =
    messages.length > 0
      ? messages.map((msg) => {
          return <ChatMessage msg={msg.text} isSent={msg.authorId == user.id} />
        })
      : 'Nothing to see here '

  return (
    <div className={styles.chat}>
      <UserTop
        img={
          activeChatUser?.username
            ? `https://avatar.iran.liara.run/public?username=${activeChatUser.username}`
            : user?.photo
            ? user.photo
            : `https://avatar.iran.liara.run/public?username=${user.username}`
        }
        username={
          activeChatUser?.username ? activeChatUser.display_name : user.username
        }
        display_name={
          activeChatUser?.display_name
            ? activeChatUser.display_name
            : user.display_name
        }
      />

      <div className={styles.msgs}>{messagesjsx}</div>

      <MessageSender setMessages={setMessages} />
    </div>
  )
}
