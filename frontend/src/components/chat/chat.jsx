import styles from './chat.module.css'

import ChatMessage from '../../components/chatmessage/chatmessage'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../App'
import MessageSender from '../messagesender/messagesender'
import UserTop from '../usertopinfo/userinfo'

export default function Chat() {
  const { activeChatId, user, activeChatUser } = useContext(appContext)
  const [messages, setMessages] = useState([])

  const [change, setChange] = useState(false)

  useEffect(() => {
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
          activeChatUser?.profile_picture
            ? activeChatUser.profile_picture
            : '/profileimg.png'
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

      <MessageSender setChange={setChange} />
    </div>
  )
}
