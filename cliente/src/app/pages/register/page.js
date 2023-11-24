"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const registar = (e) => {
    e.preventDefault();
    toast.success("Dados enviados!");
  };

  return (
    <div className="page">
      <header id="espace">
        <h1>
          IFMS<span className="servidores">.servidores</span>
        </h1>
      </header>
      <div className="section">
        <form onSubmit={registar}>
            <input placeholder="Nome" type="text" required></input>
          <input placeholder="E-mail" type="email" required></input>
          <input placeholder="Senha" type="password" required></input>
          <button>Registrar</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
