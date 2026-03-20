import { useState } from "react"
import Calendario from "../../componentes/Calendario/Calendario"
import Modal from "../../componentes/Modals/Modal"
import { usarSeguimientoCiclo } from "../../componentes/Calendario/useCalendario"
import { sesion } from "../../componentes/funciones/sesion"
import { useNavigate } from "react-router-dom"

// Sintomas
const OPCIONES_SINTOMAS = [
    { id: "dolor", etiqueta: "Dolor" },
    { id: "cansancio", etiqueta: "Cansancio" }
]

export default function PaginaCiclo() {
    sesion();
    const {
        inicioCiclo,
        eventos,
        prediccion,
        marcarInicioCiclo,
        agregarSintoma,
        eliminarSintoma,
        reiniciarTodo,
        configuracion,
        colores
    } = usarSeguimientoCiclo()

    const [fechaSeleccionada, setFechaSeleccionada] = useState(null)
    const [modal, setModal] = useState({ abierto: false, tipo: null })
    // tipos: "ciclo" | "seleccionarSintoma" | "verSintoma" | "reinicio"

    const [sintomaSeleccionado, setSintomaSeleccionado] = useState(null)
    // { titulo, fechaISO }

    const [sintomaElegidoId, setSintomaElegidoId] = useState(null)

    const abrirModal = (tipo) => setModal({ abierto: true, tipo })
    const cerrarModal = () => {
        setModal({ abierto: false, tipo: null })
        setSintomaElegidoId(null)
    }

    const navigate = useNavigate()

    // click en día
    const alSeleccionarDia = (fechaISO) => {
setFechaSeleccionada(fechaISO)

if (!inicioCiclo) {
abrirModal("ciclo")
}
else {
navigate("/seguimiento-dia", { state: { fechaISO } })
}
}

    //  click en evento sintoma
    const alSeleccionarEvento = (evento) => {
        if (evento.extendedProps?.type !== "symptom") return
        setSintomaSeleccionado({
            titulo: evento.title,
            fechaISO: evento.startStr
        })
        abrirModal("verSintoma")
    }

    // elimina el sintoma
    const borrarSintoma = () => {
    if (!sintomaSeleccionado) return
    eliminarSintoma({
        titulo: sintomaSeleccionado.titulo,
        fechaISO: sintomaSeleccionado.fechaISO
    })
    cerrarModal()
    }


    const solicitarReinicio = () => abrirModal("reinicio")

    const confirmarInicioCiclo = () => {
        marcarInicioCiclo(fechaSeleccionada)
        cerrarModal()
    }

    const guardarSintomaSeleccionado = () => {
        const opcion = OPCIONES_SINTOMAS.find((o) => o.id === sintomaElegidoId)
        if (!opcion) return

        agregarSintoma({ titulo: opcion.etiqueta, fechaISO: fechaSeleccionada })
        cerrarModal()
    }

    const confirmarReinicio = () => {
        reiniciarTodo()
        cerrarModal()
    }

    return (
        <>
            {/* ===== Background ===== */}
            <div className="relative min-h-screen overflow-x-hidden">
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#FCE7F3]">
                    <div className="absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
                    <div className="absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
                    <div className="absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />

                    <div className="absolute bottom-14 right-10 hidden h-[380px] w-[380px] rounded-full border border-white/45 lg:block" />
                    <div className="absolute bottom-5 right-28 hidden h-[260px] w-[260px] rounded-full border border-white/35 lg:block" />
                </div>

                {/* ===== Content ===== */}
                <div
                    className="
            relative z-10 mx-auto w-full max-w-5xl
            px-6 sm:px-10
            pt-[calc(env(safe-area-inset-top)+16px)]
            pb-[calc(env(safe-area-inset-bottom)+16px)]
          "
                >
                    <Calendario
                        eventos={eventos}
                        alSeleccionarDia={alSeleccionarDia}
                        alSeleccionarEvento={alSeleccionarEvento}
                        alSolicitarReinicio={solicitarReinicio}
                        textoAyuda={
                            inicioCiclo
                                ? "Toca un día para agregar un síntoma"
                                : "Toca un día para marcar el inicio del ciclo"
                        }
                    />

                    {/* Predicción */}
                    {prediccion && (
                        <div className="mt-4 rounded-2xl bg-white/70 p-4 text-center shadow backdrop-blur">
                            <p className="text-base font-extrabold text-gray-900">{prediccion}</p>
                            <p className="text-xs font-semibold text-gray-600">
                                *Estimación basada en un ciclo de {configuracion.duracionCiclo} días.
                            </p>
                        </div>
                    )}

                    {/* Leyenda */}
                    <div className="mt-4 rounded-2xl bg-white/70 p-4 shadow backdrop-blur">
                        <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                            <ItemLeyenda color={colores.menstruacion} texto="Menstruación" />
                            <ItemLeyenda color={colores.fertil} texto="Días fértiles" />
                            <ItemLeyenda color={colores.ovulacion} texto="Ovulación" />
                            <ItemLeyenda color="#FCE7F3" texto="Síntomas (🩹)" borde />
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Modales ===== */}

            {/* Modal: marcar inicio ciclo */}
            {modal.abierto && modal.tipo === "ciclo" && (
                <Modal
                    titulo="Inicio del ciclo"
                    alCerrar={cerrarModal}
                    alConfirmar={confirmarInicioCiclo}
                    textoConfirmar="Marcar"
                >
                    <p className="text-sm text-gray-700">
                        ¿Marcar <b className="text-gray-900">{fechaSeleccionada}</b> como inicio del ciclo?
                    </p>
                    <p className="mt-2 text-[11px] text-gray-500">
                        Después podrás agregar síntomas tocando cualquier día.
                    </p>
                </Modal>
            )}

            {/*  Modal: seleccionar síntoma (multi opción) */}
            {modal.abierto && modal.tipo === "seleccionarSintoma" && (
                <Modal
                    titulo="Selecciona un síntoma"
                    alCerrar={cerrarModal}
                    alConfirmar={guardarSintomaSeleccionado}
                    textoConfirmar="Guardar"
                    deshabilitado={!sintomaElegidoId}
                >
                    <p className="mb-3 text-xs font-semibold text-gray-500">
                        Fecha: <b className="text-gray-800">{fechaSeleccionada}</b>
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                        {OPCIONES_SINTOMAS.map((op) => {
                            const activo = sintomaElegidoId === op.id
                            return (
                                <button
                                    key={op.id}
                                    type="button"
                                    onClick={() => setSintomaElegidoId(op.id)}
                                    className={
                                        "rounded-xl px-3 py-3 text-sm font-extrabold shadow-sm transition active:scale-95 " +
                                        (activo
                                            ? "bg-rose-400 text-white"
                                            : "bg-white/80 text-gray-800 hover:bg-white")
                                    }
                                >
                                    {op.etiqueta}
                                </button>
                            )
                        })}
                    </div>
                </Modal>
            )}

            {/* Modal: ver síntoma  */}
            {modal.abierto && modal.tipo === "verSintoma" && (
                <Modal
                    titulo="Síntoma"
                    alCerrar={cerrarModal}
                    alConfirmar={borrarSintoma}
                    textoConfirmar="Borrar"
                >
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-xl">
                            
                        </div>
                        <div>
                            <p className="text-sm font-extrabold text-gray-900">{sintomaSeleccionado?.titulo}</p>
                            <p className="text-xs font-semibold text-gray-600">
                                Fecha: {sintomaSeleccionado?.fechaISO}
                            </p>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Modal: reinicio */}
            {modal.abierto && modal.tipo === "reinicio" && (
                <Modal
                    titulo="Reiniciar ciclo"
                    alCerrar={cerrarModal}
                    alConfirmar={confirmarReinicio}
                    textoConfirmar="Reiniciar"
                >
                    <p className="text-sm text-gray-700">
                        Se borrará el inicio del ciclo y todos los síntomas (solo en esta sesión).
                    </p>
                </Modal>
            )}
        </>
    )
}

function ItemLeyenda({ color, texto, borde }) {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`h-4 w-4 rounded ${borde ? "border border-black/20" : ""}`}
                style={{ backgroundColor: color }}
            />
            <span className="text-sm font-semibold text-gray-800">{texto}</span>
        </div>
    )
}