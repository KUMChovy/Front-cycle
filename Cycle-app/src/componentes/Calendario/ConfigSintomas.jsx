import { IconoSintoma } from "./IconosSintomas";

export const SECCIONES_SINTOMAS = [
  {
    titulo: "Periodo",
    opciones: [
      { id: "ligero", etiqueta: "Ligero" },
      { id: "moderado", etiqueta: "Moderado" },
      { id: "fuerte", etiqueta: "Fuerte" },
      { id: "intenso", etiqueta: "Intenso" }
    ]
  },
  {
    titulo: "Sentimientos",
    opciones: [
      { id: "bien", etiqueta: "Bien" },
      { id: "triste", etiqueta: "Triste" },
      { id: "rabia", etiqueta: "Rabia" },
      { id: "animo", etiqueta: "Ánimo" }
    ]
  },
  {
    titulo: "Dolor",
    opciones: [
      { id: "colicos", etiqueta: "Cólicos" },
      { id: "cabeza", etiqueta: "Cabeza" },
      { id: "migraña", etiqueta: "Migraña" },
      { id: "sin", etiqueta: "Sin dolor" }
    ]
  },
  {
    titulo: "Antojos",
    opciones: [
      { id: "dulce", etiqueta: "Dulce" },
      { id: "salado", etiqueta: "Salado" },
      { id: "picante", etiqueta: "Picante" },
      { id: "graso", etiqueta: "Graso" }
    ]
  }
];

/**
 * Devuelve el icono ya listo para renderizar
 */
export function obtenerIcono(tipo) {
  return <IconoSintoma tipo={tipo} />;
}