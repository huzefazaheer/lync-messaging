import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import styles from './friends.module.css'
import { appContext } from '../../App'
import UserTop from '../../components/usertopinfo/userinfo'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../utils/useFetch'
import SearchUserCard from '../../components/searchuserprofile/searchprofile'
import SearchUsers from '../../components/searchusers/searchusers'

export default function Friends() {
  const app = useContext(appContext)
  const navigate = useNavigate()
  const friendsFetch = useFetch('users/friends', 'GET')
  const [clearSearch, setClearSearch] = useState(false)
  const [friends, setFriends] = useState([])
  const [searchUsers, setSearchUsers] = useState([])

  useEffect(() => {
    if (app.user == null) navigate('/')
    async function getFriends() {
      const data = await friendsFetch.fetchData()
      setFriends(data.friends)
    }
    getFriends()
  }, [])

  if (app.user == null) return

  const searchjsx =
    searchUsers.length > 0
      ? searchUsers.map((user) => {
          return (
            <SearchUserCard
              id={user.id}
              display_name={user.display_name}
              username={user.username}
              profile_picture={`https://avatar.iran.liara.run/public?username=${user.username}`}
              showAddFriends={true}
            />
          )
        })
      : ''

  const friendsjsx = friendsFetch.loading ? (
    <p>Loading</p>
  ) : friends.length > 0 ? (
    friends.map((friend) => {
      return (
        <UserCard
          id={friend.id}
          display_name={friend.display_name}
          username={friend.username}
          profile_picture={`https://avatar.iran.liara.run/public?username=${friend.username}`}
          about={friend.about}
        />
      )
    })
  ) : (
    <p>No friends added :(</p>
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
          <SearchUsers
            clear={clearSearch}
            setClear={setClearSearch}
            setResults={setSearchUsers}
          />
          <div>{searchjsx != '' ? searchjsx : friendsjsx}</div>
        </div>

        <div className={styles.btngroup}>
          <button>Remove Friend</button>
          <button>Create Group</button>
        </div>
      </div>
    </div>
  )
}

function UserCard({ id, display_name, username, profile_picture, about }) {
  return (
    <div className={styles.usercard} key={id}>
      <input
        type="checkbox"
        id="selected"
        name="selected"
        value="selected"
      ></input>
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
        <p>{about}</p>
      </div>
    </div>
  )
}
