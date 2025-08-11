import styles from './styles.module.css'

export default function UserStatus({ profileimg, status }) {
  return (
    <div className={styles.userstatus}>
      <img className={styles.profile} src={profileimg} alt="" />
      <img
        className={styles.status}
        src={status == 'active' ? '/active.png' : '/idle.png'}
        alt=""
      />
    </div>
  )
}
