export function sesion(){
    const sesion=localStorage.getItem("usuarioPHP")||localStorage.getItem("usuarioGoogle");
    const ruta=window.location.pathname;
    if(!sesion&&ruta!=="/login"&&ruta!=="/register"){
        window.location.href="/login";
        return false;
    }
    if(sesion&&ruta==="/login"||ruta==="/register"){
        window.location.href="/ciclo"
        return false;
    }
    return true;
}