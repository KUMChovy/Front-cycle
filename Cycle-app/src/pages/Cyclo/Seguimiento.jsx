// Seguimiento.jsx
import { useState, useEffect } from "react"
import Calendario from "../../componentes/Calendario/Calendario"
import Modal from "../../componentes/Modals/Modal"
import ModalMonitoreo from "../../componentes/Modals/ModalMonitoreo"
import { usarSeguimientoCiclo } from "../../componentes/Calendario/useCalendario"
import { sesion } from "../../componentes/funciones/sesion"
import { useNavigate } from "react-router-dom"
import { CONFIGURACION_CICLO } from "../../componentes/Calendario/CalculosCalendario"

export default function PaginaCiclo() {
    sesion()


    const {
        inicioCiclo,
        eventos,
        prediccion,
        marcarInicioCiclo,
        borrarSintoma,
        reiniciarTodo,
        cargando,
        error,
        monitoreo,
        cerrarAlertaMonitoreo,
        colores,
    } = usarSeguimientoCiclo()

    const [fechaSeleccionada, setFechaSeleccionada] = useState(null)
    const [modal, setModal] = useState({ abierto: false, tipo: null })
    const [sintomaSeleccionado, setSintomaSeleccionado] = useState(null)
    const [errorLocal, setErrorLocal] = useState(null)
    const [mostrarRecordatorio, setMostrarRecordatorio] = useState(false)

    const abrirModal = (tipo) => setModal({ abierto: true, tipo })
    const cerrarModal = () => {
        setModal({ abierto: false, tipo: null })
        setSintomaSeleccionado(null)
        setErrorLocal(null)
    }

    const navigate = useNavigate()

    // ── Helpers de estado — fuente de verdad para los condicionales
    const esIrregularMonitoreo = monitoreo.enMonitoreo && !monitoreo.esRegular && !!inicioCiclo
    const esIrregularConfirmado = !monitoreo.enMonitoreo && !monitoreo.esRegular && !!inicioCiclo && monitoreo.totalCiclos >= 3
    const esRegularActivo = monitoreo.esRegular && !!inicioCiclo

    // ── Recordatorio mensual SOLO para irregular confirmado ───────
    useEffect(() => {
        if (!esIrregularConfirmado) return

        const ultimoCiclo = new Date(inicioCiclo)
        const hoy = new Date()
        const diasTranscurridos = Math.floor((hoy - ultimoCiclo) / (1000 * 60 * 60 * 24))
        const yaVioAlerta = localStorage.getItem("alertaIrregularMes")
        const mesActual = `${hoy.getFullYear()}-${hoy.getMonth()}`

        if (diasTranscurridos >= monitoreo.duracionPromedio && yaVioAlerta !== mesActual) {
            setMostrarRecordatorio(true)
            localStorage.setItem("alertaIrregularMes", mesActual)
        }
    }, [esIrregularConfirmado, inicioCiclo, monitoreo.duracionPromedio])

    // ── Clicks ────────────────────────────────────────────────────
    const alSeleccionarDia = (fechaISO) => {
        setFechaSeleccionada(fechaISO)
        if (!inicioCiclo) abrirModal("ciclo")
        else navigate("/seguimiento-dia", { state: { fechaISO } })
    }

    const alSeleccionarEvento = (evento) => {
        if (evento.extendedProps?.type !== "symptom") return
        setSintomaSeleccionado({
            titulo: evento.extendedProps?.icono,
            fechaISO: evento.startStr,
            id_registro: evento.extendedProps?.id_registro,
        })
        abrirModal("verSintoma")
    }

    // ── Acciones ──────────────────────────────────────────────────
    const handleBorrarSintoma = async () => {
        if (!sintomaSeleccionado?.id_registro) return
        setErrorLocal(null)
        try {
            await borrarSintoma({ id_registro: sintomaSeleccionado.id_registro })
            cerrarModal()
        } catch (e) { setErrorLocal(e.message) }
    }

    const confirmarInicioCiclo = async () => {
        setErrorLocal(null)
        try {
            await marcarInicioCiclo(fechaSeleccionada)
            cerrarModal()
        } catch (e) { setErrorLocal(e.message) }
    }

    const confirmarReinicio = async () => {
        setErrorLocal(null)
        try {
            await reiniciarTodo()
            cerrarModal()
        } catch (e) { setErrorLocal(e.message) }
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
                <div className="relative z-10 px-5 pt-6 pb-12">

                    {cargando && (
                        <div className="mb-4 rounded-2xl bg-white/70 p-3 text-center text-sm font-semibold text-gray-500 shadow">
                            Cargando datos…
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 rounded-2xl bg-red-100 border border-red-300 p-3 text-sm font-semibold text-red-700">
                            {error}
                        </div>
                    )}

                    {/* Banner monitoreo — SOLO irregular con menos de 3 ciclos */}
                    {esIrregularMonitoreo && (
                        <div className="mb-4 rounded-2xl bg-white/80 border border-pink-200 p-4 shadow backdrop-blur">
                            <p className="text-sm font-extrabold text-gray-800">
                                📊 Modo monitoreo activo
                            </p>
                            <p className="text-xs font-semibold text-gray-600 mt-1">
                                Registra{" "}
                                <b>
                                    {monitoreo.ciclosNecesarios} ciclo
                                    {monitoreo.ciclosNecesarios !== 1 ? "s" : ""} más
                                </b>{" "}
                                para activar predicciones personalizadas.
                                ({monitoreo.totalCiclos}/3 ciclos registrados)
                            </p>
                            <div className="mt-2 h-2 w-full rounded-full bg-pink-100">
                                <div
                                    className="h-2 rounded-full bg-[#E6A9B7] transition-all"
                                    style={{ width: `${(monitoreo.totalCiclos / 3) * 100}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Badge irregular confirmado — 3+ ciclos, variación > 7d */}
                    {esIrregularConfirmado && (
                        <div className="mb-4 rounded-2xl bg-orange-50 border border-orange-200 p-3 shadow backdrop-blur">
                            <p className="text-xs font-semibold text-orange-700">
                                ⚠️ Ciclo irregular — predicciones basadas en tu promedio
                                real de <b>{monitoreo.duracionPromedio} días</b>.
                            </p>
                        </div>
                    )}

                    <Calendario
                        eventos={eventos}
                        alSeleccionarDia={alSeleccionarDia}
                        alSeleccionarEvento={alSeleccionarEvento}
                        alSolicitarReinicio={() => abrirModal("reinicio")}
                        textoAyuda={
                            inicioCiclo
                                ? "Toca un día para agregar un síntoma"
                                : "Toca un día para marcar el inicio del ciclo"
                        }
                    />

                    {/* Predicción regular — 28 días normales */}
                    {prediccion && esRegularActivo && (
                        <div className="mt-4 rounded-2xl bg-white/70 p-4 text-center shadow backdrop-blur">
                            <p className="text-base font-extrabold text-gray-900">{prediccion}</p>
                            <p className="text-xs font-semibold text-gray-600">
                                *Estimación basada en un ciclo regular de {CONFIGURACION_CICLO.duracionCiclo} días.
                            </p>
                        </div>
                    )}

                    {/* Predicción irregular confirmada — promedio real */}
                    {prediccion && esIrregularConfirmado && (
                        <div className="mt-4 rounded-2xl bg-white/70 p-4 text-center shadow backdrop-blur">
                            <p className="text-base font-extrabold text-gray-900">{prediccion}</p>
                            <p className="text-xs font-semibold text-gray-600">
                                *Basado en tu promedio real de{" "}
                                <b>{monitoreo.duracionPromedio} días</b> (ciclo irregular).
                            </p>
                        </div>
                    )}

                    {/* Predicción bloqueada — SOLO irregular en monitoreo */}
                    {esIrregularMonitoreo && (
                        <div className="mt-4 rounded-2xl bg-white/70 p-4 text-center shadow backdrop-blur">
                            <p className="text-sm font-extrabold text-gray-700">
                                🔒 Predicción no disponible aún
                            </p>
                            <p className="text-xs font-semibold text-gray-500 mt-1">
                                Se activará automáticamente al completar 3 ciclos.
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

            {/* ===== Modales bonitos ===== */}

            {/* Bienvenida primer ciclo — para TODOS */}
            {monitoreo.mostrarAlerta && (
                <ModalMonitoreo
                    totalCiclos={monitoreo.totalCiclos}
                    tipo="bienvenida"
                    esRegular={monitoreo.esRegular}
                    onCerrar={cerrarAlertaMonitoreo}
                />
            )}

            {/* Recordatorio mensual — SOLO irregular confirmado */}
            {mostrarRecordatorio && (
                <ModalMonitoreo
                    totalCiclos={monitoreo.totalCiclos}
                    tipo="recordatorio"
                    onCerrar={() => setMostrarRecordatorio(false)}
                />
            )}

            {/* ===== Modales normales ===== */}

            {modal.abierto && modal.tipo === "ciclo" && (
                <Modal
                    titulo="Inicio del ciclo"
                    alCerrar={cerrarModal}
                    alConfirmar={confirmarInicioCiclo}
                    textoConfirmar="Marcar"
                >
                    <p className="text-sm text-gray-700">
                        ¿Marcar <b className="text-gray-900">{fechaSeleccionada}</b> como
                        inicio del ciclo?
                    </p>
                    <p className="mt-2 text-[11px] text-gray-500">
                        Después podrás agregar síntomas tocando cualquier día.
                    </p>
                    {errorLocal && (
                        <p className="mt-2 text-xs text-red-600 font-semibold">{errorLocal}</p>
                    )}
                </Modal>
            )}

            {modal.abierto && modal.tipo === "verSintoma" && (
                <Modal
                    titulo="Síntoma"
                    alCerrar={cerrarModal}
                    alConfirmar={handleBorrarSintoma}
                    textoConfirmar="Borrar"
                >
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-xl">
                            🩹
                        </div>
                        <div>
                            <p className="text-sm font-extrabold text-gray-900">
                                {sintomaSeleccionado?.titulo}
                            </p>
                            <p className="text-xs font-semibold text-gray-600">
                                Fecha: {sintomaSeleccionado?.fechaISO}
                            </p>
                        </div>
                    </div>
                    {errorLocal && (
                        <p className="mt-2 text-xs text-red-600 font-semibold">{errorLocal}</p>
                    )}
                </Modal>
            )}

            {modal.abierto && modal.tipo === "reinicio" && (
                <Modal
                    titulo="Reiniciar ciclo"
                    alCerrar={cerrarModal}
                    alConfirmar={confirmarReinicio}
                    textoConfirmar="Reiniciar"
                >
                    <p className="text-sm text-gray-700">
                        Se borrará el ciclo y todos los síntomas de forma permanente.
                    </p>
                    {errorLocal && (
                        <p className="mt-2 text-xs text-red-600 font-semibold">{errorLocal}</p>
                    )}
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