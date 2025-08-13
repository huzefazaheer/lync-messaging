import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/login'
import SignUp from './components/auth/signup'
import Home from './pages/homepage/homepage'
import useData from './utils/websiteData'
import { createContext } from 'react'
import Profile from './pages/profilepage/profile'

// eslint-disable-next-line react-refresh/only-export-components
export const appContext = createContext({
  user: null,
  setUser: null,
  activeChatId: null,
  setActiveChatId: null,
  activeChatUser: null,
  setActiveChatUser: null,
  activePageIndex: null,
  setActivePageIndex: null,
})

function App() {
  const app = useData()

  return (
    <>
      <appContext.Provider value={app}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/profile/:id" element={<Profile />}></Route>
          </Routes>
        </BrowserRouter>
      </appContext.Provider>
    </>
  )
}

export default App
