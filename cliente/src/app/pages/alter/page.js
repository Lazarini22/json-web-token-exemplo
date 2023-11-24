"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Alter() {
  const mudar = (e) => {
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
        <form onSubmit={mudar}>
            <input placeholder="Nome" type="text" required></input>
          <input placeholder="E-mail" type="email" required></input>
          <input placeholder="Senha" type="password" required></input>
          <button>Alterar</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
