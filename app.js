'use strict'
//express para manejar http
var express=require('express');
//convertir body de peticiones a objeto
var bodyParser = require('body-parser');

var app = express();
//cargar rutas
var usuarioRoutes = require('./src/routes/usuarioRoute');
var productoRoutes = require('./src/routes/productoRoute');

//cargar middlewares
//metodo que se ejecuta antes de lleggar al controlador.
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

//cors

//rutas
	//permite usar localhost:3800/api/home
	//permite usar localhost:3800/api/pruebas
app.use('/api',usuarioRoutes);
app.use('/api',productoRoutes);
//exportar
module.exports=app;
 //cambio hacia git 

