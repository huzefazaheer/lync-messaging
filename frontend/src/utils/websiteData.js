import { useState } from 'react'

export default function useData() {
  const [user, setUser] = useState(null)

  return { user, setUser }
}
