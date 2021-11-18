
document.addEventListener("submit", event=>{
    event.preventDefault()
    let form = document.querySelector("#Agregando")
    let data = new FormData(form)
    let tituloMP = data.get("mpacargar")
    let cantidadMP = data.get("catiadDeMp")

    let req = {
        titulo:tituloMP,
        cantidad:cantidadMP
    }



    fetch("http://localhost:8080/api/productos",{
        method: "POST",
        body: JSON.stringify(req),
        headers:{
            "Content-type":"application/json"
        }
    }).then(result=>{ 
        return result.json()
        
    }).then(json=>{console.log(json)})
})