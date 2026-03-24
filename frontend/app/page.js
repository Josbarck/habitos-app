"use client"

import { useSelector, useDispatch } from "react-redux"
import { setHabitos } from "../store/habitosSlice"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {

  const dispatch = useDispatch()
  const router = useRouter()

  const habitos = useSelector((state) => state.habitos.habitos)

  const [nuevo, setNuevo] = useState("")

  const obtenerHabitos = async () => {

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
      return
    }

    const res = await fetch("http://localhost:4000/habitos", {
      headers: {
        Authorization: token
      }
    })

    const data = await res.json()

    if (Array.isArray(data)) {
      dispatch(setHabitos(data))
    }
  }

  useEffect(() => {
    obtenerHabitos()
  }, [])

  const agregarHabito = async () => {

    if (!nuevo.trim()) return

    const token = localStorage.getItem("token")

    await fetch("http://localhost:4000/habitos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ nombre: nuevo })
    })

    setNuevo("")
    obtenerHabitos()
  }

  const marcarDone = async (id) => {

    const token = localStorage.getItem("token")

    await fetch(`http://localhost:4000/habitos/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token
      }
    })

    obtenerHabitos()
  }

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  const completados = habitos.filter(h => h.done).length
  const progreso = habitos.length > 0
    ? (completados / habitos.length) * 100
    : 0

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold text-blue-600">
        App de seguimiento de hábitos
      </h1>

      <p className="text-gray-600 mb-6">
        Semana 5 
      </p>

      <button
        onClick={logout}
        className="mb-4 bg-red-500 text-white px-4 py-1 rounded"
      >
        Cerrar sesión
      </button>

      {/* AGREGAR HABITO */}
      <div className="mb-6">

        <input
          value={nuevo}
          onChange={(e) => setNuevo(e.target.value)}
          placeholder="Nuevo hábito"
          className="border p-2 mr-2"
        />

        <button
          onClick={agregarHabito}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>

      </div>

      {/* BARRA */}
      <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>

      <p className="mb-6">
        Progreso: {Math.round(progreso)}%
      </p>

      {/* LISTA */}
      {habitos.map((habito) => (

        <div
          key={habito.id}
          className="flex items-center justify-between bg-white p-4 mb-3 rounded shadow"
        >

          <div>
            <p>{habito.nombre}</p>
            <p className="text-sm text-gray-500">
              Racha: {habito.streak} días
            </p>
          </div>

          <button
            onClick={() => marcarDone(habito.id)}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Done
          </button>

        </div>

      ))}

    </div>
  )
}