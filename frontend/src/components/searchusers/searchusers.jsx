import { useEffect, useState } from 'react'
import styles from './search.module.css'

export default function SearchUsers({ clear, setClear, setResults }) {
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (clear) {
      setSearch('')
      setClear(false)
      setResults([])
    }
  }, [clear])

  async function getUsers(searchValue) {
    if (searchValue == '') {
      setResults('')
      return
    }
    const response = await fetch('http://localhost:8080/users/' + searchValue, {
      method: 'GET',
      credentials: 'include',
    })
    const data = await response.json()
    setResults(data)
  }

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
            getUsers(e.target.value)
          }, 500)
        }}
      />
    </div>
  )
}
