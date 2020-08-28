const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

// Solicitação GET para a página de detalhes.
router.get("/:id", movieController.movie);

module.exports = router;
