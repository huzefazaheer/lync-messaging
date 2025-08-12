import styles from './styles.module.css'

import UserStatus from '../../components/userstatus/userstatus'
import Message from '../../components/message/message'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../App'

export default function MiddleSec() {
  const { user } = useContext(appContext)
  const [chats, setChats] = useState([])

  useEffect(() => {
    getChats()
  }, [])

  async function getChats() {
    const response = await fetch('http://localhost:8080/chats', {
      method: 'GET',

      credentials: 'include',
    })
    const data = await response.json()
    console.log(data)
    setChats(data)
  }

  const chatsjsx =
    chats.length > 0
      ? chats.map((chat) => {
          return <Message />
        })
      : ''

  return (
    <div className={styles.middle}>
      <div className={styles.searchbar}>
        <img src="/search.svg" alt="" />
        <input type="text" placeholder="Search" />
      </div>
      <h3>Active Users</h3>
      <div className={styles.userstatuses}>
        <UserStatus profileimg={'/profileimg.png'} status={'idle'} />
        <UserStatus profileimg={'/profileimg.png'} status={'active'} />
        <UserStatus profileimg={'/profileimg.png'} status={'idle'} />
      </div>
      <hr />
      <h3>Messages</h3>
      <div className={styles.msgs}>{chatsjsx}</div>
    </div>
  )
}
