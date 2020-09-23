const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const titleController = require("../controllers/titleController");
// Controle de autenticação
const { adminArea } = require("../middlewares/authentication");

// Solicitação GET para a página com todos os pedidos de inclusão.
router.get('/requests', adminArea(), adminController.requestsTitlesPending);

// Solicitação GET para visualizar um pedido de inclusão.
router.get('/request/:id', adminArea(), adminController.requestGetEdit);

// Solicitação POST que recebe formulário para fazer update em um título.
router.post('/request/accept/:id', adminController.requestPostEdit);

// Solicitação POST que apaga filme
router.post('/request/reject/:id', adminController.requestPostRemove);

router.get("/search/:page?", titleController.titlesPending);

// Solicitação GET para a página de detalhes.
router.get("/:id", titleController.title);

module.exports = router;