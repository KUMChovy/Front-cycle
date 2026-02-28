import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Proyecto React + PHP</h1>
      <Link 
        to="/usuarios"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Ver Usuarios
      </Link>
    </div>
  );
}

export default Home;