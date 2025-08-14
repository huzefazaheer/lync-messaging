import styles from './home.module.css'

import Sidebar from '../../components/sidebar/sidebar'
import MiddleSec from '../../components/middlesection/middlesection'
import Chat from '../../components/chat/chat'
import { useContext, useEffect } from 'react'
import { appContext } from '../../App'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const app = useContext(appContext)
  const navigate = useNavigate()

  async function getUserSession() {
    const response = await fetch(
      'https://lync-messaging.onrender.com/isloggedin',
      {
        method: 'GET',
        credentials: 'include',
      },
    )
    const data = await response.json()
    if (data.error) {
      navigate('/login')
    } else {
      app.setUser(data.user)
    }
  }

  useEffect(() => {
    if (app.user == null) {
      getUserSession()
    }
  }, [])

  if (app.user == null) return

  return (
    <div className={styles.home}>
      <Sidebar />
      <MiddleSec />
      <Chat />
    </div>
  )
}
