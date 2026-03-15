"use client"

import { useSelector } from "react-redux"

export default function Home() {

  const habitos = useSelector((state) => state.habitos.lista)

  return (
    <div>

      <h1>App de seguimiento de hábitos</h1>

      <h2>Lista de hábitos</h2>

      {habitos.map((habito) => (
        <div key={habito.id}>
          <p>{habito.nombre} - {habito.dias} días</p>
        </div>
      ))}

    </div>
  )
}