const crypto = require("./crypto");

// JWT
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
var { expressjwt: expressJWT } = require("express-jwt");
const corsOpcoes = {
  //CLIENTE QUE FARÁ O ACESSO
  origin: "Http://localhost:3000",
  //METODOS QUE O CLIENTE PODE EXECUTAR
  methods:"GET,PUT,POST,DELETE",

  allowedHeaders:"Content-Type, Authorization",
  credentials: true
} 

const cors = require("cors");
var cookieParser = require("cookie-parser");
const express = require("express");
const { usuario } = require("./models");
const app = express();



app.set("view engine", "ejs");

app.use(cors(corsOpcoes));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: (req) => req.cookies.token,
  }).unless({
    path: ["/autenticar", "/logar", "/deslogar", "/usuarios/cadastrar"],
  })
);

app.get("/autenticar", async function (req, res) {
  res.render("autenticar");
});

app.get("/", async function (req, res) {
  res.render("home");
});

app.get("/usuarios/cadastrar", async function (req, res) {
  res.render("cadastrar");
});

app.get("/usuarios/listar", async function (req, res) {
  try {
    const list = await usuario.findAll();
    res.render("listar", { list });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar usuários");
  }
});

app.post("/usuarios/cadastrar", async function (req, res) {
  try {
    let existeUser = await usuario.findOne({ where: { usuario: req.body.usuario } });
    if (existeUser) {
      res.status(500).send("O usuário já existe");
    } else {
      if (req.body.senha == req.body.confirmpass) {
        // Criptografando a senha no banco de dados
        let senhaCrypto = crypto.encrypt(req.body.senha);
        await usuario.create({
          usuario: req.body.usuario,
          senha: senhaCrypto,
        });
        res.redirect("/autenticar");
      } else {
        res.status(500).send("As senhas devem ser idênticas");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar usuário");
  }
});

app.post("/logar", async function (req, res) {
  try {
    const user = await usuario.findOne({ where: { usuario: req.body.usuario} });
    if (!user) {
      return res.status(500).json({error: "Usuarion não encontrado"});
    }
    let userSenha = crypto.decrypt(user.senha);
    if (req.body.senha === userSenha){ 
      const id = user.id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300,
      });
      res.cookie("token", token, { httpOnly: true }).json({
          usuari: user.usuario,
          token: token
      });
    } else {
      res.status(500).json({error: "Senha inválida"});
    }
  } catch(error) {
    res.status(500).send("Erro ao autenticar usuário");
  }
});






app.post("/deslogar", function (req, res) {
  res.cookie("token", null, { httpOnly: true });
  res.redirect("/autenticar");
});

app.listen(4000, function () {
  console.log("App de Exemplo escutando na porta 3000!");
});