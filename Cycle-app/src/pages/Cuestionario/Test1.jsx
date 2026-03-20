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
                { id: 4, label: "3 a 5 días"      },
                { id: 5, label: "3 a 7 días"       },
                { id: 5, label: "No estoy segura"  },
            ],
        },
        {
            id: "duracion_ciclo",
            title: "¿Cada cuándo te baja el periodo aproximadamente?",
            options: [
                { id: 22, label: "Cada 21 – 24 días" },
                { id: 28, label: "Cada 25 – 28 días" },
                { id: 35, label: "Más de 32 días"    },
                { id: 28, label: "Soy irregular"     },
                { id: 28, label: "No estoy segura"   },
            ],
        },
        {
            id: "regular",
            title: "¿Tu ciclo suele ser regular?",
            options: [
                { id: "regular",   label: "Sí"              },
                { id: "irregular", label: "No"               },
                { id: "irregular", label: "No estoy segura"  },
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
            id: "recordatorios",
            title: "¿Deseas recibir recordatorios del inicio de tu periodo?",
            options: ["Sí", "No"],
        },
        {
            id: "avisos_fertiles",
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
    const [answers, setAnswers]  = useState({});

    const handleAnswer = (value) => {
        const q          = questions[current];
        const newAnswers = { ...answers, [q.id]: value };
        setAnswers(newAnswers);

        if (current < questions.length - 1) {
            setCurrent((prev) => prev + 1);
        } else {
            const usuarioSession =
                JSON.parse(localStorage.getItem("usuarioPHP")) ||
                JSON.parse(localStorage.getItem("usuarioGoogle"));

            const usuario_id = usuarioSession?.id_usuario ?? usuarioSession?.id;

            // Guardar preferencias del ciclo en localStorage
            // El calendario las leerá cuando el usuario seleccione su primer día
            localStorage.setItem("cicloPref", JSON.stringify({
                regular:           newAnswers["regular"]           ?? "irregular",
                duracion_ciclo:    newAnswers["duracion_ciclo"]    ?? 28,
                duracion_sangrado: newAnswers["duracion_sangrado"] ?? 5,
            }));

            // Solo mandamos al PHP los datos del usuario (sin ciclo)
            const payload = {
                usuario_id,
                objetivo:         newAnswers["objetivo"]         ?? "",
                edad:             newAnswers["edad"]             ?? 18,
                uso_app_esperado: newAnswers["uso_app_esperado"] ?? "",
            };

            console.log("Payload enviado al PHP:", payload);
            console.log("cicloPref guardado:", localStorage.getItem("cicloPref"));

            fetch("http://localhost/cycle_back/modelo/encuesta_bienvenida_api.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })
                .then(res => res.json())
                .then(data => {
                    console.log("PHP response:", data);
                    navigate("/ciclo");
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