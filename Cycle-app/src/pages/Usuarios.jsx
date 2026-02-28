import { useEffect, useState } from "react";
import axios from "axios";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/proyecto/backend/api.php")
      .then(res => {
        setUsuarios(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>

      <div className="grid gap-4">
        {usuarios.map(usuario => (
          <div 
            key={usuario.id}
            className="bg-gray-100 p-4 rounded shadow"
          >
            <p className="font-semibold">{usuario.nombre}</p>
            <p className="text-gray-600">{usuario.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Usuarios;