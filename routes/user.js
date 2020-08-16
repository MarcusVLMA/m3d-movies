var express = require('express');
var router = express.Router();

// Solicitação GET para o perfil do usuário.
router.get('/', function(req, res, next) {
  res.send('Solicitação GET para o perfil do usuário');
});

// Solicitação POST para editar o perfil do usuário.
router.get('/', function(req, res, next) {
  res.send('Solicitação POST para editar o perfil do usuário');
});

// Solicitação GET para a página de solicitação de título.
router.get('/titles/submit', function(req, res) {
  res.send('Solicitação GET para a página de solicitação de título');
});

// Solicitação POST para a recebe o formulário de solicitação de título.
router.post('/titles/submit', function(req, res) {
  res.send('Solicitação POST para a recebe o formulário de solicitação de título');
});

// Solicitação POST para recebe o formulário de comentário.
router.post('/title/:id', function(req, res) {
  res.send('Solicitação POST para recebe o formulário de comentário');
});

// Solicitação GET para a galeria.
router.get('galery', function(req, res) {
  res.send('Solicitação GET para a galeria');
});

// Solicitação POST para adicionar a galeria.
router.post('galery/:id/add', function(req, res) {
  res.send('Solicitação POST para adicionar a galeria');
});

// Solicitação POST para remover da galeria.
router.post('galery/:id/remove', function(req, res) {
  res.send('Solicitação POST para remover da galeria');
});

module.exports = router;
