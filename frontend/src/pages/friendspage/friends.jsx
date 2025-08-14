import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import styles from './friends.module.css'
import { appContext } from '../../App'
import UserTop from '../../components/usertopinfo/userinfo'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../utils/useFetch'
import SearchUserCard from '../../components/searchuserprofile/searchprofile'

export default function Friends() {
  const app = useContext(appContext)
  const navigate = useNavigate()
  const friendsFetch = useFetch('users/friends', 'GET')
  const [friends, setFriends] = useState([])
  const [search, setSearch] = useState('')
  const [searchUsers, setSearchUsers] = useState('')

  useEffect(() => {
    if (app.user == null) navigate('/')
    async function getFriends() {
      setFriends(await friendsFetch.fetchData())
    }
    getFriends()
  }, [])

  if (app.user == null) return

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
    console.log(data)
  }

  const friendsjsx = friendsFetch.loading ? (
    <p>Loading</p>
  ) : (
    searchUsers.map((friend) => {
      return (
        <SearchUserCard
          id={friend.id}
          display_name={friend.display_name}
          username={friend.username}
          profile_picture={`https://avatar.iran.liara.run/public?username=${friend.username}`}
        />
      )
    })
  )

  return (
    <div className={styles.body}>
      <Sidebar />
      <div className={styles.rest}>
        <UserTop />
        <div className={styles.active}>
          <h2>Active Users</h2>
          <div></div>
        </div>
        <div className={styles.friends}>
          <h2>My Friends</h2>
          <div className={styles.searchbar}>
            <img src="/search.svg" alt="" />
            <input
              type="text"
              placeholder="Search for friends..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setTimeout(() => {
                  getUsers()
                }, 500)
              }}
            />
          </div>
          <div>
            {friendsjsx.length > 0 ? friendsjsx : <p>No friends added :(</p>}
          </div>
        </div>

        <div>
          <button>Remove Friend</button>
          <button>Create Group</button>
        </div>
      </div>
    </div>
  )
}
