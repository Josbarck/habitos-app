const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4000
const SECRET = "secreto123"

let users = []
let habitos = []

app.post("/register", (req, res) => {
  const { email, password } = req.body

  users.push({ email, password })

  res.json({ mensaje: "Usuario registrado" })
})

app.post("/login", (req, res) => {
  const { email, password } = req.body

  const user = users.find(
    u => u.email === email && u.password === password
  )

  if (!user) {
    return res.status(401).json({ mensaje: "Credenciales incorrectas" })
  }

  const token = jwt.sign({ email: user.email }, SECRET)

  res.json({ token })
})

function verificarToken(req, res, next) {
  const token = req.headers["authorization"]

  if (!token) {
    return res.status(403).json({ mensaje: "No hay token" })
  }

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido" })
  }
}

app.get("/habitos", verificarToken, (req, res) => {
  res.json(habitos)
})

app.post("/habitos", verificarToken, (req, res) => {
  const { nombre } = req.body

  const nuevo = {
    id: Date.now(),
    nombre,
    done: false,
    streak: 0
  }

  habitos.push(nuevo)

  res.json(nuevo)
})

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT)
})

app.put("/habitos/:id", verificarToken, (req, res) => {

  const { id } = req.params

  habitos = habitos.map(h => {
  if (h.id == id) {

    const nuevoDone = !h.done

    return {
      ...h,
      done: nuevoDone,
      streak: nuevoDone ? h.streak + 1 : 0
    }
  }
  return h
})

  res.json({ mensaje: "Hábito actualizado" })
})