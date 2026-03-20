import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionScreen from "./PantallaTest";
import { sesion } from "../../componentes/funciones/sesion";
import { validar } from "../../componentes/funciones/validacion";

export default function Test1() {
    sesion();
    validar();
    const navigate = useNavigate();

    const questions = [
        {
            id: 1,
            title: "¿Cuál es tu objetivo con Cycle?", //tabla usuarios atributo objetivo
            options: [
                "Saber solo mis días",
                "Control del ciclo",
                "Seguir mi ciclo",
                "Quedar embarazada"
            ],
        },
        {
            id: 2,
            title: "¿Cuántos días dura normalmente tu periodo?", //tabla ciclo_menstrual campo duracion_sangrado
            options: [
                "3 dias a 5 dias",
                "3 dias a 7 dias",
                "No estoy segura"
            ],
        },
        {
            id: 3,
            title: "¿Cada cuándo te baja el periodo aproximadamente?", // tabla ciclo_menstrual duracion_ciclo
            options: [
                "Cada21 – 24días",
                "Cada25 – 28días",
                "Más de 32 días",
                "Soy irregular",
                "No estoy segura"
            ],
        },
        {
            id: 4,
            title: "¿Tú ciclo suele ser regular?", //tabla ciclo_menstrual campo regular
            options: [
                "Si",
                "No",
                "Noestoy segura"
            ],
        },
        {
            id: 5,
            title: "¿Qué síntomas sueles presentar durante tu ciclo?", //viene de tabla síntomas con clave foránea
            options: [
                {id:1, label:"Dolor menstrual"},
                {id:2, label:"Cambios de humor"},
                {id:3, label:"Fatiga"},
                {id:4, label:"Migraña"}
            ],
        },
        {
            id: 6,
            title: "¿Deseas recibir recordatorios del inicio de tu periodo?", //omitir en BD
            options: [
                "Si",
                "No"
            ],
        },
        {
            id: 7,
            title: "¿Deseas recibir avisos de días fértiles u ovulación?", //omitir en BD
            options: [
                "Si",
                "No"
            ],
        },

        {
            id: 8,
            type: "age",
            title: "Ingresa tu edad", //tabla usuarios campo edad
        },

        {
            id: 9,
            title: "¿Para qué deseas usar Cycle principalmente?", //tabla usuarios campo uso_esperado
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
                const usuarioSession = JSON.parse(localStorage.getItem("usuarioPHP")) || JSON.parse(localStorage.getItem("usuarioGoogle"));
                const usuario_id = usuarioSession?.id;
                const finalAnswers = { usuario_id, ...answers, [q.id]: value };
            fetch("http://localhost/cycle_back/modelo/encuesta_bienvenida_API.php",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(finalAnswers),
            })
            .then(res=>res.json())
            .then(data=>console.log("PHP response:",data))
            .catch(err=>console.error(err))
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