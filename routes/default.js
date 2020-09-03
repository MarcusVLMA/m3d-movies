const express = require("express");
const router = express.Router();
// Inporta o controlador para as rotas default
const defaultController = require("../controllers/defaultController");

// Redireciona para home
router.get("/", function (req, res) {
  res.redirect("/home");
});

// Solicitação GET para a página principal
router.get("/home", defaultController.home);

module.exports = router;
