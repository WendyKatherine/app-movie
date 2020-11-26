'use strict'

var express = require('express');
var MovieController = require('../controllers/movie');

var router = express.Router();

//middleWare, se ejecuta antes de la accion del controlador
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', MovieController.home);
router.post('/test', MovieController.test);
router.post('/save-movie', MovieController.saveMovie);
router.get('/movie/:id?', MovieController.getMovie);
router.get('/movies', MovieController.getMovies);
router.put('/movie/:id', MovieController.updateMovie); //para actualizar
router.delete('/movie/:id', MovieController.deleteMovie); //para actualizar
router.post('/upload-image/:id', multipartMiddleware, MovieController.uploadImage);
router.get('/get-image/:image', MovieController.getImageFile);

module.exports = router;

