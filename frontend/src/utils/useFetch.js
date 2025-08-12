import { useCallback } from 'react'
import { useState } from 'react'

export default function useFetch(endpoint, method, body = null) {
  const api = 'http://localhost:8080/' + endpoint

  const [loading, isLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  async function fetchData() {
    isLoading(true)
    try {
      const response = await fetch(api, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body==null ? body: JSON.stringify(body) : '';
      })
      console.log(response)
      const data = await response.json()
      setData(data)
    } catch (error) {
      setError(error)
    }
    isLoading(false)
  }

  const callFetch = useCallback(fetchData, [api])

  return { callFetch, data }
}
