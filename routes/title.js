const express = require("express");
const router = express.Router();
const titleController = require("../controllers/titleController");
// Controle de autenticação
const { authenticated } = require("../middlewares/authentication");

// Solicitação GET para a página de solicitação.
router.get("/request", authenticated(), titleController.requestGet);

// Solicitação POST para a página de solicitação.
router.post("/request", authenticated(), titleController.requestPost);

// Solicitação GET para a página de busca.
router.get("/search/:page?", titleController.titles);

// Solicitação GET para a página de detalhes.
router.get("/:id", titleController.title);

// Solicitação Post para a página de detalhes.
router.post("/:id", titleController.avaliationPost);

module.exports = router;
