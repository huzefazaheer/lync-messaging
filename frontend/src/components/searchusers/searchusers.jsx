import { useState } from 'react'
import styles from './search.module.css'

export default function SearchUsers({ clear, setResults }) {
  const [search, setSearch] = useState('')

  async function getUsers() {
    if (search == '') {
      setResults([])
      return
    }
    const response = await fetch('http://localhost:8080/users/' + search, {
      method: 'GET',
      credentials: 'include',
    })
    const data = await response.json()
    setResults(data)
  }

  if (clear) setSearch('')

  return (
    <div className={styles.searchbar}>
      <img src="/search.svg" alt="" />
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setTimeout(() => {
            getUsers()
          }, 500)
        }}
      />
    </div>
  )
}
