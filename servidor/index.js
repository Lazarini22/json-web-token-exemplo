const crypto = require("./crypto");

// JWT
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
var { expressjwt: expressJWT } = require("express-jwt");

//o cors abre um porta no servidor para o cliente e libera para que o cliente possa acessar certas funcionanlidades
const cors = require("cors");

//define o que o cliente pode fazer
const corsOpcoes = {
  //CLIENTE QUE FARÁ O ACESSO
  origin: "Http://localhost:3000",
  //METODOS QUE O CLIENTE PODE EXECUTAR
  methods: "GET,PUT,POST,DELETE",

  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

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
    const listagem = await usuario.findAll();
    res.json(listagem);
  } catch (error) {
    res.status(500).send("Error!");
  }
});

app.post("/logar", async function (req, res) {
  try {
    const user = await usuario.findOne({
      where: { usuario: req.body.usuario },
    });
    let userDescript = crypto.decrypt(user.senha);
    if (userDescript === req.body.senha) {
      const id = user.id;
      const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: 300 });
      res.cookie("token", token, { httpOnly: true }).json({
        usuari: user.usuario,
        token: token,
      });
    } else {
      res.status(500).json({ error: "Senha incorreta" });
    }
  } catch (error) {
    res.status(500).send("Erro ao autenticar usuário");
  }
});

app.post("/usuarios/registrar", async function (req, res) {
  try {
    let usuarioExistente = await usuario.findOne({
      where: { usuario: req.body.usuario },
    });

    if (usuarioExistente) {
      res.status(500).json({ error: "Usuario já existe" });
    } else {
      let senhaCrypto = crypto.encrypt(req.body.senha);
      await usuario.create({
        usuario: req.body.usuario,
        senha: senhaCrypto,
      });
      res.redirect("/");
    }
  } catch (error) {
    res.status(500).send("Erro ao cadastrar usuário");
  }
});

app.post("/deslogar", function (req, res) {
  res.cookie("token", null, { httpOnly: true });
  res.redirect("/autenticar");
});

app.listen(4000, function () {
  console.log("App de Exemplo escutando na porta 4000!");
});
