export async function validar() {
    const usuario =
        JSON.parse(localStorage.getItem("usuarioPHP")) ||
        JSON.parse(localStorage.getItem("usuarioGoogle"));

    if (!usuario) return; // si no hay sesión, sesion() ya redirige

    const usuario_id = usuario?.id_usuario ?? usuario?.id;

    try {
        const res = await fetch("https://salmon-mosquito-816172.hostingersite.com/modelo/API_validacion.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario_id }),
        });

        const respuesta = await res.json();

        if (respuesta.existe) {
            // Ya completó la encuesta → ir al ciclo
            window.location.href = "/ciclo";
        } else {
            // No ha completado la encuesta → ir al test
            window.location.href = "/test";
        }
    } catch (e) {
        console.error("Error en validar():", e);
    }
}