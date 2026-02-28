import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import HomeAut from "./pages/Homeaut";
import Login from "./pages/Login";
import Recuperacion from "./pages/RecuperacionCon"

function App() {
  return (
    <div className="p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<HomeAut />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recuperacion" element={<Recuperacion />} />
      </Routes>
    </div>
  );
}

export default App;