'use strict'
var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');

function home (req,res){
	res.status(200).send({
		mensaje: 'Hola desde el controlador de usuario'
	});
}

function crearUsuario(req, res){
    var params = req.body;
    var nuevoUsuario = Usuario();
    if(params.nombre && params.apellidos && params.usuario && params.correo && params.clave){
        nuevoUsuario.nombre = params.nombre;
        nuevoUsuario.apellidos = params.apellidos;
        nuevoUsuario.usuario = params.usuario;
        nuevoUsuario.correo = params.correo;
        nuevoUsuario.rol = 'administrador';
        nuevoUsuario.imagen = null;
    
    //controlar usuarios duplicados

        Usuario.find({$or:[
            {correo:nuevoUsuario.correo.toLowerCase()},
            {usuario:nuevoUsuario.usuario.toLowerCase()}
        ]}).exec((err, usuariosRes)=>{
            
            if(err) return res.status(500).send({mensaje: 'Error en la petición'});
            
            if(usuariosRes && usuariosRes.length>=1){
                return res.status(200).send({mensaje:'el usuario ya existe'});
            }else{
                //cifrar la clave que esta en params.csublave y guardar los datos
                bcrypt.hash(params.clave,null, null, (err, claveHash)=>{
                    nuevoUsuario.clave = claveHash;
                    //guardar los datos en MongoDB
                    nuevoUsuario.save((err, usuarioGuardado)=>{
                        if(err) return res.status(500).send({mensaje:'Error al guardar al nuevo usuario'});
                        if(usuarioGuardado){
                            res.status(201).send({nuevoUsuario});
                        }else{
                            res.status(404).send({mensaje: 'no de ha guardado el usuario'});
                        }
                    });
                });
            }
        });
        
    }else{
        res.status(200).send({mensaje:'envie todos los datos...'});
    }
}
function loginUsuario(req, res){
    var params = req.body;
    var correo = params.correo;
    var clave = params.clave;

    Usuario.findOne({correo:correo}, (err, usuarioResult)=>{
        
        if(err) return res.status(500).send({mensaje:'Error en la peticion'});
        
        if(usuarioResult){
            bcrypt.compare(clave, usuarioResult.clave,(err, verificador)=>{
                
                if(err) return res.status(500).send({mensaje:'Error en la peticion de comparacion'});

                if(verificador){
                    if(params.obtenertoken){
                        //generar y devolver token
                        return res.status(200).send({
                            token:jwt.createToken(usuarioResult)
                        });
                    }else{
                        usuarioResult.clave=undefined;
                        return res.status(200).send(usuarioResult);
                    }
                }else{
                    return res.status(404).send({mensaje:'El usuario no de ha podido identificar datos erroneos'});
                }
            });
        }else{
            return res.status(404).send({mensaje:'Problemas al identificar al usuario'});
        }
    });
}
module.exports={
    home, 
    crearUsuario,
    loginUsuario
}