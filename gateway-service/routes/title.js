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
router.get("/search/:page?", titleController.searchTitles);

// Solicitação GET para a página de detalhes.
router.get("/:id", titleController.title);

// Solicitação POST para criar comentário.
router.post("/commentary", authenticated(), titleController.titleCommentary);

// Solicitação DELETE para deletar comentário.
router.delete(
  "/commentary/:commentaryId",
  authenticated(),
  titleController.deleteTitleCommentary
);

// Solicitação POST para enviar avaliacao.
router.post('/avaliation', authenticated(), titleController.avaliationPost)

module.exports = router;
