export function sesion(){
    const sesion=localStorage.getItem("usuarioPHP")||localStorage.getItem("usuarioGoogle");
    if(!sesion){
        window.location.href="/login";
    }
}