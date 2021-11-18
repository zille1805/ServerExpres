const express = require("express")
const Contenedor = require("../js/Contenedor")
const cors = require("cors")

const app = express()
const Port = process.env.Port || 8080
const MateriaPrima = new Contenedor("MateriaPrima.JSON")


const server = app.listen(Port, ()=>{
    console.log("servidor escuchando en el puerto: " + Port);
})

const mpRouter = require("../Route/Mp")

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use('/imagenes', express.static(__dirname+'/public'))
app.use((req,res,next)=>{
    let timestamp= Date.now();
    let time = new Date(timestamp);
    console.log('Peticion hecha a las: '+time.toTimeString().split(" ")[0]);
    next();
})
app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send('Error en el servidor')
})

app.use("/api/productos", mpRouter)

app.get("/api/productoaleatorio", async(req, res)=>{
    let ListaDeMP= await MateriaPrima.obtenerMp()
    let indiceAlt = Math.round(Math.random()*(ListaDeMP.length -1)) 
    res.send(ListaDeMP[indiceAlt])
})


