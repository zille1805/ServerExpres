const express = require("express")
const Contenedor = require("../js/Contenedor")

const app = express()
const Port = process.env.Port || 8080
const MateriaPrima = new Contenedor("MateriaPrima.JSON")


const server = app.listen(Port, ()=>{
    console.log("servidor escuchando en el puerto: " + Port);
})

app.get("/productos",async(req,res)=>{
    let ListaDeMP = await MateriaPrima.obtenerMp()
    res.send({message: ListaDeMP})
})
app.get("/productoaleatorio", async(req, res)=>{
    let ListaDeMP= await MateriaPrima.obtenerMp()
    let indiceAlt = Math.round(Math.random()*(ListaDeMP.length -1)) 
    res.send(ListaDeMP[indiceAlt])
})

app.post("/productos",async(req,res)=>{
    let CargadeMp = req.body;
    MateriaPrima.save(CargadeMp).then(result=>{
        res.send(result)
    })
})
