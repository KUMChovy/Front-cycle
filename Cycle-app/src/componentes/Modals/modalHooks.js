import { useEffect } from "react"

/**
 * Cierra el modal al presionar Escape.
 */
export function usarTeclaEscape(alPresionarEscape, habilitado = true) {
  useEffect(() => {
    if (!habilitado) return

    const alPresionarTecla = (e) => {
      if (e.key === "Escape") alPresionarEscape?.(e)
    }

    window.addEventListener("keydown", alPresionarTecla)
    return () => window.removeEventListener("keydown", alPresionarTecla)
  }, [alPresionarEscape, habilitado])
}

/**
 * Evita que el body haga scroll cuando el modal está abierto.
 */
export function bloquearScrollBody(habilitado = true) {
  useEffect(() => {
    if (!habilitado) return

    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = original
    }
  }, [habilitado])
}
``