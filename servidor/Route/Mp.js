const express = require("express");
const router = express.Router()
const Contenedor = require("../js/Contenedor");
const contenedor = new Contenedor()

module.exports = router



router.get("/",async(req,res)=>{   // obtener todas las mp
    try {
        let ListaDeMP = await contenedor.obtenerMp()
        res.send({message: ListaDeMP})   
    } catch (error) {
        return (error)
    }
})

router.get("/:wid", async(req, res)=>{ // obtener mp por id
    let idx = req.params.wid 
    try {
        let materiaPrima = await contenedor.obtenerId(idx)
        res.send({message:materiaPrima})
        
    } catch (error) {
        return (error)  
    }
} )


router.post("/", (req,res)=>{  // guardar mp o crear archivo en caso de no existir
    let CargadeMp = req.body;
    contenedor.save(CargadeMp).then(result=>{
        res.send(result)
    })
})

router.put("/", async(req, res)=>{  // modificar por id
  
    try {
        let materiaPrima = await contenedor.odificarporId(req.body)
        res.send({message: "Materia prima editada con exito"})
        
    } catch (error) {
        return (error)  
    }
} )

router.delete('/:pid',(req,res)=>{  // borrar por id 
    let id= parseInt(req.params.pid);
    contenedor.eliminarPorId(id).then(result=>{
        res.send(result)
    })
})


module.expres = router