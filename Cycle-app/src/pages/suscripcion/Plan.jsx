import { sesion } from "../../componentes/funciones/sesion";

const handleCheckout = async (plan) => {

  try {
    console.log("Enviando plan:", plan);
    
    const res = await fetch("http://localhost/cycle_back/control/create_preference.php", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan }),
    });

    console.log("Status:", res.status);
    
    // Obtener la respuesta como texto primero
    const textResponse = await res.text();
    console.log("Respuesta cruda:", textResponse);
    
    // Intentar parsear JSON
    let data;
    try {
      data = JSON.parse(textResponse);
    } catch (e) {
      console.error("Error parseando JSON:", e);
      alert("Error: La respuesta no es JSON válido. Ver consola.");
      return;
    }
    
    console.log("Respuesta parseada:", data);

    // Si es plan gratuito
    if (data.redirect) {
      window.location.href = data.redirect;
      return;
    }

    // Si hay error
    if (data.error) {
      alert("Error: " + data.error);
      console.error("Error detallado:", data);
      return;
    }

    // Si tenemos init_point
    if (data.init_point) {
      console.log("Redirigiendo a:", data.init_point);
      window.location.href = data.init_point;
    } else {
      console.error("No se recibió init_point. Respuesta:", data);
      alert("Error: No se pudo crear la preferencia de pago. Ver consola.");
    }
  } catch (error) {
    console.error("Error en checkout:", error);
    alert("Error de conexión: " + error.message);
  }
};

export default function Plan() {
  sesion();

  const cards = [
    {
      title: "Plan Básico",
      h2: "MXN 0 al mes",
      text: ["Seguimiento del Ciclo", "Registro de Síntomas", "Historial de Ciclos",],
      gradient: "bg-gradient-to-r from-[#ff84ab] to-[#ffc1d6]",
    },
    {
      title: "Plan Premium",
      h2: "MXN 35 al mes",
      text: [
        "Mensajes Bot/Usuaria",
        
        "Lista de clínicas",
        "Detalle de clínicas",
        "Biblioteca",
        "Listado, categorías y búsquedas",
      ],
      gradient: "bg-gradient-to-r from-[#ff84ab] to-[#ffc1d6]",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition transform"
          >
            <div className={`${card.gradient} p-6`}>
              <h2 className="text-2xl font-bold text-white">{card.title}</h2>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-black">{card.h2}</h3>
              <ul className="text-gray-600 list-disc list-inside space-y-1">
                {card.text.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(card.title)}
                className="mt-4 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 transition"
              >
                Suscribirse
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}