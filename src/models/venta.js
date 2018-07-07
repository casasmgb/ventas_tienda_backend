'use strict'
var mongoose = require('mongoose');
var Esquema = mongoose.Schema;
var ventaEsquema = ({
    cliente: {type: schema.ObjectId, ref:'Cliente'},
    producto: {type: schema.ObjectId, ref:'Producto'},
    monto : String,
    estado: String, //Cancelado, contado, credito
    fecha_venta : Date
});

module.exports=mongoose.model('Venta', ventaEsquema);