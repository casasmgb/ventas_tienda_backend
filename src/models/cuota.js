'use strict'
var mongoose = require('mongoose');
var Esquema = mongoose.Schema;
var cuotaEsquema = ({
    libreta: {type: schema.ObjectId, ref:'Libreta'},
    monto : String,
    fecha_pago : Date
});

module.exports=mongoose.model('Cliente', ventaEsquema);