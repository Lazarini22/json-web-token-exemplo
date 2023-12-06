import { getUsers } from "@/app/functions/handlerAcessAPI";

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
