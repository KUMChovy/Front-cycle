import { useCallback, useEffect, useMemo, useState } from "react"
import {
    CONFIGURACION_CICLO,
    COLORES_CICLO,
    generarEventosCiclo,
} from "./CalculosCalendario"
import {
    crearPeriodo,
    obtenerCicloActivo,
    guardarSintomas,
    obtenerSintomas,
    eliminarSintoma,
    reiniciarCiclo,
} from "../../api/ciclo"

export function usarSeguimientoCiclo() {
    const [inicioCiclo, setInicioCiclo] = useState(null)
    const [idCiclo, setIdCiclo] = useState(null)
    const [sintomas, setSintomas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function cargarDatos() {
            setCargando(true)
            setError(null)
            try {
                const resCiclo = await obtenerCicloActivo()
                if (resCiclo.success && resCiclo.ciclo) {
                    setInicioCiclo(resCiclo.ciclo.fecha_ini)
                    setIdCiclo(resCiclo.ciclo.id_ciclo)
                }
                const resSintomas = await obtenerSintomas()
                if (resSintomas.success) setSintomas(resSintomas.sintomas)
            } catch (e) {
                setError("Error al cargar datos: " + e.message)
            } finally {
                setCargando(false)
            }
        }
        cargarDatos()
    }, [])

    const { eventos, prediccion } = useMemo(() => {
        return generarEventosCiclo({
            inicioCiclo,
            sintomas,
            config: CONFIGURACION_CICLO,
            colores: COLORES_CICLO,
        })
    }, [inicioCiclo, sintomas])

    const marcarInicioCiclo = useCallback(async (fechaISO) => {
        setError(null)
        try {
            const res = await crearPeriodo({
                fecha_ini: fechaISO,
                duracion_ciclo: CONFIGURACION_CICLO.duracionCiclo,
                duracion_sangrado: CONFIGURACION_CICLO.diasMenstruacion,
            })
            if (!res.success) throw new Error(res.error || "Error al guardar ciclo")
            setInicioCiclo(fechaISO)
            setIdCiclo(res.id_ciclo)
        } catch (e) {
            setError(e.message)
            throw e
        }
    }, [])

    const agregarSintomasDia = useCallback(async ({ fechaISO, sintomasSeleccionados }) => {
        if (!idCiclo) { setError("No hay ciclo activo"); return }
        setError(null)
        try {
            const res = await guardarSintomas({
                id_ciclo: idCiclo,
                fecha: fechaISO,
                sintomas: sintomasSeleccionados.map(s => s.id),
            })
            if (!res.success) throw new Error(res.error || "Error al guardar síntomas")
            const resSintomas = await obtenerSintomas()
            if (resSintomas.success) setSintomas(resSintomas.sintomas)
        } catch (e) {
            setError(e.message)
            throw e
        }
    }, [idCiclo])

    const borrarSintoma = useCallback(async ({ id_registro }) => {
        setError(null)
        try {
            const res = await eliminarSintoma({ id_registro })
            if (!res.success) throw new Error(res.error || "Error al borrar síntoma")
            setSintomas(prev =>
                prev.filter(e => e.extendedProps?.id_registro !== id_registro)
            )
        } catch (e) {
            setError(e.message)
            throw e
        }
    }, [])

    const reiniciarTodo = useCallback(async () => {
        setError(null)
        try {
            const res = await reiniciarCiclo()
            if (!res.success) throw new Error(res.error || "Error al reiniciar")
            setInicioCiclo(null)
            setIdCiclo(null)
            setSintomas([])
        } catch (e) {
            setError(e.message)
            throw e
        }
    }, [])

    return {
        inicioCiclo, idCiclo, sintomas, eventos, prediccion, cargando, error,
        marcarInicioCiclo, agregarSintomasDia, borrarSintoma, reiniciarTodo,
        configuracion: CONFIGURACION_CICLO,
        colores: COLORES_CICLO,
    }
}