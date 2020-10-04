var express = require("express");
var router = express.Router();
// Inporta o controlador para as rotas user
const userController = require("../controllers/userController");
// Controle de autenticação
const {
  authenticated,
  unauthenticated,
} = require("../middlewares/authentication");

// Solicitação GET para o perfil do usuário.
router.get("/", authenticated(), function (req, res) {
  res.redirect("/profile");
});

// Solicitação GET para a página de cadastro.
router.get("/registration", unauthenticated(), userController.registrationGet);

// Verfica se o e-mail ja existe
router.get(
  "/registration/emailAvailable/:userEmail",
  userController.emailAvailable
);

// Solicitação POST para registrar usuário.
router.post(
  "/registration",
  unauthenticated(),
  userController.registrationPost
);

// Solicitação GET para a página de Edição de Perfil do Usuário
router.get("/profile", authenticated(), userController.userProfileEditGet);

// Solicitação POST para editar as informações do usuário.
router.post("/profile", authenticated(), userController.userProfileEditPost);

// Solicitação POST para login
router.post("/sigin", unauthenticated(), userController.siginPost);

// Solicitação GET para deslogar
router.get("/sigout", authenticated(), userController.sigoutGet);

// Solicitação GET para galeria
router.get("/gallery/:page?", authenticated(), userController.gallery);

// Solicitação POST para adicionar título à galeria do usuário
router.post("/add/gallery", authenticated(), userController.addTitleToGallery);

// Solicitação POST para remover título da galeria do usuário
router.post(
  "/remove/gallery",
  authenticated(),
  userController.removeTitleFromGallery
);

module.exports = router;
