const BASE_URL = "http://localhost/cycle_back/modelo/ciclo.php";

export function obtenerIdUsuario() {
    const raw =
        localStorage.getItem("usuarioPHP") ||
        localStorage.getItem("usuarioGoogle");
    if (!raw) return null;
    const usuario = JSON.parse(raw);
    return usuario?.id_usuario ?? usuario?.id ?? null;
}

export async function crearPeriodo({ fecha_ini, duracion_ciclo = 28, duracion_sangrado = 5 }) {
    const id_usuario = obtenerIdUsuario();
    if (!id_usuario) throw new Error("Sin sesión activa");
    const res = await fetch(`${BASE_URL}?action=crear_periodo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario, fecha_ini, duracion_ciclo, duracion_sangrado }),
    });
    return await res.json();
}

export async function obtenerCicloActivo() {
    const id_usuario = obtenerIdUsuario();
    if (!id_usuario) throw new Error("Sin sesión activa");
    const res = await fetch(`${BASE_URL}?action=obtener_ciclo_activo&id_usuario=${id_usuario}`);
    return await res.json();
}

export async function guardarSintomas({ id_ciclo, fecha, sintomas }) {
    const id_usuario = obtenerIdUsuario();
    if (!id_usuario) throw new Error("Sin sesión activa");
    const res = await fetch(`${BASE_URL}?action=guardar_sintomas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario, id_ciclo, fecha, sintomas }),
    });
    return await res.json();
}

export async function obtenerSintomas() {
    const id_usuario = obtenerIdUsuario();
    if (!id_usuario) throw new Error("Sin sesión activa");
    const res = await fetch(`${BASE_URL}?action=obtener_sintomas&id_usuario=${id_usuario}`);
    return await res.json();
}

export async function eliminarSintoma({ id_registro }) {
    const id_usuario = obtenerIdUsuario();
    if (!id_usuario) throw new Error("Sin sesión activa");
    const res = await fetch(`${BASE_URL}?action=eliminar_sintoma`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_registro, id_usuario }),
    });
    return await res.json();
}

export async function reiniciarCiclo() {
    const id_usuario = obtenerIdUsuario();
    if (!id_usuario) throw new Error("Sin sesión activa");
    const res = await fetch(`${BASE_URL}?action=reiniciar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario }),
    });
    return await res.json();
}