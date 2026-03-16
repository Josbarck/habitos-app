"use client"

import { useState } from "react"

export default function Register() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const registrar = async () => {

    await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    alert("Usuario registrado")

  }

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Registro
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
        onClick={registrar}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Registrar
      </button>

    </div>

  )
}