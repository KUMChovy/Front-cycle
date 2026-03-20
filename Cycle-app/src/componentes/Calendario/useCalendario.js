import { useMemo, useState } from "react"
import {
    CONFIGURACION_CICLO,
    COLORES_CICLO,
    crearEventoSintoma,
    generarEventosCiclo
} from "./CalculosCalendario"

export function usarSeguimientoCiclo() {

    const [inicioCiclo, setInicioCiclo] = useState(() => {
        return localStorage.getItem("inicioCiclo") || null
    })

    const [sintomas, setSintomas] = useState(() => {
        return JSON.parse(localStorage.getItem("sintomasCiclo")) || []
    })

    const { eventos, prediccion } = useMemo(() => {
        return generarEventosCiclo({
            inicioCiclo,
            sintomas,
            config: CONFIGURACION_CICLO,
            colores: COLORES_CICLO
        })
    }, [inicioCiclo, sintomas])

    const marcarInicioCiclo = (fechaISO) => {
        setInicioCiclo(fechaISO)
        localStorage.setItem("inicioCiclo", fechaISO)
    }

    const agregarSintoma = ({ titulo, fechaISO, icono }) => {

        const t = (titulo || "").trim()
        if (!t) return

        setSintomas(prev => {

            const nuevo = [
                ...prev,
                crearEventoSintoma({ titulo: t, fechaISO, icono })
            ]

            localStorage.setItem("sintomasCiclo", JSON.stringify(nuevo))

            return nuevo
        })
    }

    const eliminarSintoma = ({ titulo, fechaISO }) => {

        setSintomas(prev => {

            const nuevo = prev.filter(
                e => !(e.start === fechaISO && e.title === titulo)
            )

            localStorage.setItem("sintomasCiclo", JSON.stringify(nuevo))

            return nuevo
        })
    }

    const reiniciarTodo = () => {

        setInicioCiclo(null)
        setSintomas([])

        localStorage.removeItem("inicioCiclo")
        localStorage.removeItem("sintomasCiclo")
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