import styles from './profile.module.css'

import { useContext } from 'react'
import { appContext } from '../../App'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const app = useContext(appContext)
  const navigate = useNavigate()

  return (
    <div className={styles.home}>
      <h1>pROFILE</h1>
    </div>
  )
}
