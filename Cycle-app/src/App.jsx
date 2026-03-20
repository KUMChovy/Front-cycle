import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import HomeAut from "./pages/Bienvenida";
import Login from "./pages/Login";
import Recuperacion from "./pages/RecuperacionCon";
import Test from "./pages/Cuestionario/Test1";
import Ciclo from "./pages/Cyclo/Seguimiento";
import Clinicas from "./pages/Aclinicas/Clinicas";
import Perfil from "./pages/Perfil";
import Avatar from "./pages/SAvatar/Avatar";
import Biblioteca from "./pages/Biblioteca/Biblioteca";
import Layout from "./componentes/Layout";
import Plan from "./pages/suscripcion/Plan";
import ChatCycleView from "./pages/chatbot/Chatcycle";
import ForoView from "./pages/forocycle/foro";
import SeguimientoDia from "./pages/Cyclo/SeguimientoDia";
import Admin from "./pages/admin/admin";
import ProtectedPremium from "./componentes/funciones/protectedPremium"; 

function App() {
  return (
    <div className="p-6">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/ciclo" element={<Ciclo />} />
            <Route path="/clinicas" element={<ProtectedPremium><Clinicas /></ProtectedPremium>} />  
            <Route path="/biblioteca" element={<ProtectedPremium><Biblioteca /></ProtectedPremium>} />          
        </Route>

        <Route path="/chatcycle" element={
          <ProtectedPremium>
            <ChatCycleView />
          </ProtectedPremium>
        } />
        <Route path="/foro" element={
          <ProtectedPremium>
            <ForoView /> 
          </ProtectedPremium>
        } />

        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<HomeAut />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperacion" element={<Recuperacion />} />
        <Route path="/test" element={<Test />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/seguimiento-dia" element={<SeguimientoDia />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;