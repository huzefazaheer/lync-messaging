import styles from './styles.module.css'

import Message from '../../components/message/message'
import { useEffect, useState } from 'react'
import useFetch from '../../utils/useFetch'
import SearchUsers from '../searchusers/searchusers'
import SearchUserCard from '../searchuserprofile/searchprofile'

export default function MiddleSec() {
  const [chats, setChats] = useState([])
  const [searchUsers, setSearchUsers] = useState([])
  const [clearSearch, setClearSearch] = useState(false)
  const chatsFetch = useFetch('chats', 'GET')

  useEffect(() => {
    chatsFetch.fetchData()
  }, [])

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
            <SearchUserCard
              id={user.id}
              display_name={user.display_name}
              username={user.username}
              chatsFetch={chatsFetch}
              setClearSearch={setClearSearch}
              showAddFriends={false}
            />
          )
        })
      : ''

  return (
    <div className={styles.middle}>
      <SearchUsers
        setResults={setSearchUsers}
        clear={clearSearch}
        setClear={setClearSearch}
      />
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
