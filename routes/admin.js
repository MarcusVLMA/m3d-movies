var express = require('express');
var router = express.Router();

// Solicitação GET para a página de pedidos de inclusão.
router.get('/requests', function(req, res) {
  res.send('Solicitação GET para a página de pedidos de inclusão');
});

// Solicitação GET para visualizar um pedido de inclusão.
router.get('/request/:id', function(req, res) {
  res.send('Solicitação GET para visualizar um pedido de inclusão');
});

// Solicitação POST que recebe formulário para adicionar um título.
router.post('/request/:id', function(req, res) {
  res.send('Solicitação POST que recebe formulário para adicionar um título');
});

// Solicitação GET para a página de inserção de título.
router.get('/title/add', function(req, res) {
  res.send('Add title form');
});

// Solicitação POST para receber formulário para adicionar um título.
router.post('/title/add', function(req, res) {
  res.send('Solicitação POST para receber formulário para adicionar um título');
});

module.exports = router;