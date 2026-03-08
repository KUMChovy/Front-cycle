import { useRef } from "react"
import { usarTeclaEscape, bloquearScrollBody } from "./modalHooks"


export default function Modal({
    titulo,
    children,
    alCerrar,
    alConfirmar,
    textoConfirmar = "Aceptar",
    deshabilitado = false,
    cerrarConFondo = true
}) {
    const refPanel = useRef(null)

    usarTeclaEscape(() => alCerrar?.(), true)
    bloquearScrollBody(true)

    const alMouseDownFondo = (e) => {
        if (!cerrarConFondo) return

        // Si el click NO fue dentro del panel -> cerrar
        if (refPanel.current && !refPanel.current.contains(e.target)) {
            alCerrar?.()
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onMouseDown={alMouseDownFondo}
            role="dialog"
            aria-modal="true"
            aria-label={titulo}
        >
            <div
                ref={refPanel}
                className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl modal-aparecer"
            >
                <h2 className="mb-2 text-lg font-extrabold text-gray-900">{titulo}</h2>

                <div className="mb-4 text-sm text-gray-700">{children}</div>

                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={alCerrar}
                        className="rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 active:scale-95 transition"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={alConfirmar}
                        disabled={deshabilitado}
                        className="rounded-xl bg-rose-400 px-4 py-2 text-sm font-extrabold text-white shadow hover:bg-rose-500 active:scale-95 transition disabled:opacity-40 disabled:active:scale-100"
                    >
                        {textoConfirmar}
                    </button>
                </div>
            </div>
        </div>
    )
}
``