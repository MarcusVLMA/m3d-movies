const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

// Solicitação GET para a página com todos os pedidos de inclusão.
router.get('/requests', adminController.requests);

// Solicitação GET para visualizar um pedido de inclusão.
router.get('/request/:id', adminController.requestGetEdit);

// Solicitação POST que recebe formulário para fazer update em um título.
router.post('/request/accept/:id', adminController.requestPostEdit);

// Solicitação POST que apaga filme
router.post('/request/reject/:id', adminController.requestPostRemove);

module.exports = router;