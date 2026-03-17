const handleCheckout = async (priceId) => {
  const res = await fetch("http://localhost/cycle_back/control/stripe.php.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ priceId })
  });

  const data = await res.json();
  window.location.href = data.url;
};



export default function Plan() {
  const cards = [
    {
      title: "Plan Básico",
      h2: "MXN 0 al mes",
      text: ["Seguimiento del Ciclo", 
        "Registro de Síntomas", 
        "Historial de Ciclos"],
      gradient: "bg-gradient-to-r from-[#ff84ab] to-[#ffc1d6]"
    },
    {
      title: "Plan Premium",
      h2: "MXN 35 al mes",
      text: ["Mensajes Bot/Usuaria",
        "Visualización de Clínicas Cercanos",
        "Lista de clínicas",
        "Detalle de clínicas",
        "Biblioteca",
        "Listado, categorías y búsquedas"],
      gradient: "bg-gradient-to-r from-[#ff84ab] to-[#ffc1d6]"
    },
    
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
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
                    onClick={() => handleCheckout("price_123456")}
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