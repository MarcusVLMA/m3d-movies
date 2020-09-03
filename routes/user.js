var express = require('express');
var router = express.Router();
// Inporta o controlador para as rotas user
const userController = require("../controllers/userController");

// Solicitação GET para o perfil do usuário.
router.get('/', function(req, res) {
  res.send('Solicitação GET para o perfil do usuário');
});

// Solicitação GET para a página de cadastro.
router.get("/registration", userController.registrationGet);

// Verfica se o e-mail ja existe
router.get("/registration/emailAvailable/:userEmail", userController.emailAvailable);

// Solicitação POST para registrar usuário.
router.post("/registration", userController.registrationPost);

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

// Solicitação GET para a página de Edição de Perfil do Usuário
router.get('/userProfileEdit', userController.userProfileEditGet)

// Solicitação POST para editar as informações do usuário.
router.post("/userProfileEdit", userController.userProfileEditPost);

module.exports = router;
