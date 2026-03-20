import { useEffect, useState } from "react"

export default function ModalMonitoreo({ totalCiclos = 1, tipo = "bienvenida", esRegular = false, onCerrar }) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => setVisible(true), 10)
    }, [])

    const cerrar = () => {
        setVisible(false)
        setTimeout(onCerrar, 300)
    }

    const esBienvenida = tipo === "bienvenida"

    return (
        <div
            onClick={(e) => e.target === e.currentTarget && cerrar()}
            style={{
                position: "fixed", inset: 0, zIndex: 9999,
                background: "rgba(0,0,0,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "16px",
                transition: "opacity .3s",
                opacity: visible ? 1 : 0,
            }}
        >
            <div
                style={{
                    background: "#fff",
                    borderRadius: "24px",
                    width: "100%",
                    maxWidth: "360px",
                    overflow: "hidden",
                    border: "0.5px solid #F9A8D4",
                    transition: "transform .35s cubic-bezier(.22,1,.36,1), opacity .3s",
                    transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(12px)",
                    opacity: visible ? 1 : 0,
                }}
            >
                {/* ── Header rosa ── */}
                <div style={{
                    background: "#FCE7F3",
                    padding: "28px 24px 20px",
                    textAlign: "center",
                }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: "#fff", border: "2px solid #F9A8D4",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 12px",
                        fontSize: 32,
                    }}>
                        {esBienvenida ? "🌸" : "📅"}
                    </div>

                    <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 600, color: "#831843" }}>
                        {esBienvenida
                            ? esRegular
                                ? "¡Bienvenida! 🌸"
                                : "¡Ciclo registrado!"
                            : "Registra tu nuevo ciclo"
                        }
                    </h2>

                    <p style={{ margin: 0, fontSize: 13, color: "#9D174D" }}>
                        {esBienvenida
                            ? esRegular
                                ? "Tu ciclo de 28 días está activo"
                                : "Hemos iniciado tu seguimiento"
                            : "Tu ciclo del mes pasado ya venció"
                        }
                    </p>
                </div>

                {/* ── Body ── */}
                <div style={{ padding: "20px 24px" }}>

                    {/* Badge */}
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            background: "#FCE7F3", border: "1px solid #F9A8D4",
                            borderRadius: 99, padding: "3px 12px",
                            fontSize: 12, color: "#9D174D", fontWeight: 500,
                        }}>
                            <span style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: "#F9A8D4", display: "inline-block", flexShrink: 0,
                            }} />
                            {esBienvenida
                                ? esRegular
                                    ? "Ciclo regular · 28 días"
                                    : "Modo monitoreo activo"
                                : "Ciclo irregular · requiere registro"
                            }
                        </span>
                    </div>

                    {/* ── REGULAR: mensaje simple ── */}
                    {esBienvenida && esRegular && (
                        <>
                            <div style={{
                                background: "#FDF2F8", borderRadius: 12,
                                padding: "14px 16px", marginBottom: 16,
                                fontSize: 13, color: "#831843", lineHeight: 1.7,
                            }}>
                                Tu calendario ya está listo con predicciones basadas en
                                un ciclo regular de <strong>28 días</strong>. Puedes registrar
                                síntomas tocando cualquier día del calendario.
                            </div>

                            <div style={{
                                display: "flex", flexDirection: "column", gap: 8,
                                marginBottom: 16,
                            }}>
                                {[
                                    { icon: "🗓️", texto: "Predicciones de tu próximo período" },
                                    { icon: "💧", texto: "Días fértiles y ovulación marcados" },
                                    { icon: "🩹", texto: "Registro de síntomas por día" },
                                ].map((item, i) => (
                                    <div key={i} style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        background: "#FDF2F8", borderRadius: 10, padding: "10px 12px",
                                    }}>
                                        <span style={{ fontSize: 18 }}>{item.icon}</span>
                                        <span style={{ fontSize: 13, color: "#831843", fontWeight: 500 }}>
                                            {item.texto}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ── IRREGULAR bienvenida: pasos de monitoreo ── */}
                    {esBienvenida && !esRegular && (
                        <>
                            <div style={{
                                background: "#FDF2F8", borderRadius: 12,
                                padding: "12px 14px", marginBottom: 16,
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                    <span style={{ fontSize: 12, color: "#9D174D", fontWeight: 500 }}>
                                        Ciclos registrados
                                    </span>
                                    <span style={{ fontSize: 12, color: "#831843", fontWeight: 600 }}>
                                        {totalCiclos} / 3
                                    </span>
                                </div>
                                <div style={{ height: 6, borderRadius: 99, background: "#FCE7F3", overflow: "hidden" }}>
                                    <div style={{
                                        height: "100%", borderRadius: 99,
                                        background: "#E6A9B7",
                                        width: `${Math.min((totalCiclos / 3) * 100, 100)}%`,
                                        transition: "width .6s ease",
                                    }} />
                                </div>
                            </div>

                            <div style={{ marginBottom: 16 }}>
                                {[
                                    { n: 1, titulo: "Primer ciclo registrado", sub: "Comenzamos a aprender tu patrón" },
                                    { n: 2, titulo: "Segundo ciclo", sub: "Comparamos duraciones" },
                                    { n: 3, titulo: "Predicciones personalizadas", sub: "Tu ciclo, tus datos reales" },
                                ].map((paso, i) => {
                                    const done = totalCiclos >= paso.n
                                    return (
                                        <div key={paso.n} style={{
                                            display: "flex", alignItems: "center", gap: 10,
                                            padding: "8px 0",
                                            borderBottom: i < 2 ? "0.5px solid #F9A8D4" : "none",
                                            opacity: done ? 1 : 0.45,
                                        }}>
                                            <div style={{
                                                width: 28, height: 28, borderRadius: "50%",
                                                background: "#FCE7F3", border: "1.5px solid #F9A8D4",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                flexShrink: 0, fontSize: 13, fontWeight: 500, color: "#9D174D",
                                            }}>
                                                {done ? "✓" : paso.n}
                                            </div>
                                            <div>
                                                <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#1f2937" }}>
                                                    {paso.titulo}
                                                </p>
                                                <p style={{ margin: 0, fontSize: 11, color: "#9ca3af" }}>
                                                    {paso.sub}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    )}

                    {/* ── RECORDATORIO MENSUAL irregular ── */}
                    {!esBienvenida && (
                        <div style={{
                            background: "#FDF2F8", borderRadius: 12,
                            padding: "14px 16px", marginBottom: 16,
                            fontSize: 13, color: "#831843", lineHeight: 1.7,
                        }}>
                            Para que tus predicciones sigan siendo precisas, toca{" "}
                            <strong>cualquier día</strong> en el calendario para marcar
                            el inicio de tu nuevo ciclo.
                        </div>
                    )}

                    {/* Botón */}
                    <button
                        onClick={cerrar}
                        style={{
                            width: "100%", padding: "12px",
                            borderRadius: 14, background: "#E6A9B7",
                            border: "none", color: "#fff",
                            fontSize: 15, fontWeight: 600,
                            cursor: "pointer", letterSpacing: ".01em",
                            transition: "transform .15s",
                        }}
                        onMouseDown={e => e.currentTarget.style.transform = "scale(.97)"}
                        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                    >
                        {esBienvenida ? "¡Vamos! 🌸" : "Registrar ahora"}
                    </button>

                </div>
            </div>
        </div>
    )
}