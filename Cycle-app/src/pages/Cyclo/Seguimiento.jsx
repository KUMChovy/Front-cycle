import { useState } from "react"
import Calendario from "../../componentes/Calendario/Calendario"
import Modal from "../../componentes/Modals/Modal"
import { usarSeguimientoCiclo } from "../../componentes/Calendario/useCalendario"
import { sesion } from "../../componentes/funciones/sesion"
import { useNavigate } from "react-router-dom"

export default function PaginaCiclo() {
    sesion()
    const {
        inicioCiclo, eventos, prediccion,
        marcarInicioCiclo, borrarSintoma, reiniciarTodo,
        cargando, error, configuracion, colores,
    } = usarSeguimientoCiclo()

    const [fechaSeleccionada, setFechaSeleccionada] = useState(null)
    const [modal, setModal] = useState({ abierto: false, tipo: null })
    const [sintomaSeleccionado, setSintomaSeleccionado] = useState(null)
    const [errorLocal, setErrorLocal] = useState(null)

    const abrirModal = (tipo) => setModal({ abierto: true, tipo })
    const cerrarModal = () => { setModal({ abierto: false, tipo: null }); setSintomaSeleccionado(null); setErrorLocal(null) }
    const navigate = useNavigate()

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

    const handleBorrarSintoma = async () => {
        if (!sintomaSeleccionado?.id_registro) return
        setErrorLocal(null)
        try { await borrarSintoma({ id_registro: sintomaSeleccionado.id_registro }); cerrarModal() }
        catch (e) { setErrorLocal(e.message) }
    }

    const confirmarInicioCiclo = async () => {
        setErrorLocal(null)
        try { await marcarInicioCiclo(fechaSeleccionada); cerrarModal() }
        catch (e) { setErrorLocal(e.message) }
    }

    const confirmarReinicio = async () => {
        setErrorLocal(null)
        try { await reiniciarTodo(); cerrarModal() }
        catch (e) { setErrorLocal(e.message) }
    }

    return (
        <>
            <div className="relative min-h-screen overflow-x-hidden">
                <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#FCE7F3]">
                    <div className="absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
                    <div className="absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
                    <div className="absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 pt-[calc(env(safe-area-inset-top)+16px)] pb-[calc(env(safe-area-inset-bottom)+16px)]">

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

                    <Calendario
                        eventos={eventos}
                        alSeleccionarDia={alSeleccionarDia}
                        alSeleccionarEvento={alSeleccionarEvento}
                        alSolicitarReinicio={() => abrirModal("reinicio")}
                        textoAyuda={inicioCiclo ? "Toca un día para agregar un síntoma" : "Toca un día para marcar el inicio del ciclo"}
                    />

                    {prediccion && (
                        <div className="mt-4 rounded-2xl bg-white/70 p-4 text-center shadow backdrop-blur">
                            <p className="text-base font-extrabold text-gray-900">{prediccion}</p>
                            <p className="text-xs font-semibold text-gray-600">
                                *Estimación basada en un ciclo de {configuracion.duracionCiclo} días.
                            </p>
                        </div>
                    )}

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

            {/* Modal: inicio ciclo */}
            {modal.abierto && modal.tipo === "ciclo" && (
                <Modal titulo="Inicio del ciclo" alCerrar={cerrarModal} alConfirmar={confirmarInicioCiclo} textoConfirmar="Marcar">
                    <p className="text-sm text-gray-700">¿Marcar <b>{fechaSeleccionada}</b> como inicio del ciclo?</p>
                    <p className="mt-2 text-[11px] text-gray-500">Después podrás agregar síntomas tocando cualquier día.</p>
                    {errorLocal && <p className="mt-2 text-xs text-red-600 font-semibold">{errorLocal}</p>}
                </Modal>
            )}

            {/* Modal: ver/borrar síntoma */}
            {modal.abierto && modal.tipo === "verSintoma" && (
                <Modal titulo="Síntoma" alCerrar={cerrarModal} alConfirmar={handleBorrarSintoma} textoConfirmar="Borrar">
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-xl">🩹</div>
                        <div>
                            <p className="text-sm font-extrabold text-gray-900">{sintomaSeleccionado?.titulo}</p>
                            <p className="text-xs font-semibold text-gray-600">Fecha: {sintomaSeleccionado?.fechaISO}</p>
                        </div>
                    </div>
                    {errorLocal && <p className="mt-2 text-xs text-red-600 font-semibold">{errorLocal}</p>}
                </Modal>
            )}

            {/* Modal: reinicio */}
            {modal.abierto && modal.tipo === "reinicio" && (
                <Modal titulo="Reiniciar ciclo" alCerrar={cerrarModal} alConfirmar={confirmarReinicio} textoConfirmar="Reiniciar">
                    <p className="text-sm text-gray-700">Se borrará el ciclo y todos los síntomas de forma permanente.</p>
                    {errorLocal && <p className="mt-2 text-xs text-red-600 font-semibold">{errorLocal}</p>}
                </Modal>
            )}
        </>
    )
}

function ItemLeyenda({ color, texto, borde }) {
    return (
        <div className="flex items-center gap-2">
            <div className={`h-4 w-4 rounded ${borde ? "border border-black/20" : ""}`} style={{ backgroundColor: color }} />
            <span className="text-sm font-semibold text-gray-800">{texto}</span>
        </div>
    )
}