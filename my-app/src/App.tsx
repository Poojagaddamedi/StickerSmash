import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  const [regNo, setRegNo] = useState("")
  const [password, setpassword] = useState("");

  const loginFetch = async() => {
    console.log("im here")
    const res = await axios.post("http://localhost:3000/user/login", {
      regNo, password
    })
  }
  return (
    <>
     <input name="regNo"  onChange={(e) => setRegNo(e.target.value) }/>
     <input name="password" onChange={(e) => setpassword(e.target.value)} />
     <button onClick={loginFetch}>Login</button>
    </>
  )
}

export default App
