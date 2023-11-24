"use server";

//const url = "http://localhost:4000";

const servidores = [
  {
    nome: "Claudio Zarate",
    email: "claudio@gmail.com",
    senha: "123",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  },
  {
    nome: "Marcelino Vitor",
    email: "marcelino@gmail.com",
    senha: "123",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  },
];

const getUserAuthenticated = (user) => {
    let userAuth = {};
    servidores.map(e => {
        if(e.email === user.email && e.senha === user.password){
            userAuth = e;
        }
    })
    return userAuth
};

const getUsers = () => {
    return servidores;
};
export { getUsers, getUserAuthenticated };
