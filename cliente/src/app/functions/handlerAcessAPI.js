"use server";

import { cookies } from "next/headers";

const url = "http://localhost:4000";

const getUserAuthenticated = async (user) => {
  try {
    const responseOfApi = await fetch(url + "/logar", {
      cache: "no-cache",
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify(user),
    });

    const userAuth = await responseOfApi.json();
    return userAuth;
  } catch (error) {
    return { error: error.message };
  }
};

const postUser = async (user) => {
  const token = cookies().get("token")?.value;

  try {
    const responseOfApi = await fetch(url + "/usuarios/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Cookie: `token=${token}`,
      },
      body: JSON.stringify(user),
    });

    const userSave = await responseOfApi.json();
    return userSave;
  } catch (error) {
    return { error: error.message };
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
  } catch (error) {
    return { error: error.message };
  }
};

export { getUsers, getUserAuthenticated, postUser };