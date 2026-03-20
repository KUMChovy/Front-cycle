import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionScreen from "./PantallaTest";
import { sesion } from "../../componentes/funciones/sesion";

export default function Test1() {
    sesion();
    const navigate = useNavigate();

    const questions = [
        {
            id: "objetivo",
            title: "¿Cuál es tu objetivo con Cycle?",
            options: [
                "Saber solo mis días",
                "Control del ciclo",
                "Seguir mi ciclo",
                "Quedar embarazada"
            ],
        },
        {
            id: "duracion_sangrado",
            title: "¿Cuántos días dura normalmente tu periodo?",
            options: [
                { label: "3 a 5 días", value: 4 },
                { label: "3 a 7 días", value: 5 },
                { label: "No estoy segura", value: 5 },
            ],
        },
        {
            id: "duracion_ciclo",
            title: "¿Cada cuándo te baja el periodo aproximadamente?",
            options: [
                { label: "Cada 21 – 24 días", value: 22 },
                { label: "Cada 25 – 28 días", value: 28 },
                { label: "Más de 32 días",    value: 35 },
                { label: "Soy irregular",     value: 28 },
                { label: "No estoy segura",   value: 28 },
            ],
        },
        {
            id: "regular",
            title: "¿Tu ciclo suele ser regular?",
            options: [
                { label: "Sí",              value: "regular"   },
                { label: "No",              value: "irregular" },
                { label: "No estoy segura", value: "irregular" },
            ],
        },
        {
            id: "sintomas",
            title: "¿Qué síntomas sueles presentar durante tu ciclo?",
            options: [
                { id: 1, label: "Dolor menstrual"  },
                { id: 2, label: "Cambios de humor" },
                { id: 3, label: "Fatiga"           },
                { id: 4, label: "Migraña"          },
            ],
        },
        {
            id: "recordatorios",   // solo UI, no se guarda en BD
            title: "¿Deseas recibir recordatorios del inicio de tu periodo?",
            options: ["Sí", "No"],
        },
        {
            id: "avisos_fertiles", // solo UI, no se guarda en BD
            title: "¿Deseas recibir avisos de días fértiles u ovulación?",
            options: ["Sí", "No"],
        },
        {
            id: "edad",
            type: "age",
            title: "Ingresa tu edad",
        },
        {
            id: "uso_app_esperado",
            title: "¿Para qué deseas usar Cycle principalmente?",
            options: [
                "Seguimiento del ciclo",
                "Conocer mis días fértiles",
                "Entender mejor mis síntomas",
                "Auto cuidado y bienestar"
            ],
        },
    ];

    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleAnswer = (value) => {
        const q = questions[current];

        const newAnswers = { ...answers, [q.id]: value };
        setAnswers(newAnswers);

        if (current < questions.length - 1) {
            setCurrent((prev) => prev + 1);
        } else {
            // ── Preparar payload con keys que espera el PHP ──────────────────
            const usuarioSession =
                JSON.parse(localStorage.getItem("usuarioPHP")) ||
                JSON.parse(localStorage.getItem("usuarioGoogle"));

            const usuario_id = usuarioSession?.id_usuario ?? usuarioSession?.id;

            const payload = {
                usuario_id,
                objetivo:          newAnswers["objetivo"]          ?? "",
                duracion_sangrado: newAnswers["duracion_sangrado"] ?? 5,
                duracion_ciclo:    newAnswers["duracion_ciclo"]    ?? 28,
                regular:           newAnswers["regular"]           ?? "irregular",
                sintomas:          newAnswers["sintomas"]
                                    ? [{ id: newAnswers["sintomas"], label: "" }]
                                    : [],
                edad:              newAnswers["edad"]              ?? 18,
                uso_app_esperado:  newAnswers["uso_app_esperado"]  ?? "",
            };

            console.log("Payload enviado al PHP:", payload);

            fetch("http://localhost/cycle_back/modelo/encuesta_bienvenida_api.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(data => {
                    console.log("PHP response:", data);
                    if (data.status === "ok") {
                        navigate("/ciclo");
                    } else {
                        console.error("Error del PHP:", data.mensaje);
                        navigate("/ciclo"); // redirige igual para no bloquear al usuario
                    }
                })
                .catch(err => {
                    console.error("Error de red:", err);
                    navigate("/ciclo");
                });
        }
    };

    const handleBack = () => {
        if (current > 0) setCurrent((prev) => prev - 1);
    };

    const currentQuestion = questions[current];
    const currentAnswer   = answers[currentQuestion.id] ?? null;

    return (
        <QuestionScreen
            question={currentQuestion}
            current={current}
            total={questions.length}
            selectedAnswer={currentAnswer}
            onAnswer={handleAnswer}
            onBack={handleBack}
        />
    );
}