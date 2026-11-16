var express = require('express');
var router = express.Router();
var controller = require('../controller/controllerOficina.js');

router.get('/', controller.home);
router.get('/abertas', controller.inscricoesAbertas);
router.get('/sobre', controller.sobre);
router.get('/cria', controller.cria_get);
router.post('/cria', controller.cria_post);
router.get('/consulta/:id', controller.consulta);
router.get('/altera/:id', controller.altera_get);
router.post('/altera/:id', controller.altera_post);
router.get('/alterna/:id', controller.alterna);
router.get('/deleta/:id', controller.deleta);
router.get('/pesquisa', controller.pesquisa_get);
router.post('/pesquisa', controller.pesquisa_post);

module.exports = router;