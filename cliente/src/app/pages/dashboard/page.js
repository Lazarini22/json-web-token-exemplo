import { getUsers } from "@/app/functions/handlerAcessAPI";
import Link from "next/link";

export default async function Dashboard() {
  const dash = await getUsers();

  return (
    <div className="page">
      <header>
        <h1>
          IFMS<span className="servidores">.servidores</span>
        </h1>
      </header>
      <div>
        <div className="container">
        <Link id="register" href="/pages/register">Registrar Usuário <br/></Link>
        <br/>
          {dash.map((user) => (
            <div className="user">
              <p>
                <span>Nome:</span> {user.usuario}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
