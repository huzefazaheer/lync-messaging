import { useContext } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import styles from './profile.module.css'
import { appContext } from '../../App'

export default function Profile() {
  return (
    <div className={styles.home}>
      <Sidebar />
    </div>
  )
}
