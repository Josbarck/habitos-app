const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// lista temporal de habitos
let habitos = [
    {
        id: 1,
        nombre: "Hacer ejercicio",
        dias: 5
    },
    {
        id: 2,
        nombre: "Leer 10 minutos",
        dias: 2
    }
]

// obtener habitos
app.get("/habitos", (req, res) => {
    res.json(habitos)
})

// crear habito
app.post("/habitos", (req, res) => {

    const nuevoHabito = {
        id: habitos.length + 1,
        nombre: req.body.nombre,
        dias: 0
    }

    habitos.push(nuevoHabito)

    res.json(nuevoHabito)
})

// actualizar habito
app.put("/habitos/:id", (req, res) => {

    const id = parseInt(req.params.id)

    habitos = habitos.map(h => {

        if(h.id === id){
            h.nombre = req.body.nombre
        }

        return h
    })

    res.json({mensaje:"habito actualizado"})
})

// eliminar habito
app.delete("/habitos/:id", (req, res) => {

    const id = parseInt(req.params.id)

    habitos = habitos.filter(h => h.id !== id)

    res.json({mensaje:"habito eliminado"})
})

app.listen(3001, () => {
    console.log("Servidor corriendo en puerto 3001")
})