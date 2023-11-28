"use server";

//const url = "http://localhost:4000";

const getUseAuthenticated = async (user) => {
  
  try{
    const resapi = await fetch(url +"/user/autenticated",
    {
      cache: "no-cache",
      method: "POST", 
      headers: {"Content-type": "Aplication/json"},
      body: JSON.stringify(user)

    }
  );
  const usuarioAutentique = await resapi.json();
  return usuarioAutentique;
  }catch {
    return{};
  }
  }



  const postUsuario = async (user) => {
    try{
      const resapi = await fetch(url + "/user",{
        method: 'POST',
        headers: {'content-Type': 'Application/json'},
        body: JSON.stringify(user)
      });
      const saveUsuario = await resapi.json();
      return saveUsuario;
    }catch{
      return null;
    }
    }


  const pegarUsuario = async () =>{

    const pegar = await fetch(url + "/users",
    {
      next: {revalidate: 10},
    }
);
  
  const usuarioAutentique = await pegar.josn();
  return usuarioAutentique;
};

const getUserRegistered = (user) => {

}

export {pegarUsuario, getUseAuthenticated, postUsuario};