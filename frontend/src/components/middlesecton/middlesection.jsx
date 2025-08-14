import styles from './styles.module.css'

import Message from '../../components/message/message'
import { useEffect, useState } from 'react'
import useFetch from '../../utils/useFetch'
import SearchUsers from '../searchusers/searchusers'

export default function MiddleSec() {
  const [chats, setChats] = useState([])
  const [searchUsers, setSearchUsers] = useState([])
  const [clearSearch, setClearSearch] = useState(false)
  const chatsFetch = useFetch('chats', 'GET')

  useEffect(() => {
    chatsFetch.fetchData()
  }, [])

  console.log(searchUsers)

  useEffect(() => {
    if (!chatsFetch.loading && chatsFetch.data) {
      setChats(chatsFetch.data.chats)
    }
  }, [chatsFetch.loading, chatsFetch.data])

  const chatsjsx =
    chats?.length > 0 ? (
      chats.map((chat) => {
        return <Message id={chat.id} users={chat.chat_users} />
      })
    ) : (
      <p>You don't have any chats yet</p>
    )

  const searchusers =
    searchUsers.length > 0
      ? searchUsers.map((user) => {
          return (
            <UserCard
              id={user.id}
              display_name={user.display_name}
              username={user.username}
              chatsFetch={chatsFetch}
            />
          )
        })
      : ''

  return (
    <div className={styles.middle}>
      <SearchUsers setResults={setSearchUsers} />
      {searchusers.length > 0 ? (
        searchusers
      ) : (
        <>
          <h3>Messages</h3>
          <div className={styles.msgs}>{chatsjsx}</div>
        </>
      )}
    </div>
  )
}

function UserCard({
  id,
  display_name,
  username,
  profile_picture,
  chatsFetch,
  setSearch,
}) {
  const newChatFetch = useFetch('chats', 'POST', {
    users: [id],
  })

  //Sometimes says chat exists eve though it dose not
  async function createNewChat() {
    //Add validation or response to adding new chat
    const data = await newChatFetch.fetchData()
    if (!data.error) chatsFetch.fetchData()
    setSearch('')
  }

  return (
    <div className={styles.usercard} key={id}>
      <img
        className={styles.profile}
        src={
          profile_picture
            ? profile_picture
            : `https://avatar.iran.liara.run/public?username=${username}`
        }
        alt=""
      />
      <div>
        <p className={styles.displayname}>{display_name}</p>
        <p className={styles.username}>@{username}</p>
      </div>
      <div className={styles.iconholder}>
        {/* <img className={styles.icon} src={'/addqueue.svg'} alt="" /> */}
        <img
          className={styles.icon}
          src={'/sendmessage.svg'}
          alt=""
          onClick={createNewChat}
        />
      </div>
    </div>
  )
}
