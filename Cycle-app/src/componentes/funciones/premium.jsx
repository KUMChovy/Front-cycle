// premium.jsx
export async function validarPremium() {
    try {
        const res = await fetch("http://localhost/cycle_back/control/usuario.php", {
            credentials: "include", // enviar cookies
        });

        const text = await res.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            console.error("Respuesta no es JSON:", text);
            return false;
        }

        if (data.error) {
            console.warn("Error backend:", data.error);
            return false;
        }

        // Solo validar tipo
        const tipo = (data.tipo && typeof data.tipo === "string") ? data.tipo.toLowerCase() : "normal";
        const esPremium = tipo === "premium";

        console.log("Tipo de usuario:", tipo, "Es premium:", esPremium);
        return esPremium;

    } catch (error) {
        console.error("Error validando premium:", error);
        return false;
    }
}