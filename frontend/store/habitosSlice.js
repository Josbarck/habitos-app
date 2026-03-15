import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  lista: [
    { id: 1, nombre: "Hacer ejercicio", dias: 3 },
    { id: 2, nombre: "Leer 10 minutos", dias: 1 }
    
  ]
}

const habitosSlice = createSlice({
  name: "habitos",
  initialState,
  reducers: {
    agregarHabito: (state, action) => {
      state.lista.push(action.payload)
    }
  }
})

export const { agregarHabito } = habitosSlice.actions

export default habitosSlice.reducer