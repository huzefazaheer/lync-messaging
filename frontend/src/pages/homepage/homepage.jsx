import styles from './home.module.css'

import Sidebar from '../../components/sidebar/sidebar'

export default function Home() {
  return (
    <div className={styles.home}>
      <Sidebar />
    </div>
  )
}
