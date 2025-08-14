import styles from './searchprofile.module.css'
import useFetch from '../../utils/useFetch'

export default function SearchUserCard({
  id,
  display_name,
  username,
  profile_picture,
  chatsFetch,
  setClearSearch,
  showAddFriends,
}) {
  const newChatFetch = useFetch('chats', 'POST', {
    users: [id],
  })
  const friendsFetch = useFetch('users/add_friend', 'PUT', { friendid: id })

  //Sometimes says chat exists eve though it dose not
  async function createNewChat() {
    //Add validation or response to adding new chat
    const data = await newChatFetch.fetchData()
    if (!data.error) chatsFetch.fetchData()
    setClearSearch(true)
  }

  async function addFriend() {
    //Add validation or response to adding new chat
    const data = await friendsFetch.fetchData()
    if (!data.error) friendsFetch.fetchData()
    setClearSearch(true)
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
        {showAddFriends ? (
          <img
            onClick={addFriend}
            className={styles.icon}
            src={'/addqueue.svg'}
            alt=""
          />
        ) : (
          ''
        )}
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
