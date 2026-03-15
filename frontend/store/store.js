import { configureStore } from "@reduxjs/toolkit"
import habitosReducer from "./habitosSlice"

export const store = configureStore({
  reducer: {
    habitos: habitosReducer
  }
})