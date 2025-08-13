import styles from './styles.module.css'

import UserStatus from '../../components/userstatus/userstatus'
import Message from '../../components/message/message'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../App'
import { Navigate, useNavigate } from 'react-router-dom'

export default function MiddleSec() {
  const { user } = useContext(appContext)
  const [loading, setLoading] = useState(true)
  const [chats, setChats] = useState([])
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])

  useEffect(() => {
    getChats()
  }, [])

  async function getChats() {
    setLoading(true)
    const response = await fetch('http://localhost:8080/chats', {
      method: 'GET',

      credentials: 'include',
    })
    const data = await response.json()
    setChats(data.chats)
    setLoading(false)
  }

  async function getUsers() {
    if (search == '') {
      setSearchUsers([])
      return
    }
    const response = await fetch('http://localhost:8080/users/' + search, {
      method: 'GET',
      credentials: 'include',
    })
    const data = await response.json()
    setSearchUsers(data)
  }

  const chatsjsx = !loading ? (
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
              setSearch={setSearch}
            />
          )
        })
      : ''

  return (
    <div className={styles.middle}>
      <div className={styles.searchbar}>
        <img src="/search.svg" alt="" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setTimeout(() => {
              getUsers()
            }, 500)
          }}
        />
      </div>
      {search != '' ? searchusers : ''}
      {search != '' ? (
        ''
      ) : (
        <>
          {/* <h3>Active Users</h3>
          <div className={styles.userstatuses}>
            <UserStatus profileimg={'/profileimg.png'} status={'idle'} />
            <UserStatus profileimg={'/profileimg.png'} status={'active'} />
            <UserStatus profileimg={'/profileimg.png'} status={'idle'} />
          </div>
          <hr /> */}
          <h3>Messages</h3>
          <div className={styles.msgs}>{chatsjsx}</div>
        </>
      )}
    </div>
  )
}

function UserCard({ id, display_name, username, profile_picture }) {
  const navigate = useNavigate()

  async function createNewChat() {
    const response = await fetch('http://localhost:8080/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        users: [id],
      }),
    })
    const data = await response.json()
    navigate('/')
  }

  return (
    <div className={styles.usercard} key={id}>
      <img
        className={styles.profile}
        src={profile_picture ? profile_picture : '/profileimg.png'}
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
