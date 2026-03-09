import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionScreen from "./PantallaTest";
import { sesion } from "../../componentes/funciones/sesion";

export default function Test1() {
    sesion();
    const navigate = useNavigate();

    const questions = [
        {
            id: 1,
            title: "¿Cuál es tu objetivo con Cycle?",
            options: [
                "Saber solo mis días",
                "Control del ciclo",
                "Seguir mi ciclo",
                "Quedar embarazada"
            ],
        },
        {
            id: 2,
            title: "Aca va lo del calendario",
            options: [
                "Todos los días",
                "Varias veces a la semana",
                "Solo cuando lo necesite"
            ],
        },
        {
            id: 3,
            title: "¿Cuántos días dura normalmente tu periodo?",
            options: [
                "3 dias a 5 dias",
                "3 dias a 7 dias",
                "No estoy segura"
            ],
        },
        {
            id: 4,
            title: "¿Cada cuándo te baja el periodo aproximadamente?",
            options: [
                "Cada21 – 24días",
                "Cada25 – 28días",
                "Más de 32 díass",
                "Soy irregular",
                "Noestoy segura"
            ],
        },
        {
            id: 5,
            title: "¿Tú ciclo suele ser regular?",
            options: [
                "Si",
                "No",
                "Noestoy segura"
            ],
        },
        {
            id: 6,
            title: "¿Qué síntomas sueles presentar durante tu ciclo?",
            options: [
                "Dolor menstrual",
                "Cambios de humor",
                "Fatiga",
                "Migraña"
            ],
        },
        {
            id: 6,
            title: "¿Deseas recibir recordatorios del inicio de tu periodo?",
            options: [
                "Si",
                "No"
            ],
        },
        {
            id: 7,
            title: "¿Deseas recibir avisos de días fértiles u ovulación?",
            options: [
                "Si",
                "No"
            ],
        },

        {
            id: 8,
            title: "Ingresa tú edad a qui luego lo acabo ",
            options: [
                "Si",
                "No"
            ],
        },
        {
            id: 9,
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

        setAnswers((prev) => ({
            ...prev,
            [q.id]: value,
        }));

        if (current < questions.length - 1) {
            setCurrent((prev) => prev + 1);
        } else {
            console.log("Respuestas finales:", {
                ...answers,
                [q.id]: value,
            });
            navigate("/home");
        }
    };

    const handleBack = () => {
        if (current > 0) {
            setCurrent((prev) => prev - 1);
        }
    };

    const currentQuestion = questions[current];
    const currentAnswer = answers[currentQuestion.id] ?? null;

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