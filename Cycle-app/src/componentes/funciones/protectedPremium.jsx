// src/componentes/ProtectedPremium.jsx  ← archivo nuevo
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedPremium({ children }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const usuarioPHP = JSON.parse(localStorage.getItem("usuarioPHP"));
    const usuarioGoogle = JSON.parse(localStorage.getItem("usuarioGoogle"));
    const usuario = usuarioPHP || usuarioGoogle;

    if (!usuario || usuario.tipo !== "premium") {
      setStatus("blocked");
    } else {
      setStatus("premium");
    }
  }, []);

  if (status === "checking") return <div>Cargando...</div>;
  if (status === "blocked") return <Navigate to="/plan" replace />;
  return children;
}