"use client";
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if (userAuth.token === undefined) {
        toast.error("E-mail ou senha invalidos");
      } else {
        toast.success("Login efetuado!");
        push("/pages/dashboard");
      }
    } catch {
      toast.error("Erro");
      refresh();
    }
  };

  return (
    <div className="page">
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
              setUser({ ...user, name: e.target.value });
            }}
          ></input>
          <input
            placeholder="Senha"
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          ></input>
          <button>Entrar</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
