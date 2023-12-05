
import { getUsers } from "@/app/functions/handlerAcessAPI";


export default async function Dashboard() {

  const dash = await getUsers();

  return (
    <body className={styles.body}>
      <div class={styles.div}>
        <div className={mzar}>
          <h1 className={StyleSheet.textao}>Dashboard</h1>

          <div className={style.nzao}>
            {dash.map((users) =>
              <p className={style.usuario}>Nome: {users.nome}</p>
            )}
          </div>
        </div>
      </div>
    </body>
);
};
