export async function validar(){    
    const usuario =
      JSON.parse(localStorage.getItem("usuarioPHP")) ||
      JSON.parse(localStorage.getItem("usuarioGoogle"));
      const apiPHP=await fetch("http://localhost/cycle_back/modelo/API_validacion.php",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({
                usuario_id: usuario.id,
        })
    });
const respuesta= await apiPHP.json();

if(respuesta.existe){
    window.location.href="/ciclo"
    return;
}
}