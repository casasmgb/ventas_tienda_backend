'use strict'
var express = require('express');
var productoController = require('../controllers/productoController');
var md_autenticar=require('../middlewares/autenticar');
 var api = express.Router();

 api.get('/homeProducto', md_autenticar.authSeguro,productoController.productoHome);
 api.post('/producto',md_autenticar.authSeguro,productoController.guardarProducto);
 api.get('/producto/:id',md_autenticar.authSeguro,productoController.getProducto);
 api.get('/productos/:pagina/:items?',md_autenticar.authSeguro,productoController.listarProductos);
 module.exports = api;