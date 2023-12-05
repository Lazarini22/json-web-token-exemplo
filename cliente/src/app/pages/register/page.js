'use client'
import { useState } from "react";
import handlerAcessUser from "../../functions/handlerAcess"
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function Registro() {
  const [registra, setRegistra] = useState({
    usuario: '',
    senha: ''
  });
  const { push, refresh } = useRouter();

  

  const handlerRegistro = async (e) => {
    e.preventDefault();
    try {
      await handlerAcessUser(user);
      push('/pages/dashboard');
    } catch {
      refresh();
    }

    const success = true;

    if (success) {
      toast.success('Usuário registrado com sucesso!');
    } else {
      toast.error('Ocorreu um erro ao enviar o formulário.');
    }
  };

  return (
    <body >
      <div >
        <h1 >Registre-se</h1>
        <form  onSubmit={handlerRegistro}>
          <input
            required

            placeholder='Nome'
            type="name"
            onChange={(e) => { setRegistra({ ...registra, usuario: e.target.value }) }}>
          </input>

          <input
            required

            placeholder='Senha'
            type='password'
            onChange={(e) => { setRegistra({ ...registra, senha: e.target.value }) }}>
          </input>
          <button >Entrar</button>
        </form>
        <h3 ><Link  href='/pages/dashboard'>Clique aqui</Link> para retornar a página de Dashboard</h3>
        <h3 >Deseja alterar algum dado? <Link  href="/pages/alter">Clique aqui</Link></h3>
        <ToastContainer />
      </div>
    </body>
  )
}
