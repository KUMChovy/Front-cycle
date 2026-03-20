export function IconoSintoma({ tipo, className, color }) {

    const colorFinal = color || obtenerColorPorTipo(tipo)

    const clases = `${className || "w-6 h-6"} ${colorFinal}`

    switch (tipo) {

    case "ligero":
    return (
        <svg className={clases} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c4.41 0 8-3.59 8-8 0-7.49-7.2-11.69-7.5-11.87a.98.98 0 0 0-.99 0C11.2 2.3 4.01 6.5 4.01 14c0 4.41 3.59 8 8 8Zm0-17.81c1.52 1.03 6 4.52 6 9.81 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-5.28 4.48-8.78 6-9.81"></path>
        </svg>
    )

case "moderado":
    return (
        <svg className={clases} viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 22c4.41 0 8-3.59 8-8 0-7.49-7.2-11.69-7.5-11.87a.98.98 0 0 0-.99 0C11.2 2.3 4.01 6.5 4.01 14c0 4.41 3.59 8 8 8Zm0-17.81c1.52 1.03 6 4.52 6 9.81 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-5.28 4.48-8.78 6-9.81"></path>
         </svg>
    )

case "fuerte":
    return (
        <svg className={clases} viewBox="0 0 24 24" fill="currentColor">
           <path d="M12 22c4.41 0 8-3.59 8-8 0-7.49-7.2-11.69-7.5-11.87a.98.98 0 0 0-.99 0C11.2 2.3 4.01 6.5 4.01 14c0 4.41 3.59 8 8 8Zm0-17.81c1.52 1.03 6 4.52 6 9.81 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-5.28 4.48-8.78 6-9.81"></path>
        </svg>
    )

case "intenso":
    return (
        <svg className={clases} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c4.41 0 8-3.59 8-8 0-7.49-7.2-11.69-7.5-11.87a.98.98 0 0 0-.99 0C11.2 2.3 4.01 6.5 4.01 14c0 4.41 3.59 8 8 8Zm0-17.81c1.52 1.03 6 4.52 6 9.81 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-5.28 4.48-8.78 6-9.81"></path>
        </svg>
        
    )

        case "bien":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <path d="M8.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"/>
            <path d="M15.5 9c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 9 15.5 9"/>
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"/>
            <path d="M14.83 14.83a3.94 3.94 0 0 1-2.02 1.09 4.05 4.05 0 0 1-2.37-.23 3.9 3.9 0 0 1-1.27-.86c-.18-.18-.34-.38-.49-.59l-1.66 1.12c.22.32.46.62.73.88.27.27.57.52.89.73s.66.4 1.02.55.74.27 1.13.35a6.1 6.1 0 0 0 2.42 0c.38-.08.76-.2 1.13-.35.36-.15.7-.34 1.02-.55s.62-.46.89-.73.52-.57.73-.89l-1.66-1.12c-.14.21-.31.41-.49.59Z"/>
        </svg>
    )

case "animo":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor" >
            <path d="M12 18c4 0 5-4 5-4H7s1 4 5 4"></path>
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
            <path d="M8 10c.55 0 1 .45 1 1h2c0-1.65-1.35-3-3-3s-3 1.35-3 3h2c0-.55.45-1 1-1m5 1h2c0-.55.45-1 1-1s1 .45 1 1h2c0-1.65-1.35-3-3-3s-3 1.35-3 3"></path>
        </svg>
    )

       case "triste":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <path d="M8.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3"/>
            <path d="M15.5 9c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 9 15.5 9"/>
            <path d="M12 14c-3 0-4-3-4-3h8s-1 3-4 3" transform="rotate(180 12 14)"/>
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"/>
        </svg>
    )
        case "rabia":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <path d="M12 14c-3 0-4 3-4 3h8s-1-3-4-3"></path>
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
            <path d="m12.63 10.07.74 1.86 1.68-.67c.12.42.49.74.95.74.55 0 1-.45 1-1 0-.17-.06-.33-.13-.47l1.5-.6-.74-1.86zm-3.68 1.19 1.68.67.74-1.86-5-2-.74 1.86 1.5.6c-.08.14-.13.3-.13.47 0 .55.45 1 1 1 .46 0 .83-.32.95-.74"></path>
        </svg>
    )

        case "colicos":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <path d="M22 11.96c-.02-.39-.26-.74-.63-.89L17.44 9.5l3.43-6a1 1 0 0 0-.16-1.2 1 1 0 0 0-1.2-.16l-6.34 3.62L9.71 2.3c-.29-.29-.72-.37-1.09-.22S8 2.6 8 3v3.82l-4.84-.81a.99.99 0 0 0-1.05.53c-.2.39-.13.86.18 1.17l4.4 4.4-4.51 6.31a.99.99 0 0 0 .04 1.21c.28.35.76.47 1.17.29l5.87-2.51.76 3.79c.08.41.4.72.81.79.06 0 .11.01.17.01.35 0 .67-.18.86-.49l2.5-4.16 6.15 3.51a1.005 1.005 0 0 0 1.33-1.43l-3.37-5.06 2.99-1.49a1 1 0 0 0 .55-.94Zm-5.45 1.15c-.26.13-.45.36-.52.64s-.02.57.13.81l1.65 2.48-3.32-1.9a1 1 0 0 0-1.35.35l-1.67 2.78-.49-2.46c-.06-.29-.25-.55-.52-.69a1 1 0 0 0-.86-.04l-3.71 1.59 2.92-4.09c.28-.4.24-.94-.11-1.29L5.91 8.5l2.92.49c.29.05.59-.03.81-.22s.35-.47.35-.76V5.42l2.29 2.29c.32.32.81.39 1.2.16l3.82-2.18-2.18 3.82c-.14.25-.17.55-.08.83s.3.49.57.6l2.93 1.17-2.01 1Z"/>
        </svg>
    )
        case "cabeza":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <path d="M12 14c-3 0-4 3-4 3h8s-1-3-4-3"/>
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"/>
            <path d="m16.95 7.17-3 2c-.28.19-.45.5-.45.83s.17.65.45.83l3 2 1.11-1.66L16.31 10l1.75-1.17zM10.5 10c0-.33-.17-.65-.45-.83l-3-2-1.11 1.66L7.69 10l-1.75 1.17 1.11 1.66 3-2c.28-.19.45-.5.45-.83"/>
        </svg>
    )

       case "migraña":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"/>
            <path d="M17.29 8.29 16 9.59l-1.29-1.3-1.42 1.42 1.3 1.29-1.3 1.29 1.42 1.42 1.29-1.3 1.29 1.3 1.42-1.42-1.3-1.29 1.3-1.29zm-6.58 4L9.41 11l1.3-1.29-1.42-1.42L8 9.59l-1.29-1.3-1.42 1.42L6.59 11l-1.3 1.29 1.42 1.42L8 12.41l1.29 1.3zM10 16h4v2h-4z"/>
        </svg>
    )
    
    case "sin":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <path d="M8.5 9a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3m7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 9 15.5 9"/>
            <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"/>
        </svg>
    )

        case "dulce":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <ellipse cx="12" cy="12" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M6 10 L2 6 L2 18 L6 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M18 10 L22 6 L22 18 L18 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
    )

           
        case "salado":
    return (
        <svg
            className={clases} viewBox="0 0 24 24" fill="none" stroke="currentColor"strokeWidth="1.5"strokeLinecap="round"strokeLinejoin="round">
            <path d="M7 8V18C7 19.1046 7.89543 20 9 20H15C16.1046 20 17 19.1046 17 18V8" />
            <path d="M17 8C17 6.89543 16.1046 6 15 6H9C7.89543 6 7 6.89543 7 8" fill="none" />
            <path d="M7 8H17" />
            <circle cx="9.5" cy="7" r="0.5" fill="currentColor" stroke="none"/>
            <circle cx="12" cy="7" r="0.5" fill="currentColor" stroke="none"/>
            <circle cx="14.5" cy="7" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
    )

      case "picante":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="none"stroke="currentColor" strokeWidth="2" strokeLinecap="round"strokeLinejoin="round">
            <path d="M12.7 5.5c2-1 4-1 4 .5S15.5 10 11.5 14c-2 2-4 3-5 3s-2.5-1.5-2-3 2-4 4-6.5C10 5.5 11 6.5 12.7 5.5z" />
            <path d="M12.7 5.5c0-1.5-.7-3-2.2-4" />
        </svg>
    )

        case "graso":
    return (
        <svg
            className={clases}viewBox="0 0 24 24"fill="currentColor">
            <path 
                d="M18.76 5.24A3.5 3.5 0 0 0 15.5 3c-.31 0-.63.04-.93.13a3.487 3.487 0 0 0-5.14 0C9.12 3.04 8.81 3 8.5 3c-1.47 0-2.75.91-3.26 2.24a3.498 3.498 0 0 0-1.22 5.73c0 .08-.02.15 0 .22l2 10c.09.47.5.8.98.8h10c.48 0 .89-.34.98-.8l2-10c.02-.08 0-.15 0-.22.63-.63 1.02-1.51 1.02-2.47 0-1.47-.91-2.75-2.24-3.26M6.23 7.03a.99.99 0 0 0 .8-.8c.18-.97 1.33-1.55 2.24-1 .24.14.52.18.79.11.27-.08.49-.26.62-.5a1.486 1.486 0 0 1 2.66 0c.13.25.35.43.62.5.27.08.55.04.79-.11.91-.54 2.06.03 2.24 1 .07.41.39.73.8.8a1.498 1.498 0 0 1-.27 2.97H6.5a1.498 1.498 0 0 1-.27-2.97M13.4 12l-.8 8h-1.19l-.8-8zm-7.18 0H8.6l.8 8H7.82zm9.96 8H14.6l.8-8h2.38z"
            />
        </svg>
    )


        default:
            return null
    }

}

/* 🎨 COLORES POR DEFECTO */
function obtenerColorPorTipo(tipo) {

    if (["ligero"].includes(tipo)) {
        return "text-[#FF0000]"
    }
    
    if (["moderado"].includes(tipo)) {
        return "text-[#C90202]"
    }

    if (["fuerte"].includes(tipo)) {
        return "text-[#A30000]"
    }

    if (["intenso"].includes(tipo)) {
        return "text-[#700707]"
    }

    if (["bien"].includes(tipo)) {
        return "text-[#757500]"
    }

     if (["animo"].includes(tipo)) {
        return "text-[#C4C400]"
    }

    if (["triste"].includes(tipo)) {
       return "text-[#305CFD]"
    }

    if (["rabia"].includes(tipo)) {
       return "text-[#C40000]"
    }


    if (["colicos"].includes(tipo)) {
        return "text-[#FF7700]"
    }

    if (["cabeza"].includes(tipo)) {
        return "text-[#000000]"
    }

    if (["migraña"].includes(tipo)) {
        return "text-[#663E00]"
    }

     if (["sin"].includes(tipo)) {
       return "text-[#8A8888]"
    }


    if (["dulce"].includes(tipo)) {
        return "text-[#FF03BC]"
    }

    if (["salado"].includes(tipo)) {
        return "text-[#000000]"
    }

    if (["picante"].includes(tipo)) {
        return "text-[#058700]"
    }

    if (["graso"].includes(tipo)) {
        return "text-[#8A7148]"
    }

    return "text-pink-500"
}