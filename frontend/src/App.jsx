import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import SignUp from './components/auth/signup'
import Home from './pages/homepage/homepage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
