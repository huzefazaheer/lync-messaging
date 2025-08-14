import { useState } from 'react'

export default function useData() {
  const [user, setUser] = useState(null)
  const [activeChatId, setActiveChatId] = useState(null)
  const [activeChatUser, setActiveChatUser] = useState(null)
  const [activePageIndex, setActivePageIndex] = useState(0)
  const [activeChatType, setActiveChatType] = useState()

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
    activeChatType,
    setActiveChatType,
  }
}
