import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import SignUp from './components/auth/signup'
import Home from './pages/homepage/homepage'
import useData from './utils/websiteData'
import { createContext } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const appContext = createContext({ user: null, setUser: null })

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
          </Routes>
        </BrowserRouter>
      </appContext.Provider>
    </>
  )
}

export default App
