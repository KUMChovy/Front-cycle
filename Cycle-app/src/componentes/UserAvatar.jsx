import { useEffect, useState } from "react";

export default function UserAvatar(){

  const [avatar,setAvatar] = useState(null);

  useEffect(()=>{

    fetch("http://localhost/cycle_back/modelo/obtenerAvatar.php")
      .then(res => res.json())
      .then(data => {

        if(data.status === "ok"){
          setAvatar(data.imagen);
        }

      });

  },[]);

  return(

    <div>

      {avatar ? (
        <img
          src={`/src/assets/avatars/${avatar}`}
          width="60"
          height="60"
          style={{borderRadius:"50%"}}
        />
      ) : (
        <div>Cargando avatar...</div>
      )}

    </div>

  );

}