const express = require("express");
const router = express.Router();
const database = require("../database").default;
// Inporta o controlador para as rotas default
const defaultController = require("../controllers/defaultController")

// Redireciona para home
router.get('/', function(req, res) {
  res.redirect('/home');
});

// Solicitação GET para a página principal
router.get("/home", defaultController.home);

// Solicitação GET para a página de cadastro.
router.get("/registration", function (req, res) {
  res.send("Solicitação GET para a página de cadastro");
});

// Solicitação POST para registrar usuário.
router.post("/registration", function (req, res) {
  res.send("Solicitação POST para registrar usuário");
});

// Solicitação GET para a página de busca.
router.get("/search/:query?", function (req, res) {
  res.send(
    "Solicitação GET para a página de busca <br>" + "Query: " + req.params.query
  );
});

// Solicitação GET para a página de detalhes.
router.get("/title/:id", function (req, res) {
  res.send("Solicitação GET para a página de detalhes");
});

module.exports = router;
