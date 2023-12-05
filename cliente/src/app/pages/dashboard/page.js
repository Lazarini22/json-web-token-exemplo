
import { getUsers } from "@/app/functions/handlerAcessAPI";


export default async function Dashboard() {

  const dash = await getUsers();

  return (
    <body>
      <div>
        <div>
          <h1>Dashboard</h1>
          <div>
            {dash.map((users) =>
              <p>Nome: {users.usuario}</p>
            )}
          </div>
        </div>
      </div>
    </body>
);
};
