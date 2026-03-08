import { useMemo, useState } from "react"
import {
    CONFIGURACION_CICLO,
    COLORES_CICLO,
    crearEventoSintoma,
    generarEventosCiclo
} from "./CalculosCalendario"

export function usarSeguimientoCiclo() {
    const [inicioCiclo, setInicioCiclo] = useState(null) // ISO yyyy-mm-dd
    const [sintomas, setSintomas] = useState([])

    const { eventos, prediccion } = useMemo(() => {
        return generarEventosCiclo({
            inicioCiclo,
            sintomas,
            config: CONFIGURACION_CICLO,
            colores: COLORES_CICLO
        })
    }, [inicioCiclo, sintomas])

    const marcarInicioCiclo = (fechaISO) => setInicioCiclo(fechaISO)

    const agregarSintoma = ({ titulo, fechaISO }) => {
        const t = (titulo || "").trim()
        if (!t) return
        setSintomas((prev) => [...prev, crearEventoSintoma({ titulo: t, fechaISO })])
    }

    const reiniciarTodo = () => {
        setInicioCiclo(null)
        setSintomas([])
    }
    const eliminarSintoma = ({ titulo, fechaISO }) => {
        setSintomas((prev) =>
            prev.filter(
                (e) => !(e.start === fechaISO && e.title === titulo && e.extendedProps?.type === "symptom")
            )
        )
    }
    return {
        inicioCiclo,
        sintomas,
        eventos,
        prediccion,
        marcarInicioCiclo,
        agregarSintoma,
        reiniciarTodo,
        eliminarSintoma,
        configuracion: CONFIGURACION_CICLO,
        colores: COLORES_CICLO
    }
}
