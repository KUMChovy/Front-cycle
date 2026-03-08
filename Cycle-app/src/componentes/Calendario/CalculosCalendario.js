export const CONFIGURACION_CICLO = {
  duracionCiclo: 28,
  diasMenstruacion: 5,
  mesesPrediccion: 12,
  ventanaFertil: { inicio: 10, fin: 14 },
  diaOvulacion: 12
}

export const COLORES_CICLO = {
  menstruacion: "#FFB0C9",
  fertil: "#6EC6FF",
  ovulacion: "#1E88E5"
}

/**
 * Genera eventos del calendario:
 * - Fondos (menstruación, fértiles, ovulación)
 * - + síntomas ya guardados
 */
export function generarEventosCiclo({
  inicioCiclo,
  sintomas = [],
  config = CONFIGURACION_CICLO,
  colores = COLORES_CICLO
}) {
  const lista = [...sintomas]

  if (!inicioCiclo) {
    return { eventos: lista, prediccion: "" }
  }

  const inicio = new Date(inicioCiclo)

  for (let i = 0; i < config.mesesPrediccion; i++) {
    const base = sumarDias(inicio, config.duracionCiclo * i)

    // Menstruación
    for (let d = 0; d < config.diasMenstruacion; d++) {
      lista.push(eventoFondo(sumarDias(base, d), colores.menstruacion))
    }

    // Ventana fértil + ovulación
    for (let f = config.ventanaFertil.inicio; f <= config.ventanaFertil.fin; f++) {
      const esOvulacion = f === config.diaOvulacion
      lista.push(eventoFondo(sumarDias(base, f), esOvulacion ? colores.ovulacion : colores.fertil))
    }
  }

  const proximo = sumarDias(inicio, config.duracionCiclo)
  const prediccion = `Próximo periodo estimado: ${proximo.toLocaleDateString("es-ES")}`

  return { eventos: lista, prediccion }
}

/**
 * Crea el evento de síntoma compatible con FullCalendar.
 */

export function crearEventoSintoma({ titulo, fechaISO }) {
  return {
    title: titulo,
    start: fechaISO,
    allDay: true,
    extendedProps: { type: "symptom" },
    classNames: ["evento-sintoma"] 
  }
}



/* =========================
   Helpers internos (privados)
   ========================= */
function eventoFondo(date, color) {
  return {
    start: aISO(date),
    display: "background",
    backgroundColor: color
  }
}

function sumarDias(date, dias) {
  const d = new Date(date)
  d.setDate(d.getDate() + dias)
  return d
}

function aISO(date) {
  return new Date(date).toISOString().split("T")[0]
}
