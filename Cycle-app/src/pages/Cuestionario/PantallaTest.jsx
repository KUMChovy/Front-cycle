import { useEffect, useState } from "react";
import LogoAvatar from "../../componentes/LogoAvatar";
import logo from "../../assets/calendario.png";
import { sesion } from "../../componentes/funciones/sesion";

export default function QuestionScreen({
    question,
    current,
    total,
    selectedAnswer,
    onAnswer,
    onBack,
}) {
    const [selected, setSelected] = useState(null);
    const [age, setAge] = useState(22);
    sesion()

    useEffect(() => {
        setSelected(selectedAnswer);

        if (question.type === "age" && selectedAnswer) {
            setAge(selectedAnswer);
        }
    }, [selectedAnswer, question.id]);

    const handleSelect = (option) => {
        setSelected(option);

        setTimeout(() => {
            onAnswer(option);
        }, 200);
    };

    const increaseAge = () => {
        setAge((prev) => prev + 1);
    };

    const decreaseAge = () => {
        if (age > 8) {
            setAge((prev) => prev - 1);
        }
    };

    return (
        <div className="fixed inset-0 overflow-hidden bg-[#FCE7F3]">
            {/* Background */}
            <div className="pointer-events-none absolute -top-24 left-0 h-[340px] w-full rounded-b-[90px] bg-[#FBCFE8]/90" />
            <div className="pointer-events-none absolute -right-44 top-16 h-[520px] w-[520px] rounded-full bg-[#F9A8D4]/55" />
            <div className="pointer-events-none absolute -bottom-64 -left-56 h-[600px] w-[760px] rounded-full bg-[#FBCFE8]/75" />

            <div
                className="
          relative flex h-full w-full items-center justify-center
          px-6 sm:px-10
          pt-[calc(env(safe-area-inset-top)+16px)]
          pb-[calc(env(safe-area-inset-bottom)+16px)]
        "
            >
                <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
                    {/* Header */}
                    <header className="mb-10 flex items-center gap-3">
                        {current > 0 && (
                            <button
                                onClick={onBack}
                                aria-label="Volver"
                                className="
      mr-2 flex h-10 w-10 items-center justify-center
      rounded-full bg-white/90
      shadow-[0_6px_20px_rgba(0,0,0,0.12)]
      backdrop-blur
      transition-all duration-300
      hover:bg-pink-100
      hover:shadow-[0_10px_30px_rgba(251,113,133,0.35)]
      active:scale-[0.95]
      focus:outline-none focus:ring-4 focus:ring-pink-200
    "
                            >
                                <span className="text-xl font-bold text-black">←</span>
                            </button>
                        )}
                    </header>

                    {/* Question */}
                    <h2 className="mb-10 text-center text-balance font-black tracking-tight text-black leading-[1.05] text-[clamp(1.6rem,4.5vw,2.6rem)]">
                        {question.title}
                    </h2>

                    {/* ================== PREGUNTA EDAD ================== */}
                    {question.type === "age" ? (
                        <div className="flex flex-col items-center gap-6">

                            <button
                                onClick={increaseAge}
                                className="text-6xl font-bold text-black"
                            >
                                ▲
                            </button>

                            <div className="text-center">
                                <p className="text-xl text-black/40">{age - 1}</p>
                                <p className="text-4xl font-bold text-black">{age}</p>
                                <p className="text-xl text-black/40">{age + 1}</p>
                            </div>

                            <button
                                onClick={decreaseAge}
                                className="text-6xl font-bold text-black"
                            >
                                ▼
                            </button>

                            <button
                                onClick={() => onAnswer(age)}
                                className="
                                mt-6 rounded-full px-10 py-3
                                bg-white/90 text-black
                                shadow-[0_6px_20px_rgba(0,0,0,0.08)]
                                font-semibold
                                "
                            >
                                Confirmar
                            </button>

                        </div>
                    ) : (
                        /* ================== OPCIONES NORMALES ================== */
                        <div className="flex flex-col gap-4">
                            {question.options.map((option,index) => {
                                const isObject = typeof option === "object";   // detecta objetos
                                const value = isObject ? option.id : option;   // lo que se guarda
                                const label = isObject ? option.label : option; // lo que se muestra
                                const active = selected === option;

                                return (
                                    <button
                                        key={isObject ? option.id : index}
                                        onClick={() => handleSelect(value)}
                                        className={`
                    w-full rounded-full px-6 py-4
                    text-sm sm:text-base font-semibold
                    transition-all duration-300
                    ${active
                                                ? "bg-pink-400 text-white shadow-[0_14px_40px_rgba(251,113,133,0.45)]"
                                                : "bg-white/90 text-black shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
                                            }
                    active:scale-[0.98]
                    focus:outline-none focus:ring-4 focus:ring-pink-200
                  `}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Progress */}
                    <div className="mt-10 flex justify-center gap-2">
                        {Array.from({ length: total }).map((_, i) => (
                            <span
                                key={i}
                                className={`h-2 rounded-full transition-all ${i === current
                                    ? "w-6 bg-pink-400"
                                    : "w-2 bg-pink-200"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}