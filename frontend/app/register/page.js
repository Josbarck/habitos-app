"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async () => {

    await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    alert("Usuario registrado")

    router.push("/login")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

      <input 
        onChange={(e)=>setEmail(e.target.value)} 
        placeholder="Email"
      />

      <br /><br />

      <input 
        onChange={(e)=>setPassword(e.target.value)} 
        placeholder="Password"
        type="password"
      />

      <br /><br />

      <button onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  )
}