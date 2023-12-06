"use client";
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [user, setUser] = useState({
    usuario: "",
    senha: "",
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();

    try {
      if (user.senha.trim() !== "" && user.usuario.trim() !== "") {
        const userAuth = await handlerAcessUser(user);
        if (!userAuth.token) {
          toast.error("Usuário ou senha incorreto");
        } else {
          toast.success("Login efetuado");
          setTimeout(() => {
            push("/pages/dashboard");
          }, 1500);
        }
      } else {
        toast.error("Preencha todos os campos");
      }
    } catch {
      toast.error("Error!");
      refresh();
    }
  };

  return (
    <div className="page-vh">
      <header id="espace">
        <h1>
          IFMS<span className="servidores">.servidores</span>
        </h1>
      </header>
      <div className="section">
        <form onSubmit={handlerLogin}>
          <input
            placeholder="E-mail"
            name="name"
            type="text"
            onChange={(e) => {
              setUser({ ...user, usuario: e.target.value });
            }}
          ></input>
          <input
            placeholder="Senha"
            type="password"
            onChange={(e) => {
              setUser({ ...user, senha: e.target.value });
            }}
          ></input>
          <br />
          <button>Entrar</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}