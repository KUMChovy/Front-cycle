export function logout(){
    localStorage.removeItem("usuarioPHP");
    localStorage.removeItem("usuarioGoogle");
    window.location.href="/login";
}