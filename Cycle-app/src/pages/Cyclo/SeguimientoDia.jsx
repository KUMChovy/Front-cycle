import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import esLocale from "@fullcalendar/core/locales/es"
import { usarSeguimientoCiclo } from "../../componentes/Calendario/useCalendario"
import { SECCIONES_SINTOMAS, obtenerIcono } from "../../componentes/Calendario/ConfigSintomas"

export default function SeguimientoDia() {

const { state } = useLocation()
const navigate = useNavigate()
const { agregarSintoma } = usarSeguimientoCiclo()

const fechaISO = state?.fechaISO

const [seleccionados, setSeleccionados] = useState([])

const toggle = (op) => {
setSeleccionados(prev =>
prev.some(i => i.id === op.id)
? prev.filter(i => i.id !== op.id)
: [...prev, op]
)
}

const guardar = () => {
seleccionados.forEach(s => {
agregarSintoma({
titulo: s.etiqueta,
fechaISO,
icono: s.id
})
})
navigate("/ciclo")
}

return (

<div className="fixed inset-0 w-screen h-screen overflow-y-auto bg-gradient-to-b from-[#FCE7F3] to-[#FBCFE8]">

{/* fondo */}
<div className="absolute -top-28 left-0 w-full h-[300px] bg-[#F9A8D4]/60 rounded-b-[120px]" />

<div className="relative z-10 px-5 pt-6 pb-12">

{/* HEADER */}
<div className="flex items-center justify-between mb-6">

<button onClick={() => navigate("/ciclo")} className="text-xl font-bold">
←
</button>

<div className="bg-gradient-to-r from-pink-200 to-pink-100 px-6 py-2 rounded-full text-sm font-bold shadow">
Mes
</div>

<div className="w-6" />

</div>

{/* CALENDARIO */}
<div className="bg-white rounded-3xl p-3 mb-6 shadow">

<FullCalendar
plugins={[dayGridPlugin]}
initialView="dayGridWeek"
locale={esLocale}
headerToolbar={false}
height="auto"
events={[]}
contentHeight={80}

dayCellClassNames={(arg) => {
const hoy = new Date().toISOString().split("T")[0]
return arg.dateStr === hoy
? ["bg-pink-200 rounded-full flex items-center justify-center"]
: []
}}

dayCellContent={(arg) => (
<div className="text-sm font-bold">
{arg.dayNumberText.replace(" ", "")}
</div>
)}
/>

</div>


{/* SECCIONES */}
{SECCIONES_SINTOMAS.map(sec => (

<div key={sec.titulo} className="mb-7">

<h3 className="text-lg font-extrabold mb-3 text-gray-800">
{sec.titulo}
</h3>

<div className="grid grid-cols-4 gap-3">

{sec.opciones.map(op => {

const activo = seleccionados.some(i => i.id === op.id)

return (

<button
key={op.id}
onClick={() => toggle(op)}
className={`
h-[90px] rounded-2xl border flex flex-col items-center justify-center
transition-all duration-200 shadow-sm

${activo
? "bg-gradient-to-br from-pink-300 to-pink-200 border-pink-400 scale-105 shadow-md"
: "bg-gradient-to-br from-white to-pink-50 border-pink-200"
}
`}
>

{/* ICONO GRANDE */}
<div className="scale-150 mb-2">
{obtenerIcono(op.id)}
</div>

{/* TEXTO */}
<span className="text-xs font-bold text-center px-1">
{op.etiqueta}
</span>

</button>

)

})}

</div>

</div>

))}

{/* GUARDAR */}
<button
onClick={guardar}
className="w-full mt-4 rounded-2xl bg-gradient-to-r from-pink-400 to-pink-300 py-3 text-base font-extrabold text-white shadow-lg active:scale-95"
>
Guardar
</button>

</div>

</div>

)
}