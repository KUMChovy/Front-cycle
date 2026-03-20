import { useCallback, useEffect, useMemo, useState } from "react"
import {
  CONFIGURACION_CICLO,
  COLORES_CICLO,
  generarEventosCiclo,
} from "./CalculosCalendario"
import {
  crearPeriodo,
  obtenerCicloActivo,
  obtenerPrefCiclo,
  guardarSintomas,
  obtenerSintomas,
  eliminarSintoma,
  reiniciarCiclo,
  calcularPromedio,
  obtenerCicloPref,
} from "../../api/ciclo"

/* ─── Lee cicloPref del localStorage ─────────────────────── */
function leerPrefLocal() {
  const raw = localStorage.getItem("cicloPref");
  if (!raw) return { regular: "irregular", duracion_ciclo: 28, duracion_sangrado: 5 };
  return JSON.parse(raw);
}

export function usarSeguimientoCiclo() {
  const [inicioCiclo, setInicioCiclo] = useState(null)
  const [idCiclo,     setIdCiclo]     = useState(null)
  const [sintomas,    setSintomas]    = useState([])
  const [cargando,    setCargando]    = useState(true)
  const [error,       setError]       = useState(null)

  const [monitoreo, setMonitoreo] = useState({
    enMonitoreo:      false,
    duracionPromedio: 28,
    esRegular:        true,   // optimista hasta que cargue
    totalCiclos:      0,
    ciclosNecesarios: 3,
    mostrarAlerta:    false,
  })

  /* ─── Carga inicial ─────────────────────────────────────── */
  useEffect(() => {
    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        // 1. Leer regular desde localStorage (fuente de verdad del test)
        const prefLocal     = leerPrefLocal()
        const esRegularLocal = prefLocal.regular === "regular"

        // 2. Si no hay cicloPref en localStorage, pedirlo a la BD
        let esRegularFinal   = esRegularLocal
        let duracionFinal    = prefLocal.duracion_ciclo ?? 28

        if (!localStorage.getItem("cicloPref")) {
          try {
            const resPref = await obtenerPrefCiclo()
            if (resPref.success && resPref.pref) {
              esRegularFinal = resPref.pref.regular === "regular"
              duracionFinal  = resPref.pref.duracion_ciclo ?? 28
              // Guardar en localStorage para persistencia
              localStorage.setItem("cicloPref", JSON.stringify({
                regular:           resPref.pref.regular,
                duracion_ciclo:    resPref.pref.duracion_ciclo ?? 28,
                duracion_sangrado: resPref.pref.duracion_sangrado ?? 5,
              }))
            }
          } catch (_) {}
        }

        // 3. Obtener ciclo activo
        const resCiclo = await obtenerCicloActivo()

        if (resCiclo.success && resCiclo.ciclo) {
          const fechaIni          = new Date(resCiclo.ciclo.fecha_ini)
          const hoy               = new Date()
          const diasTranscurridos = Math.floor((hoy - fechaIni) / (1000 * 60 * 60 * 24))
          const duracion          = parseInt(resCiclo.ciclo.duracion_ciclo) || 28

          // Solo irregulares tienen ciclo que vence
          const cicloVencido = !esRegularFinal && diasTranscurridos > duracion

          if (!cicloVencido) {
            setInicioCiclo(resCiclo.ciclo.fecha_ini)
            setIdCiclo(resCiclo.ciclo.id_ciclo)
          }

          // 4. Calcular promedio para estado de monitoreo
          const resProm = await calcularPromedio()
          if (resProm.success) {
            setMonitoreo(prev => ({
              ...prev,
              enMonitoreo:      resProm.en_monitoreo,
              duracionPromedio: resProm.duracion_promedio,
              // Prioridad: calculo real si hay 3+ ciclos, sino usar localStorage
              esRegular:        resProm.total_ciclos >= 3
                                  ? resProm.es_regular
                                  : esRegularFinal,
              totalCiclos:      resProm.total_ciclos,
              ciclosNecesarios: resProm.ciclos_necesarios,
            }))
          } else {
            setMonitoreo(prev => ({
              ...prev,
              esRegular:   esRegularFinal,
              enMonitoreo: !esRegularFinal,
              duracionPromedio: duracionFinal,
            }))
          }
        } else {
          // Sin ciclo activo — estado basado en prefs del test
          setMonitoreo({
            enMonitoreo:      !esRegularFinal,
            duracionPromedio: duracionFinal,
            esRegular:        esRegularFinal,
            totalCiclos:      0,
            ciclosNecesarios: 3,
            mostrarAlerta:    false,
          })
        }

        // 5. Cargar síntomas
        const resSintomas = await obtenerSintomas()
        if (resSintomas.success) setSintomas(resSintomas.sintomas)

      } catch (e) {
        setError("Error al cargar: " + e.message)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  /* ─── Eventos FullCalendar ─────────────────────────────── */
  const { eventos, prediccion } = useMemo(() => {
    // REGULAR     → 28 días, predicción SIEMPRE activa
    // IRREGULAR monitoreo (<3 ciclos) → predicción BLOQUEADA
    // IRREGULAR confirmado (3+ ciclos) → promedio real, predicción activa
    const duracion = (!monitoreo.esRegular && !monitoreo.enMonitoreo)
      ? monitoreo.duracionPromedio
      : CONFIGURACION_CICLO.duracionCiclo

    const config = { ...CONFIGURACION_CICLO, duracionCiclo: duracion }

    if (!monitoreo.esRegular && monitoreo.enMonitoreo) {
      return generarEventosCiclo({
        inicioCiclo, sintomas, config,
        colores: COLORES_CICLO,
        sinPrediccion: true,
      })
    }

    return generarEventosCiclo({
      inicioCiclo, sintomas, config,
      colores: COLORES_CICLO,
    })
  }, [inicioCiclo, sintomas, monitoreo])

  /* ─── Marcar inicio de ciclo ────────────────────────────── */
  const marcarInicioCiclo = useCallback(async (fechaISO) => {
    setError(null)
    try {
      const res = await crearPeriodo({ fecha_ini: fechaISO })
      if (!res.success) throw new Error(res.error || "Error al guardar ciclo")

      setInicioCiclo(fechaISO)
      setIdCiclo(res.id_ciclo)

      const resProm = await calcularPromedio()
      if (resProm.success) {
        const prefLocal    = leerPrefLocal()
        const esRegularLocal = prefLocal.regular === "regular"
        setMonitoreo({
          enMonitoreo:      resProm.en_monitoreo,
          duracionPromedio: resProm.duracion_promedio,
          esRegular:        resProm.total_ciclos >= 3
                              ? resProm.es_regular
                              : esRegularLocal,
          totalCiclos:      resProm.total_ciclos,
          ciclosNecesarios: resProm.ciclos_necesarios,
          mostrarAlerta:    resProm.total_ciclos === 1,
        })
      }
    } catch (e) {
      setError(e.message)
      throw e
    }
  }, [])

  /* ─── Cerrar alerta ─────────────────────────────────────── */
  const cerrarAlertaMonitoreo = useCallback(() => {
    setMonitoreo(prev => ({ ...prev, mostrarAlerta: false }))
  }, [])

  /* ─── Agregar síntomas ──────────────────────────────────── */
  const agregarSintomasDia = useCallback(async ({ fechaISO, sintomasSeleccionados }) => {
    if (!idCiclo) { setError("No hay ciclo activo"); return }
    setError(null)
    try {
      const res = await guardarSintomas({
        id_ciclo: idCiclo,
        fecha:    fechaISO,
        sintomas: sintomasSeleccionados.map(s => s.id),
      })
      if (!res.success) throw new Error(res.error || "Error al guardar sintomas")
      const resSintomas = await obtenerSintomas()
      if (resSintomas.success) setSintomas(resSintomas.sintomas)
    } catch (e) {
      setError(e.message)
      throw e
    }
  }, [idCiclo])

  /* ─── Borrar síntoma ────────────────────────────────────── */
  const borrarSintoma = useCallback(async ({ id_registro }) => {
    setError(null)
    try {
      const res = await eliminarSintoma({ id_registro })
      if (!res.success) throw new Error(res.error || "Error al borrar sintoma")
      setSintomas(prev =>
        prev.filter(e => e.extendedProps?.id_registro !== id_registro)
      )
    } catch (e) {
      setError(e.message)
      throw e
    }
  }, [])

  /* ─── Reiniciar ─────────────────────────────────────────── */
  const reiniciarTodo = useCallback(async () => {
    setError(null)

    // Limpiar estado local de inmediato
    setInicioCiclo(null)
    setIdCiclo(null)
    setSintomas([])

    try {
      const res = await reiniciarCiclo() // ya pasa el regular del localStorage al PHP
      if (!res.success) throw new Error(res.error || "Error al reiniciar")

      // Restaurar estado basado en el localStorage (nunca se borra)
      const prefLocal    = leerPrefLocal()
      const esRegular    = prefLocal.regular === "regular"

      setMonitoreo({
        enMonitoreo:      !esRegular,
        duracionPromedio: prefLocal.duracion_ciclo ?? 28,
        esRegular:        esRegular,
        totalCiclos:      0,
        ciclosNecesarios: 3,
        mostrarAlerta:    false,
      })
    } catch (e) {
      setError(e.message)
      // No re-lanzar — el estado ya fue limpiado, el modal puede cerrarse
    }
  }, [])

  return {
    inicioCiclo, idCiclo, sintomas, eventos, prediccion,
    cargando, error, monitoreo,
    marcarInicioCiclo, cerrarAlertaMonitoreo,
    agregarSintomasDia, borrarSintoma, reiniciarTodo,
    configuracion: CONFIGURACION_CICLO,
    colores: COLORES_CICLO,
  }
}