import { useEffect, useState } from "react";

export default function UserAvatar(){

  const [avatar,setAvatar] = useState(null);

  useEffect(()=>{

    const usuario =
      JSON.parse(localStorage.getItem("usuarioPHP")) ||
      JSON.parse(localStorage.getItem("usuarioGoogle"));

    fetch("https://salmon-mosquito-816172.hostingersite.com/modelo/obtenerAvatar.php",{ 
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        id_usuario: usuario.id
      })
    })
    .then(res => res.json())
    .then(data => {

      console.log(data);

      if(data.status === "ok"){
        setAvatar(data.imagen);
      }

    });

  },[]);

  return(

    <div>

      {avatar ? (
        <img
          src={`../../assets/avatars/${avatar}`}
          width="60"
          height="60"
          style={{borderRadius:"50%"}}
        />
      ) : (
        <div>Cargando avatar..1.</div>
      )}

    </div>

  );

}