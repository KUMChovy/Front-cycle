import { useMemo, useState } from "react";
import { sesion } from "../../componentes/funciones/sesion";

export default function AdminDashboardSvg() {
   sesion();
  //metricas de la grafica donde puedes modificar la  grafica
  const [metrics, setMetrics] = useState({
    totalUsers: 1240, // TODO: set desde backend
    premium: 122,     // TODO: set desde backend
  });

  // Derivadas
  const nonPremium = useMemo(
    () => Math.max((metrics.totalUsers ?? 0) - (metrics.premium ?? 0), 0),
    [metrics]
  );

  // =========================
  // DONUT SVG (sin dependencias)
  // =========================
  const radius = 70;
  const stroke = 18;
  const circumference = 2 * Math.PI * radius;

  const premiumPct = useMemo(
    () => (metrics.totalUsers ? metrics.premium / metrics.totalUsers : 0),
    [metrics]
  );

  const premiumStroke = premiumPct * circumference;
  const nonPremiumStroke = circumference - premiumStroke;

  // =========================
  // ESTADO: CLÍNICAS ASOCIADAS (Preparado para API)
  // =========================
  // TODO: Reemplazar con fetch a /api/clinicas (con filtros y paginación)
  const [clinicas, setClinicas] = useState([
    {
      id: "CLI-001",
      nombre: "Clínica Armonía",
      ciudad: "CDMX",
      suscripcionesReferidas: 58, // TODO: desde backend
    },
    {
      id: "CLI-002",
      nombre: "Salud & Vida",
      ciudad: "Guadalajara",
      suscripcionesReferidas: 21,
    },
    {
      id: "CLI-003",
      nombre: "Bienestar Integral",
      ciudad: "Monterrey",
      suscripcionesReferidas: 73,
    },
  ]);

  // Filtros UI locales (preparados para funcionalidad real)
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("Todas"); // Todas | Activa | Pausada | Pendiente
  const filteredClinicas = useMemo(() => {
    const matchesText = (c) =>
      !search ||
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.ciudad.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());

    const matchesEstado =
      estadoFilter === "Todas" ? true : c.estado === estadoFilter;

    return clinicas.filter((c) => matchesText(c) && matchesEstado);
  }, [clinicas, search, estadoFilter]);

  return (
    <div className="min-h-screen w-full bg-[#FCE7F3]">
      {/* ===== Background decorativo (opcional) ===== */}
      <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
      <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
      <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />

      {/* ===== CONTENIDO (PC) con SCROLL ===== */}
      <div className="relative z-[1] isolate flex flex-col gap-6 px-8 py-6 overflow-hidden">
<header
  className="
    sticky top-0 z-10
    -mx-8 px-8 py-4
    backdrop-blur supports-[backdrop-filter]:backdrop-blur
  "
>
  <div className="flex items-center justify-between">
    {/* Marca + título */}
    <div className="flex flex-col">
      <h1
        className="
          text-[30px] leading-tight
          font-extrabold tracking-tight
          text-[#0A1128]
        "
      >
        Panel de administración
      </h1>

      {/* Subtítulo */}
      <p className="mt-0.5 text-[13px] text-[#0f172a]/60">
        Suscriptores Premium y usuarios totales
      </p>
    </div>

    {/* Acciones del nav (solo UI) */}
    <nav className="flex items-center gap-3">
      {/* Botón de cerrar sesión (solo vista) */}
      <button
        type="button"
        className="
          inline-flex items-center
          rounded-full px-4 py-1.5
          text-[13px] font-semibold
          text-rose-900
          bg-white/70
          ring-1 ring-pink-200/60
          shadow-[0_4px_10px_rgba(244,114,182,0.18)]
          transition
          hover:bg-white
          hover:shadow-[0_6px_14px_rgba(244,114,182,0.25)]
        "
        aria-label="Cerrar sesión"
        title="Cerrar sesión"
      >
        Cerrar sesión
      </button>
    </nav>
  </div>
</header>


        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KpiCard title="Usuarios totales" value={metrics.totalUsers.toLocaleString()} />
          <KpiCard title="Premium" value={metrics.premium.toLocaleString()} />
          <KpiCard title="No premium" value={nonPremium.toLocaleString()} />
        </section>

        {/* Gráfica + tabla simple */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut SVG */}
          <div className="rounded-2xl bg-white/70 ring-1 ring-pink-200/70 shadow-[0_10px_24px_rgba(251,113,133,0.20)] p-4">
            <h2 className="text-lg font-bold text-[#0f172a] mb-3">
              Distribución de suscripciones
            </h2>

            <div className="flex items-center gap-6">
              <svg width="220" height="220" viewBox="0 0 200 200" role="img" aria-label="Donut de suscripciones">
                <g transform="rotate(-90 100 100)">
                  {/* (1) FONDO — No premium */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="#FBCFE8"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                  />
                  {/* (2) PREMIUM — Ajusta color/animación si quieres */}
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="transparent"
                    stroke="#F472B6"
                    strokeWidth={stroke}
                    strokeDasharray={`${premiumStroke} ${circumference}`}
                    strokeDashoffset={0}
                    strokeLinecap="round"
                  />
                </g>
                {/* (3) Etiquetas centrales */}
                <text x="100" y="90" textAnchor="middle" fontSize="14" fill="#0f172a" fontWeight="600">
                  Premium
                </text>
                <text x="100" y="112" textAnchor="middle" fontSize="20" fill="#0A1128" fontWeight="800">
                  {(premiumPct * 100).toFixed(1)}%
                </text>
              </svg>

              <div className="text-sm text-[#0f172a]">
                <LegendItem color="#F472B6" label="Premium" value={metrics.premium} />
                <LegendItem color="#FBCFE8" label="No premium" value={nonPremium} />
                <div className="mt-2 text-[#0f172a]/70">
                  Total:{" "}
                  <span className="font-semibold text-[#0f172a]">
                    {metrics.totalUsers.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla simple resumen */}
          <div className="rounded-2xl bg-white/70 ring-1 ring-pink-200/70 shadow-[0_10px_24px_rgba(251,113,133,0.20)] p-4">
            <h2 className="text-lg font-bold text-[#0f172a] mb-3">Resumen</h2>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[#0f172a]/60">
                  <th className="py-2">Tipo</th>
                  <th className="py-2">Conteo</th>
                  <th className="py-2">Porcentaje</th>
                </tr>
              </thead>
              <tbody className="text-[#0f172a]">
                <tr className="border-t border-pink-200/40">
                  <td className="py-2">Premium</td>
                  <td className="py-2">{metrics.premium.toLocaleString()}</td>
                  <td className="py-2">
                    {((metrics.premium / (metrics.totalUsers || 1)) * 100).toFixed(1)}%
                  </td>
                </tr>
                <tr className="border-t border-pink-200/40">
                  <td className="py-2">No premium</td>
                  <td className="py-2">{nonPremium.toLocaleString()}</td>
                  <td className="py-2">
                    {((nonPremium / (metrics.totalUsers || 1)) * 100).toFixed(1)}%
                  </td>
                </tr>
                <tr className="border-t border-pink-200/40 font-semibold">
                  <td className="py-2">Total</td>
                  <td className="py-2">{metrics.totalUsers.toLocaleString()}</td>
                  <td className="py-2">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =======================================================
           SECCIÓN: CLÍNICAS ASOCIADAS (debajo de la distribución)
           ======================================================= */}
        <section className="rounded-2xl bg-white/70 ring-1 ring-pink-200/70 shadow-[0_10px_24px_rgba(251,113,133,0.20)] p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-[#0f172a]">Clínicas asociadas</h2>

            {/* Controles (Preparados para funcionalidad) */}
            <div className="flex items-center gap-2">
            </div>
          </div>

          {/* Tabla de clínicas */}

<div className="mt-4 overflow-x-auto">
  <table className="w-full text-left text-sm">
    <thead>
      <tr className="text-[#0f172a]/60">
        <th className="py-2">Nombre</th>
        <th className="py-2">Dirección</th>
        <th className="py-2">Teléfono</th>
      </tr>
    </thead>
    <tbody className="text-[#0f172a]">
      {filteredClinicas.map((c) => (
        <tr key={c.id} className="border-t border-pink-200/40">
          <td className="py-2 font-medium">{c.nombre}</td>
          <td className="py-2">{c.direccion}</td>
          <td className="py-2">
            {/* Si quieres que sea clickeable para llamada en móvil */}
            <a
              href={`tel:${(c.telefono || "").replace(/\s+/g, "")}`}
              className="text-rose-900 hover:underline"
            >
              {c.telefono}
            </a>
          </td>
          <td className="py-2">
            {/* Botonera opcional, deja preparada la funcionalidad */}
            <div className="flex items-center gap-2">
              
            </div>
          </td>
        </tr>
      ))}


                {filteredClinicas.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-[#0f172a]/60">
                      No hay clínicas que coincidan con los filtros actuales.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* TODO: Paginación (si hay muchas clínicas) */}
          <div className="mt-4 flex items-center justify-end gap-2 text-sm">
            <button
              type="button"
              className="rounded-full px-3 py-1 bg-white/80 ring-1 ring-pink-200/60 hover:bg-white transition"
              // onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Anterior
            </button>
            <span className="text-[#0f172a]/70">Página 1 de 1</span>
            <button
              type="button"
              className="rounded-full px-3 py-1 bg-white/80 ring-1 ring-pink-200/60 hover:bg-white transition"
              // onClick={() => setPage((p) => p + 1)}
            >
              Siguiente
            </button>
          </div>
        </section>

        <div className="h-10" />
      </div>
    </div>
  );
}

/* =========================
   SUBCOMPONENTES DE UI
   ========================= */

function KpiCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/70 ring-1 ring-pink-200/70 shadow-[0_10px_24px_rgba(251,113,133,0.20)] p-4">
      <p className="text-xs text-[#0f172a]/60">{title}</p>
      <p className="mt-1 text-3xl font-extrabold text-[#0A1128]">{value}</p>
    </div>
  );
}

function LegendItem({ color, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-block h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <span className="text-[#0f172a]/80">{label}</span>
      <span className="text-[#0f172a] font-semibold">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

function EstadoBadge({ estado }) {
  // Paleta simple por estado
  const styles = {
    Activa: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    Pausada: "bg-amber-100 text-amber-800 ring-amber-200",
    Pendiente: "bg-slate-100 text-slate-800 ring-slate-200",
  }[estado] || "bg-slate-100 text-slate-800 ring-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ring-1 ${styles}`}
    >
      {estado}
    </span>
  );
}
