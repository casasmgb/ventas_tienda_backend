'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret='clave**secreta**para**el**token**de**usuario';

//parametro next es un metodo para cargar un algo segun la verificacion del token
exports.authSeguro = function(req, res, next){
	if (!req.headers.authorization) {
		return res.status(403).send({message:'La petición no tiene la cabecera de autenticación'});
	}
	var token= req.headers.authorization.replace(/['"]+/g,'')
	try{
		var payload = jwt.decode(token, secret);
		if (payload.exp<=moment().unix()) {
			return res.status(401).send(
				{
					message:'El token a expirado'
				}
			);
		}
	}catch(ex){
		return res.status(401).send(
			{
				message:'El token no es valido... '+ex
			}
		);
	}
	req.usuario=payload;
	next();
}
