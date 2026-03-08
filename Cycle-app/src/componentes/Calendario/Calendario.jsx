import { useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"

/**
 * Props:
 * - eventos
 * - alSeleccionarDia(fechaISO)
 * - alSolicitarReinicio()
 * - alSeleccionarEvento(eventoFullCalendar)  
 * - renderizarEvento(info) (opcional)
 * - textoAyuda (opcional)
 */
export default function Calendario({
    eventos = [],
    alSeleccionarDia,
    alSolicitarReinicio,
    alSeleccionarEvento,
    renderizarEvento,
    textoAyuda = "Toca un día para continuar"
}) {
    const refCalendario = useRef(null)
    const [tituloMes, setTituloMes] = useState("")

    const mesAnterior = () => {
        const api = refCalendario.current?.getApi()
        api?.prev()
        setTituloMes(api?.view?.title || "")
    }

    const mesSiguiente = () => {
        const api = refCalendario.current?.getApi()
        api?.next()
        setTituloMes(api?.view?.title || "")
    }

    const alClickDia = (info) => {
        alSeleccionarDia?.(info.dateStr)
    }

    const alClickEvento = (info) => {
        // evita navegación default
        info.jsEvent?.preventDefault?.()
        alSeleccionarEvento?.(info.event)
    }



    const renderDefault = (info) => {
        if (info.event.extendedProps?.type !== "symptom") return null

        return (
            <div
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-sm ring-1 ring-black/10"
                title={info.event.title}
                aria-label={`Síntoma: ${info.event.title}`}
            >
                🩹
            </div>
        )
    }


    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={mesAnterior}
                    className="rounded-full bg-white/70 px-4 py-2 font-bold shadow-md transition hover:bg-white active:scale-95"
                    aria-label="Mes anterior"
                >
                    ←
                </button>

                <div className="text-center">
                    <h2 className="text-xl font-extrabold capitalize tracking-wide text-gray-900 sm:text-2xl">
                        {tituloMes}
                    </h2>
                    <p className="text-xs font-semibold text-gray-600">{textoAyuda}</p>
                </div>

                <button
                    onClick={mesSiguiente}
                    className="rounded-full bg-white/70 px-4 py-2 font-bold shadow-md transition hover:bg-white active:scale-95"
                    aria-label="Mes siguiente"
                >
                    →
                </button>
            </div>

            {/* Calendario Card */}
            <div className="rounded-3xl border border-black/10 bg-white/70 p-4 shadow-xl backdrop-blur">
                <FullCalendar
                    ref={refCalendario}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    locale={esLocale}
                    fixedWeekCount={false}
                    showNonCurrentDates={false}
                    height="auto"
                    headerToolbar={false}
                    events={eventos}
                    dateClick={alClickDia}
                    eventClick={alClickEvento}
                    eventContent={renderizarEvento || renderDefault}
                    datesSet={(arg) => setTituloMes(arg.view.title)}
                />
            </div>

            {/* Botón reiniciar */}
            <div className="mt-4 flex justify-center">
                <button
                    onClick={alSolicitarReinicio}
                    className="rounded-2xl bg-[#E6A9B7] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:brightness-105 active:scale-95"
                >
                    Reiniciar
                </button>
            </div>
        </div>
    )
}