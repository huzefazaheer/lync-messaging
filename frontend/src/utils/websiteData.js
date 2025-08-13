import { useState } from 'react'

export default function useData() {
  const [user, setUser] = useState(null)
  const [activeChatId, setActiveChatId] = useState('')
  const [activeChatUser, setActiveChatUser] = useState()
  return {
    user,
    setUser,
    activeChatId,
    setActiveChatId,
    activeChatUser,
    setActiveChatUser,
  }
}
