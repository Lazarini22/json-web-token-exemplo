import Listagem from "@/app/Listagem/Listagem";
import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";

export default async function Dashboard() {
  let nomes = getUsers();
  return (
    <div className="page">
      <header>
        <h1>
          IFMS<span className="servidores">.servidores</span>
        </h1>
      </header>
      <Suspense
        fallback={
          <h1 className="section" id="space">
            Carregando...!
          </h1>
        }
      >
        <Listagem users={nomes} />
        {nomes.map((serv) => (
          <div className="nome-card" key={serv.id}>
            <h1>{serv.nome}</h1>
          </div>
        ))}
      </Suspense>
    </div>
  );
}
