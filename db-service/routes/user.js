var express = require("express");
var router = express.Router();
const { UserAccess } = require("../database");
// Inporta o controlador para as rotas user
const userController = require("../controllers/userController");

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
