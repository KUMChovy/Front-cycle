import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import esLocale from "@fullcalendar/core/locales/es"
import { usarSeguimientoCiclo } from "../../componentes/Calendario/useCalendario"
import { SECCIONES_SINTOMAS, obtenerIcono } from "../../componentes/Calendario/ConfigSintomas"

export default function SeguimientoDia() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { agregarSintomasDia, idCiclo, cargando, error } = usarSeguimientoCiclo()

    const fechaISO = state?.fechaISO
    const [seleccionados, setSeleccionados] = useState([])
    const [guardando, setGuardando] = useState(false)
    const [errorLocal, setErrorLocal] = useState(null)

    const toggle = (op) => {
        setSeleccionados(prev =>
            prev.some(i => i.id === op.id)
                ? prev.filter(i => i.id !== op.id)
                : [...prev, op]
        )
    }

    const guardar = async () => {
        if (seleccionados.length === 0) { navigate("/ciclo"); return }
        setGuardando(true)
        setErrorLocal(null)
        try {
            await agregarSintomasDia({ fechaISO, sintomasSeleccionados: seleccionados })
            navigate("/ciclo")
        } catch (e) {
            setErrorLocal(e.message || "Error al guardar. Intenta de nuevo.")
        } finally {
            setGuardando(false)
        }
    }

    return (
        <div className="fixed inset-0 w-screen h-screen overflow-y-auto bg-gradient-to-b from-[#FCE7F3] to-[#FBCFE8]">
            <div className="absolute -top-28 left-0 w-full h-[300px] bg-[#F9A8D4]/60 rounded-b-[120px]" />

            <div className="relative z-10 px-5 pt-6 pb-12">

                <div className="flex items-center justify-between mb-6">
                    <button onClick={() => navigate("/ciclo")} className="text-xl font-bold">←</button>
                    <div className="bg-gradient-to-r from-pink-200 to-pink-100 px-6 py-2 rounded-full text-sm font-bold shadow">
                        {fechaISO ?? "—"}
                    </div>
                    <div className="w-6" />
                </div>

                <div className="bg-white rounded-3xl p-3 mb-6 shadow">
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridWeek"
                        locale={esLocale}
                        headerToolbar={false}
                        height="auto"
                        events={[]}
                        contentHeight={80}
                        dayCellClassNames={(arg) => {
                            const hoy = new Date().toISOString().split("T")[0]
                            return arg.dateStr === hoy ? ["bg-pink-200 rounded-full"] : []
                        }}
                        dayCellContent={(arg) => (
                            <div className="text-sm font-bold">{arg.dayNumberText.replace(" ", "")}</div>
                        )}
                    />
                </div>

                {!cargando && !idCiclo && (
                    <div className="mb-4 rounded-2xl bg-yellow-100 border border-yellow-300 p-3 text-sm font-semibold text-yellow-800">
                        ⚠️ Primero marca el inicio de tu ciclo en el calendario.
                    </div>
                )}

                {(errorLocal || error) && (
                    <div className="mb-4 rounded-2xl bg-red-100 border border-red-300 p-3 text-sm font-semibold text-red-700">
                        {errorLocal || error}
                    </div>
                )}

                {SECCIONES_SINTOMAS.map(sec => (
                    <div key={sec.titulo} className="mb-7">
                        <h3 className="text-lg font-extrabold mb-3 text-gray-800">{sec.titulo}</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {sec.opciones.map(op => {
                                const activo = seleccionados.some(i => i.id === op.id)
                                return (
                                    <button
                                        key={op.id}
                                        onClick={() => toggle(op)}
                                        className={`h-[90px] rounded-2xl border flex flex-col items-center justify-center transition-all duration-200 shadow-sm
                      ${activo
                                                ? "bg-gradient-to-br from-pink-300 to-pink-200 border-pink-400 scale-105 shadow-md"
                                                : "bg-gradient-to-br from-white to-pink-50 border-pink-200"
                                            }`}
                                    >
                                        <div className="scale-150 mb-2">{obtenerIcono(op.id)}</div>
                                        <span className="text-xs font-bold text-center px-1">{op.etiqueta}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}

                <button
                    onClick={guardar}
                    disabled={guardando || cargando || !idCiclo}
                    className="w-full mt-4 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-300 py-3 text-base font-extrabold text-white shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {guardando ? "Guardando…" : "Guardar"}
                </button>

            </div>
        </div>
    )
}