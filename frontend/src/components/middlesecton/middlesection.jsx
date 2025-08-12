import styles from './styles.module.css'

import UserStatus from '../../components/userstatus/userstatus'
import Message from '../../components/message/message'
import { useContext, useEffect, useState } from 'react'
import { appContext } from '../../App'

export default function MiddleSec() {
  const { user } = useContext(appContext)
  const [chats, setChats] = useState([])
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState([])

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

  const chatsjsx =
    chats.length > 0
      ? chats.map((chat) => {
          return <Message />
        })
      : ''

  const searchusers =
    searchUsers.length > 0
      ? searchUsers.map((user) => {
          return (
            <UserCard
              display_name={user.display_name}
              username={user.username}
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

function UserCard({ display_name, username, profile_picture }) {
  return (
    <div className={styles.usercard}>
      <img src={profile_picture ? profile_picture : '/profileimg.png'} alt="" />
      <div>
        <p className={styles.displayname}>{display_name}</p>
        <p className={styles.username}>@{username}</p>
      </div>
    </div>
  )
}
