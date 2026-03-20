// src/componentes/funciones/premium.jsx (sin cambios)
export async function validarPremium() {
  try {
    const usuario =
      JSON.parse(localStorage.getItem("usuarioPHP")) ||
      JSON.parse(localStorage.getItem("usuarioGoogle"));

    if (!usuario) return null;
    if (!usuario.tipo) return false;

    const esPremium = usuario.tipo === "premium";
    return esPremium;
  } catch (error) {
    console.error("Error backend:", error);
    return false;
  }
}