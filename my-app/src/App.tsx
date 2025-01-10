import { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [regNo, setRegNo] = useState("")
  const [password, setpassword] = useState("");

  const loginFetch = async() => {
    
    const { data } = await axios.post("http://localhost:3000/user/login", {
      regNo, password
    });

    if(data.mes === "you have logged in"){
      console.log(data.user);
    }
    
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
