import { Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Feeds from "./pages/Feed"
import Chats from "./pages/Chats"

function App() {

    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('users');
        setIsAuth(!!token);
    }, [])

  return (
     <>
        <Routes>
        <Route path="/login" element={isAuth ? <Navigate to="/chatList"/> : <Login />}/>
        <Route path="/register" element={isAuth ? <Navigate to="/chatList"/> : <Register />}/>
        <Route path="/chatList" element={isAuth ? <Feeds /> : <Login />}></Route>
        <Route path="/chat/:receiverId" element={isAuth ? <Chats /> : <Login />}></Route>
        </Routes>
     </>
  )
}

export default App
