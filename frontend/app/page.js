"use client"

import { useSelector } from "react-redux"

export default function Home() {

  const habitos = useSelector((state) => state.habitos.habitos)

  const completados = habitos.filter(h => h.done).length
  const progreso = (completados / habitos.length) * 100

  return (
    <div className="p-10 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Seguimiento de Hábitos
      </h1>

      {/* barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progreso}%` }}
        ></div>
      </div>

      {/* lista de hábitos */}
      <div className="space-y-3">

        {habitos.map((habito) => (
          <div
            key={habito.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{habito.nombre}</span>

            {/* botón done (todavía no funciona) */}
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Done
            </button>

          </div>
        ))}

      </div>

    </div>
  )
}