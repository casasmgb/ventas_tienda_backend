'use strict'
var mongoose = require('mongoose');
var Esquema = mongoose.Schema;
var clienteEsquema = ({
    nombre : String,
    apellidos : String,
    correo : String,
    imagen : String
});

module.exports=mongoose.model('Cliente', clienteEsquema);