"use server";

const url = "http://localhost:4000";

const getUserAuthenticated = async (user) => {
  try {
    const responseOfApi = await fetch(url + "/logar", {
      cache: "no-cache",
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(user),
    });

    if (!responseOfApi.ok) {
      const errorText = await responseOfApi.text();
      throw new Error(errorText);
    }
    //Converte resposta para json
    const userAuth = await responseOfApi.json();
    return userAuth;
  } catch (error) {
    return { error: error.message };
  }
};

const postUsuario = async (user) => {
  try {
    const resapi = await fetch(url + "/user", {
      method: "POST",
      headers: { "content-Type": "Application/json" },
      body: JSON.stringify(user),
    });
    const saveUsuario = await resapi.json();
    return saveUsuario;
  } catch {
    return null;
  }
};

const getUsers = async (user) => {
  const token = cookies().get("token")?.value;

  try {
    const responseOfApi = await fetch(url + "/usuarios/listar", {
      cache: "no-cache",
      headers: {
        "Content-Type": "Application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(user),
    });
    const users = await responseOfApi.json();
    return users;
  } catch {
    return null;
  }
};

export { getUsers, getUserAuthenticated, postUsuario };
