const express = require("express");
const router = express.Router();
const titleController = require("../controllers/titleController");

// Busca títulos
router.get('/search/:encodedParams/:page/:order', titleController.searchTitles);

// Retorna títulos pendentes por pagina
router.get('/pending/all/:page', titleController.getTitlesPending);

// Retorna um título pendente por ID
router.get('/pending/:id', titleController.getTitlePending);

// Busca títulos
router.get('/count/:encodedParams', titleController.countTitle);

// Adiciona um comentario
router.post('/:titleId/commentary', titleController.addCommentary);

// Remove um comentario
router.delete('/commentary/:commentaryId', titleController.removeCommentary);

// Retorna um título por ID
router.get('/:id', titleController.getTitle);

// Remove um título por ID
router.delete('/:id', titleController.removeTitle);

// Cria um titulo
router.post('/', titleController.createTitle);

// Atualiza um titulo
router.put('/', titleController.updateTitle);

module.exports = router;
