const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
// Controle de autenticação
const { adminArea } = require("../middlewares/authentication");

// Solicitação GET para a página com todos os pedidos de inclusão.
router.get('/requests', adminArea(), adminController.requests);

// Solicitação GET para visualizar um pedido de inclusão.
router.get('/request/:id', adminArea(), adminController.requestGetEdit);

// Solicitação POST que recebe formulário para fazer update em um título.
router.put('/request/accept/:id', adminController.requestAccept);

// Solicitação POST que apaga filme
router.delete('/request/reject/:id', adminController.requestReject);

module.exports = router;