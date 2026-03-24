import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  habitos: [
    { id: 1, nombre: "Leer un libro", done: false, streak: 0 },
    { id: 2, nombre: "Hacer ejercicio", done: false, streak: 0 },
    { id: 3, nombre: "Tomar agua", done: false, streak: 0 }
  ]
}

export const habitosSlice = createSlice({
  name: "habitos",
  initialState,
  reducers: {

    toggleHabito: (state, action) => {
      const habito = state.habitos.find(h => h.id === action.payload)
      if (habito) {
        habito.done = !habito.done
        habito.streak = habito.done ? habito.streak + 1 : 0
      }
    },

    setHabitos: (state, action) => {
      state.habitos = action.payload
    }

  }
})

export const { toggleHabito, setHabitos } = habitosSlice.actions

export default habitosSlice.reducer