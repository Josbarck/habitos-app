"use client"

import { useSelector, useDispatch } from "react-redux"
import { toggleHabito } from "../store/habitosSlice"

export default function Home() {

  const dispatch = useDispatch()

  const habitos = useSelector((state) => state.habitos.habitos)

  const completados = habitos.filter(h => h.done).length
  const progreso = habitos.length > 0 ? (completados / habitos.length) * 100 : 0

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold text-blue-600">
        App de seguimiento de hábitos
      </h1>

      <p className="text-gray-600 mb-6">
        Semana 4 - Lógica de hábitos
      </p>

      {/* Barra de progreso */}

      <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
        <div
          className="bg-blue-500 h-6 rounded-full"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>

      <p className="mb-6">
        Progreso: {Math.round(progreso)}%
      </p>

      {/* Lista de hábitos */}

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
            onClick={() => dispatch(toggleHabito(habito.id))}
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            Done
          </button>

        </div>

      ))}

    </div>
  )
}