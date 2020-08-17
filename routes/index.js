const express = require('express');
const router = express.Router();

// Solicitação GET para a página principal
router.get('/', function(req, res) {
  res.send('Solicitação GET para a página principal');
});

// Solicitação GET para a página de cadastro.
router.get('/registration', function(req, res) {
  res.send('Solicitação GET para a página de cadastro');
});

// Solicitação POST para registrar usuário.
router.post('/registration', function(req, res) {
  res.send('Solicitação POST para registrar usuário');
});

// Solicitação GET para a página de busca.
router.get('/search/:query?', function(req, res) {
  res.send('Solicitação GET para a página de busca <br>' 
          + 'Query: ' + req.params.query);
});

// Solicitação GET para a página de detalhes.
router.get('/title/:id', function(req, res) {
  res.send('Solicitação GET para a página de detalhes');
});

module.exports = router;
