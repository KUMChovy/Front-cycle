export function sesion(){
    sesion=localStorage.getItem("usuarioPHP")||localStorage.getItem("usuarioGoogle");
    if(!sesion){
        window.location.href="/login";
    }
}