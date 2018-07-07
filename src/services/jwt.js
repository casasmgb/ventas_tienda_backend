'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave**secreta**para**el**token**de**usuario';

exports.createToken=function(usuario){
    //datos para encriptar en el token
    var payload={
        sub : usuario._id,
        nombre : usuario.nombre,
        apellidos : usuario.apellidos,
        correo : usuario.correo,
        usuario : usuario.usuario,
        rol : usuario.rol,
        iat : moment().unix,
        exp : moment().add(3, 'days').unix
    };
    return jwt.encode(payload, secret);
}