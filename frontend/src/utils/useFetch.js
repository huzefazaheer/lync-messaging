import { useCallback, useState } from 'react'

export default function useFetch(endpoint, method, body = null) {
  const api = 'http://localhost:8080/' + endpoint

  const [loading, isLoading] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  const fetchData = useCallback(
    async (api_ = api) => {
      isLoading(true)
      setError(false)
      try {
        const fetchOptions = {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }

        if (body != null) {
          fetchOptions.body = JSON.stringify(body)
        }

        const response = await fetch(api_, fetchOptions)
        const data = await response.json()
        setData(data)
        return data
      } catch (error) {
        setError(error)
        setData(error)
        throw error
      } finally {
        isLoading(false)
      }
    },
    [api, body, method],
  )

  return { fetchData, data, loading, error }
}
