'use strict'
var mongoose = require('mongoose');
var Esquema = mongoose.Schema; 
var usuarioEsquema = Esquema({
    nombre : String,
    apellidos : String,
    usuario : String,
    correo : String,
    clave : String,
    rol : String,
    imagen : String
});

//en la base de daros aparecera como 'users' en minuscula y plural
module.exports=mongoose.model('User', usuarioEsquema);