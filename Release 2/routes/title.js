const express = require("express");
const router = express.Router();

const titleController = require("../controllers/titleController");

// Solicitação GET para a página de solicitação.
router.get("/request", titleController.requestGet);

// Solicitação POST para a página de solicitação.
router.post("/request", titleController.requestPost);

// Solicitação GET para a página de detalhes.
router.get("/gallery/:page?",  titleController.titles);

router.get("/:id", titleController.title);

module.exports = router;
