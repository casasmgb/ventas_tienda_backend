'use strict'

var express = require('express');
var usuarioController = require('../controllers/usuarioController');

var api = express.Router();

api.get('/home', usuarioController.home);
api.post('/usuario', usuarioController.crearUsuario);
api.post('/login', usuarioController.loginUsuario);

module.exports = api;