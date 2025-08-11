import styles from './home.module.css'

import Sidebar from '../../components/sidebar/sidebar'
import MiddleSec from '../../components/middlesecton/middlesection'

export default function Home() {
  return (
    <div className={styles.home}>
      <Sidebar />
      <MiddleSec />
    </div>
  )
}
