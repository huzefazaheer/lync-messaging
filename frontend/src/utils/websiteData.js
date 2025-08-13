import { useState } from 'react'

export default function useData() {
  const [user, setUser] = useState(null)
  const [activeChatId, setActiveChatId] = useState()
  const [activeChatUser, setActiveChatUser] = useState()
  const [activePageIndex, setActivePageIndex] = useState(0)

  function resetData() {
    setUser(null)
    setActiveChatId()
    setActiveChatUser()
    setActivePageIndex(0)
  }

  return {
    user,
    setUser,
    activeChatId,
    setActiveChatId,
    activeChatUser,
    setActiveChatUser,
    activePageIndex,
    setActivePageIndex,
    resetData,
  }
}
