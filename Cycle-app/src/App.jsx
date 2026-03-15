import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import HomeAut from "./pages/Bienvenida";
import Login from "./pages/Login";
import Recuperacion from "./pages/RecuperacionCon";
import Test from "./pages/Cuestionario/Test1";
import Ciclo from "./pages/Cyclo/Seguimiento"
import Clinicas from "./pages/Aclinicas/Clinicas";  
import Perfil from "./pages/Perfil";  
import Avatar from "./pages/SAvatar/Avatar";

function App() {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<HomeAut />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperacion" element={<Recuperacion />} />
        <Route path="/test" element={<Test />} />
        <Route path="/ciclo" element={<Ciclo />} /> 
        <Route path="/clinicas" element={<Clinicas />} />     
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/avatar" element={<Avatar />} /> 
      </Routes>
    </div>
  );
}

export default App;