"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Registro() {
  const [user, setUser] = useState({
    usuario: "",
    senha: "",
    confirmpass: "",
  });
  const { push, refresh } = useRouter();

  const handlerRegistro = async (e) => {
    e.preventDefault();

    try {
      if (user.senha.trim() !== "" && user.usuario.trim() !== "" && user.confirmpass.trim() !== "") {
        if (user.senha !== user.confirmpass) {
          toast.error("As senhas não coincidem.");
        } else{
          await postUser(user); 
          toast.success("Cadastro efetuado.");
          setTimeout(() => {
            push("/pages/dashboard");
          }, 1500);
        }
      } else{
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
        <form onSubmit={handlerRegistro}>
          <input
            placeholder="Nome"
            type="name"
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
          <input
            placeholder="Senha"
            type="password"
            onChange={(e) => {
              setUser({ ...user, confirmpass: e.target.value });
            }}
          ></input>
          <br/>
          <button>Registrar</button>
        </form>
        <br/>
        <Link id="back-dash" href="/pages/dashboard">Voltar</Link>
        <ToastContainer />
      </div>
    </div>
  );
}
