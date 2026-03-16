const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// Base de datos falsa en memoria
let usuarios = []

// REGISTRO
app.post("/register", async (req, res) => {

  const { username, password } = req.body

  const hash = await bcrypt.hash(password, 10)

  const nuevoUsuario = {
    username,
    password: hash
  }

  usuarios.push(nuevoUsuario)

  res.json({ message: "Usuario registrado" })

})

// LOGIN
app.post("/login", async (req, res) => {

  const { username, password } = req.body

  const usuario = usuarios.find(u => u.username === username)

  if (!usuario) {
    return res.status(401).json({ message: "Usuario no existe" })
  }

  const valido = await bcrypt.compare(password, usuario.password)

  if (!valido) {
    return res.status(401).json({ message: "Contraseña incorrecta" })
  }

  res.json({ message: "Login exitoso" })

})

app.listen(4000, () => {
  console.log("Servidor backend corriendo en puerto 4000")
})