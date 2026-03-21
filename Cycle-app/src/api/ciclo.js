const BASE_URL = "https://salmon-mosquito-816172.hostingersite.com/modelo/ciclo.php";

/* ─── obtener id_usuario del localStorage ─────────────────── */
export function obtenerIdUsuario() {
  const raw = localStorage.getItem("usuarioPHP") || localStorage.getItem("usuarioGoogle");
  if (!raw) return null;
  const u = JSON.parse(raw);
  return u?.id_usuario ?? u?.id ?? null;
}

/* ─── obtener regular/duraciones del test (guardado en localStorage) ─ */
export function obtenerCicloPref() {
  const raw = localStorage.getItem("cicloPref");
  if (!raw) return { regular: "irregular", duracion_ciclo: 28, duracion_sangrado: 5 };
  return JSON.parse(raw);
}

/* ─── 1. Crear/actualizar periodo ─────────────────────────── */
export async function crearPeriodo({ fecha_ini }) {
  const id_usuario = obtenerIdUsuario();
  if (!id_usuario) throw new Error("Sin sesion activa");

  // Enviar el regular del localStorage para que el PHP lo use
  const pref = obtenerCicloPref();

  const res = await fetch(`${BASE_URL}?action=crear_periodo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id_usuario,
      fecha_ini,
      regular: pref.regular,
    }),
  });
  return await res.json();
}

/* ─── 2. Obtener ciclo activo (con fecha_ini) ──────────────── */
export async function obtenerCicloActivo() {
  const id_usuario = obtenerIdUsuario();
  if (!id_usuario) throw new Error("Sin sesion activa");
  const res = await fetch(`${BASE_URL}?action=obtener_ciclo_activo&id_usuario=${id_usuario}`);
  return await res.json();
}

/* ─── 3. Obtener preferencias del test desde BD ───────────── */
export async function obtenerPrefCiclo() {
  const id_usuario = obtenerIdUsuario();
  if (!id_usuario) throw new Error("Sin sesion activa");
  const res = await fetch(`${BASE_URL}?action=obtener_pref_ciclo&id_usuario=${id_usuario}`);
  return await res.json();
}

/* ─── 4. Guardar síntomas ──────────────────────────────────── */
export async function guardarSintomas({ id_ciclo, fecha, sintomas }) {
  const id_usuario = obtenerIdUsuario();
  if (!id_usuario) throw new Error("Sin sesion activa");
  const res = await fetch(`${BASE_URL}?action=guardar_sintomas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_usuario, id_ciclo, fecha, sintomas }),
  });
  return await res.json();
}

/* ─── 5. Obtener síntomas ──────────────────────────────────── */
export async function obtenerSintomas() {
  const id_usuario = obtenerIdUsuario();
  if (!id_usuario) throw new Error("Sin sesion activa");
  const res = await fetch(`${BASE_URL}?action=obtener_sintomas&id_usuario=${id_usuario}`);
  return await res.json();
}

/* ─── 6. Eliminar síntoma ──────────────────────────────────── */
export async function eliminarSintoma({ id_registro }) {
  const id_usuario = obtenerIdUsuario();
  if (!id_usuario) throw new Error("Sin sesion activa");
  const res = await fetch(`${BASE_URL}?action=eliminar_sintoma`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_registro, id_usuario }),
  });
  return await res.json();
}

/* ─── 7. Reiniciar ─────────────────────────────────────────── */
export async function reiniciarCiclo() {
  const id_usuario = obtenerIdUsuario();
  if (!id_usuario) throw new Error("Sin sesion activa");

  // Pasar el regular del localStorage para que el PHP lo conserve
  const pref = obtenerCicloPref();

  const res = await fetch(`${BASE_URL}?action=reiniciar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_usuario, regular: pref.regular }),
  });
  return await res.json();
}

/* ─── 8. Calcular promedio ─────────────────────────────────── */
export async function calcularPromedio() {
  const id_usuario = obtenerIdUsuario();
  if (!id_usuario) throw new Error("Sin sesion activa");
  const res = await fetch(`${BASE_URL}?action=calcular_promedio&id_usuario=${id_usuario}`);
  return await res.json();
}