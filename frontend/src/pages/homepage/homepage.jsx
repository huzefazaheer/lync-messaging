import styles from './home.module.css'

import Sidebar from '../../components/sidebar/sidebar'
import MiddleSec from '../../components/middlesecton/middlesection'
import Chat from '../../components/chat/chat'
import { useContext, useEffect } from 'react'
import { appContext } from '../../App'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const app = useContext(appContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (app.user == null) navigate('/login')
  }, [])

  return (
    <div className={styles.home}>
      <Sidebar />
      <MiddleSec />
      <Chat />
    </div>
  )
}
