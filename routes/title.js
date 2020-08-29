const express = require("express");
const router = express.Router();

const titleController = require("../controllers/titleController");

// Solicitação GET para a página de detalhes.
router.get("/:id", titleController.title);
router.get("/", titleController.titles);

module.exports = router;
