"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Login() {

  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {

    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const data = await res.json()

    if (data.message === "Login exitoso") {

      router.push("/")

    } else {

      alert(data.message)

    }

  }

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Login
      </h1>

      <input
        className="border p-2 mr-2"
        placeholder="Usuario"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>

    </div>

  )
}