import styles from './styles.module.css'

import UserStatus from '../../components/userstatus/userstatus'
import Message from '../../components/message/message'

export default function MiddleSec() {
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
      <div className={styles.msgs}>
        <Message active={true} />
        <Message />
        <Message />
        <Message />
      </div>
    </div>
  )
}
