'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var config = require('./src/config/config');
var port = 3900;

mongoose.Promise = global.Promise;

//Conexion a la base de datos
console.log('mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.database);
mongoose.connect('mongodb://'+config.database.host+':'+config.database.port+'/'+config.database.database, {})
.then(()=>{
    console.log("Conectado a la base de datos...");
    //crear servidor
    app.listen(config.puerto, ()=>{
        console.log("Servidor en ejecucion en http://localhost:"+config.puerto);
    });
}).catch(err=>console.log(err));
