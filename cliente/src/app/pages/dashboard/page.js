import Listagem from "@/app/Listagem/Listagem";
import { getUsers, pegarUsuario } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";

export default async function Dashboard() {

  const dash = await pegarUsuario();

  return (
    <body className={styles.body}>
      <div class={styles.div}>
        <div className={mzar}>
          <h1 className={StyleSheet.textao}>Dashboard</h1>

          <div className={style.nzao}>
            {chama.map((users) =>
              <p className={style.usuario}>Nome: {users.nome}</p>
            )}
          </div>
        </div>
      </div>
    </body>
);
};
