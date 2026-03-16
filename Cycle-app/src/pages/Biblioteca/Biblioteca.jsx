import { useNavigate } from "react-router-dom";
import { useState } from "react";
import gatito_lector from "../../assets/gatito_lector.webp"
import Imagen from "../../componentes/Imagen";
import { sesion } from "../../componentes/funciones/sesion";

export default function Biblioteca(){
  sesion
    const navigate = useNavigate();
    return(
        <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
              {/* ===== Background  ===== */}
              <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
              <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
              <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />
        
              <div className="pointer-events-none absolute bottom-14 right-10 hidden h-[380px] w-[380px] rounded-full border border-white/45 lg:block" />
              <div className="pointer-events-none absolute bottom-5 right-28 hidden h-[260px] w-[260px] rounded-full border border-white/35 lg:block" />
        
              {/* ===== Content ===== */}
              <div
                className="
                  relative flex h-full w-full items-center justify-center
                  px-6 sm:px-10
                  pt-[calc(env(safe-area-inset-top)+16px)]
                  pb-[calc(env(safe-area-inset-bottom)+16px)]
                "
              >
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        
                {/* titulo */}
                <header className="relative w-full overflow-hidden ">
                    <div className="relative flex h-[180px] items-center justify-center md:h-[220px] lg:h-[260px]">
                        {/* Contenido */}
                        <div className="relative z-[1] flex flex-col items-center text-center px-4">
                            <h1 className="font-extrabold tracking-tight text-rose-900 text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] leading-[1.05]">
                                Biblioteca
                            </h1>
                        </div>
                    </div>
                </header>

<div className="mt-6 flex flex-col items-center gap-2 text-xs">       
                    <a
                      className="
                          mt-6 w-full rounded-full bg-white/90 px-6 py-4
                          font-semibold text-black
                          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                          backdrop-blur
                          transition-all duration-300
                          hover:bg-pink-400 hover:text-white
                          hover:shadow-[0_14px_40px_rgba(251,113,133,0.45)]
                          active:scale-[0.98]
                          focus:outline-none focus:ring-4 focus:ring-pink-200
                        "
                        href=""
                    >
                      Hormonas explicadas Fácil
                    </a>
                    <a
                      className="
                          mt-6 w-full rounded-full bg-white/90 px-6 py-4
                          font-semibold text-black
                          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                          backdrop-blur
                          transition-all duration-300
                          hover:bg-pink-400 hover:text-white
                          hover:shadow-[0_14px_40px_rgba(251,113,133,0.45)]
                          active:scale-[0.98]
                          focus:outline-none focus:ring-4 focus:ring-pink-200
                        "
                        href=""
                    >
                      Educación para primer ciclo
                    </a>
                    <a
                      className="
                          mt-6 w-full rounded-full bg-white/90 px-6 py-4
                          font-semibold text-black
                          shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                          backdrop-blur
                          transition-all duration-300
                          hover:bg-pink-400 hover:text-white
                          hover:shadow-[0_14px_40px_rgba(251,113,133,0.45)]
                          active:scale-[0.98]
                          focus:outline-none focus:ring-4 focus:ring-pink-200
                        "
                        href=""
                    >
                      Mitos y Reailidades
                    </a>
                    </div>
                    <Imagen src={gatito_lector} alt="biblioteca"/> 
        
                  <div className="mt-6 flex flex-col items-center gap-2 text-xs sm:text-sm text-black/70">
                    <button
                      onClick={() => navigate("/Home")}
                      className="font-semibold hover:underline"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </div>
    )
}