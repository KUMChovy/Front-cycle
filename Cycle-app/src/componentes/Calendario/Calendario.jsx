import { useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import esLocale from "@fullcalendar/core/locales/es"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { sesion } from "../funciones/sesion";
import { ICONOS_SVG } from "./CalculosCalendario"
import { IconoSintoma } from "./IconosSintomas"
import { obtenerIcono } from "./ConfigSintomas"

/**
 * Props:
 * - eventos
 * - alSeleccionarDia(fechaISO)
 * - alSolicitarReinicio()
 * - alSeleccionarEvento(eventoFullCalendar)  
 * - renderizarEvento(info) (opcional)
 * - textoAyuda (opcional)
 */

export default function Calendario(
    {    
    eventos = [],
    alSeleccionarDia,
    alSolicitarReinicio,
    alSeleccionarEvento,
    renderizarEvento,
    textoAyuda = "Toca un día para continuar"
}) {    

    const refCalendario = useRef(null)
    const [tituloMes, setTituloMes] = useState("")

    // ---- Funciones de navegación de mes ----
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

    // ---- Funciones de click ----
    const alClickDia = (info) => {
        alSeleccionarDia?.(info.dateStr)
    }

    const alClickEvento = (info) => {
        info.jsEvent?.preventDefault?.()
        alSeleccionarEvento?.(info.event)
    }

   const renderDefault = (info) => {

    const props = info.event.extendedProps || {}

    if (props.type !== "symptom") return null

    return (
        <div className="flex justify-center items-center w-full h-full">
            {obtenerIcono(props.icono)}
        </div>
    )
}
    // ---- Exportar PDF ----
    const exportarPDF = () => {
        sesion(); // verifica que haya sesión activa

        const usuario = 
            JSON.parse(localStorage.getItem("usuarioPHP")) || 
            JSON.parse(localStorage.getItem("usuarioGoogle"));

        if (!usuario || !usuario.email) {
            alert("No se encontró usuario en sesión");
            return;
        }

        window.open(
            `https://salmon-mosquito-816172.hostingersite.com/control/pdf.php?correo=${encodeURIComponent(usuario.email)}`,
            "_blank"
        );
    };

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

            {/* Botones Reiniciar y Exportar PDF */}
            <div className="mt-4 flex items-center justify-between md:justify-center md:relative gap-4">
                {/* Botón Reiniciar */}
                <button
                    onClick={alSolicitarReinicio}
                    className="rounded-2xl bg-[#E6A9B7] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:brightness-105 active:scale-95 md:mx-auto">
                    Reiniciar
                </button>

                {/* Botón Exportar PDF */}
                <button
                    onClick={exportarPDF}
                    className="flex items-center gap-2 rounded-2xl bg-[#E6A9B7] px-6 py-3 text-sm font-extrabold text-white shadow-lg transition hover:brightness-105 active:scale-95 md:absolute md:right-0">
                    <FontAwesomeIcon icon={faFilePdf} className="w-6 h-6" />
                    Exportar PDF
                </button>
            </div>
        </div>
    )
}