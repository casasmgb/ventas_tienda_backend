'use strict'
var mongoose = require('mongoose');
var Esquema = mongoose.Schema;
var productoEsquema = ({
    nombre : String,
    descripcion : String,
    estado : String,
    precioBOB : String,
    precioUSD : String,
    imagen : String,
    usuario : String,
    fecha : String
});

module.exports=mongoose.model('Producto', productoEsquema);