'use strict'
var mongoose = require('mongoose');
var Esquema = mongoose.Schema;
var libretaEsquema = ({
    venta: {type: schema.ObjectId, ref:'Venta'},
    montoObjetivo : Number,
    fecha_creacion : Date,
    cuota_mensual: Number
});

module.exports=mongoose.model('Venta', ventaEsquema);