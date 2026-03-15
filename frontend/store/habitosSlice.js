import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  habitos: [
    { id: 1, nombre: "Beber agua", done: false },
    { id: 2, nombre: "Hacer ejercicio", done: false },
    { id: 3, nombre: "Leer 10 páginas", done: false }
  ]
}

const habitosSlice = createSlice({
  name: "habitos",
  initialState,
  reducers: {}
})

export default habitosSlice.reducer