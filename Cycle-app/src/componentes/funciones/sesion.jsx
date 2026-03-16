export function sesion(){
    const sesion = localStorage.getItem("usuarioPHP") || localStorage.getItem("usuarioGoogle");
    const ruta = window.location.pathname;

    if(!sesion && (ruta !== "/login" && ruta !== "/register" && ruta !== "/recuperacion")){
        window.location.href = "/login";
        return false;
    }

    if(sesion && (ruta === "/login" || ruta === "/register" || ruta === "/" || ruta === "/recuperacion")){
        window.location.href = "/ciclo";
        return false;
    }

    return true;
}