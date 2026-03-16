import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  habitos: [
    { id: 1, nombre: "Beber agua", done: false, streak: 0 },
    { id: 2, nombre: "Hacer ejercicio", done: false, streak: 0 },
    { id: 3, nombre: "Leer 10 páginas", done: false, streak: 0 }
  ]
}

const habitosSlice = createSlice({
  name: "habitos",
  initialState,
  reducers: {

    toggleHabito: (state, action) => {

      const habito = state.habitos.find(h => h.id === action.payload)

      if (habito) {

        if (!habito.done) {
          habito.done = true
          habito.streak += 1
        } else {
          habito.done = false
          habito.streak = 0
        }

      }

    }

  }
})

export const { toggleHabito } = habitosSlice.actions
export default habitosSlice.reducer