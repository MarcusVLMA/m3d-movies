var express = require("express");
var router = express.Router();
// Inporta o controlador para as rotas user
const userController = require("../controllers/userController");

// Adiciona um titulo a galeria de usuario
router.delete('/:profileId/gallery/:titleId', userController.removeTitleFromUserGallery);

// Adiciona um titulo a galeria de usuario
router.post('/:profileId/gallery', userController.addTitleToUserGallery);

// Retona os titulos da galeria de usuario por pagina
router.get('/:profileId/gallery/:encodedParams/:page/:order', userController.galleryTitles);

// Retorna todos os titulos da galeria de usuario
router.get('/:profileId/gallery', userController.allGalleryTitleIds);

// Busca usuários
router.get('/find/:encodedParams', userController.findUser);

// Retorna um usuário por ID
router.get('/:id', userController.getUser);

// Insere um usuário
router.post('/', userController.createUser);

// Atualiza um usuário
router.put('/', userController.updateUser);

// Remove um usuário
router.delete('/:id', userController.removeUser);

module.exports = router;
