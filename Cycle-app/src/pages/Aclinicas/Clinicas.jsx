import { useEffect, useState, useRef } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

export default function Example() {
    const [clinics, setClinics] = useState([]);
    const [selectedClinic, setSelectedClinic] = useState(null);
    const mapRef = useRef(null);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAN4zGHdKRYfM8r5WZEjCriFKnpTnFHTcw"
    });

    useEffect(() => {

        fetch("http://localhost/cycle_back/modelo/c_clinicas.php")
            .then(res => res.json())
            .then(data => setClinics(data))
    }, [])

    return (
        <div className="fixed inset-0 overflow-auto bg-[#FCE7F3]">
            {/* ===== Background blobs (igual que Login) ===== */}
            <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
            <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
            <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />
            <div className="pointer-events-none absolute bottom-14 right-10 hidden h-[380px] w-[380px] rounded-full border border-white/45 lg:block" />
            <div className="pointer-events-none absolute bottom-5 right-28 hidden h-[260px] w-[260px] rounded-full border border-white/35 lg:block" />

            {/* ===== Content ===== */}
            <div
                className="
          relative mx-auto flex min-h-full w-full max-w-md flex-col
          px-4 sm:px-6
          pt-[calc(env(safe-area-inset-top)+16px)]
          pb-[calc(env(safe-area-inset-bottom)+16px)]
        "
            >
                {/* titulo */}
                <header className="relative w-full overflow-hidden ">
                    <div className="relative flex h-[180px] items-center justify-center md:h-[220px] lg:h-[260px]">
                        {/* Contenido */}
                        <div className="relative z-[1] flex flex-col items-center text-center px-4">
                            <h1 className="font-extrabold tracking-tight text-rose-900 text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-[1.05]">
                                Clínicas Cercanas
                            </h1>
                            <p className="mt-3 font-medium text-rose-900/75 text-[12px] sm:text-sm md:text-base lg:text-lg">
                                Se encontraron {clinics.length} lugares cerca de ti.
                            </p>
                        </div>
                    </div>
                </header>

                {/* seccion de google maps */}

                <section className="py-1 sm:py-1">
                    <div className="h-[400px] w-full">

                        {isLoaded && (
                            <GoogleMap
                                zoom={13}
                                center={{ lat: 19.4326, lng: -99.1332 }}
                                mapContainerStyle={{ width: "100%", height: "100%" }}
                                onLoad={(map) => (mapRef.current = map)}
                            >
                                {clinics.map((c) => (
                                    <Marker
                                        key={c.id_clinica}
                                        position={{
                                            lat: parseFloat(c.latitud),
                                            lng: parseFloat(c.longitud)
                                        }}
                                         onClick={() => setSelectedClinic(c)}
                                    />

                                ))}
                                {selectedClinic && (
                                    <InfoWindow
                                        position={{
                                            lat: parseFloat(selectedClinic.latitud),
                                            lng: parseFloat(selectedClinic.longitud)
                                        }}
                                        onCloseClick={() => setSelectedClinic(null)}
                                    >
                                        <div>
                                            <h3>{selectedClinic.nombre}</h3>
                                            <p>{selectedClinic.direccion}</p>
                                            <p>{selectedClinic.telefono}</p>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        )}

                    </div>
                </section>


                {/* Lista de clínicas*/}

                <main className="w-full px-2 py-8">
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-pink-300">
                        {clinics.map((c) => (
                            <button
                                key={c.id_clinica}
                                type="button"
                                onClick={() => {
                                    setSelectedClinic(c);

                                    if (mapRef.current) {
                                        mapRef.current.panTo({
                                            lat: parseFloat(c.latitud),
                                            lng: parseFloat(c.longitud)
                                        });

                                        mapRef.current.setZoom(16);
                                    }
                                }}
                                aria-label={`Ver detalles de ${c.nombre}`}
                                className="
          group w-full text-left cursor-pointer
          flex items-start gap-3 rounded-[18px] bg-white/95 px-4 py-3
          shadow-[0_6px_20px_rgba(0,0,0,0.08)]
          ring-1 ring-pink-50
          transition
          hover:shadow-[0_12px_32px_rgba(251,113,133,0.25)] hover:ring-pink-300
          focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-300/60
          active:scale-[0.99]
        "
                            >
                                <div className="mt-1 shrink-0 rounded-full bg-pink-100 p-2 text-pink-700">
                                    <PinIcon />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-900">{c.nombre}</h3>
                                    <p className="mt-0.5 text-xs text-gray-700">{c.direccion}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </main>

            </div>
        </div>
    );
}


/** Icono pin simple*/
function PinIcon({ className = "h-5 w-5" }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.25a7.5 7.5 0 0 0-7.5 7.5c0 5.25 7.5 12 7.5 12s7.5-6.75 7.5-12a7.5 7.5 0 0 0-7.5-7.5zm0 10.125a2.625 2.625 0 1 1 0-5.25 2.625 2.625 0 0 1 0 5.25z" />
        </svg>
    );
}
