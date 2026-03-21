// src/componentes/funciones/premium.jsx
export async function validarPremium() {
  try {
    const usuario =
      JSON.parse(localStorage.getItem("usuarioPHP")) ||
      JSON.parse(localStorage.getItem("usuarioGoogle"));

    if (!usuario) return null;
    if (!usuario.tipo) return false;

    // ✅ Consulta el tipo actualizado desde el backend
    const response = await fetch("https://salmon-mosquito-816172.hostingersite.com/modelo/login_api.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: usuario.email, auth: usuario.provider === "google" ? "google" : "check" }),
    });

    const data = await response.json();

    if (data.status === "ok" && data.usuario?.tipo) {
      // ✅ Actualiza el tipo en localStorage con el valor real de la BD
      const key = usuario.provider === "google" ? "usuarioGoogle" : "usuarioPHP";
      localStorage.setItem(key, JSON.stringify({ ...usuario, tipo: data.usuario.tipo }));
      return data.usuario.tipo === "premium";
    }

    // Fallback al valor local si falla la red
    return usuario.tipo === "premium";

  } catch (error) {
    console.error("Error backend:", error);
    // Fallback al valor local si no hay conexión
    return false;
  }
}