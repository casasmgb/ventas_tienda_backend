'use strict'
var Producto = require('../models/producto');
var moment = require('moment');
var mongoosePaginate = require('mongoose-pagination');

function productoHome(req, res){
    console.log("Usuario de Productos");
    console.log(req.usuario)  
    res.status(200).send({
        mensaje: 'hola desde el controlar de producto'
    });
}

function guardarProducto(req, res) {
    var params = req.body;
    var userId = req.usuario.id_u;

    if (params.nombre && params.descripcion && params.precioBOB) {
        var producto = new Producto();
        producto.nombre = params.nombre;
        producto.descripcion = params.descripcion;
        producto.estado = params.estado || 'activo';
        producto.precioBOB = params.precioBOB;
        producto.precioUSD = params.precioUSD || '0.0';
        producto.imagen = null || params.imagen;
        producto.usuario = userId;
        producto.fecha = moment().unix();

        Producto.find({ nombre: producto.nombre }).exec((err, productoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de producto' });
            if (productoEncontrado && productoEncontrado.length >= 1) {
                console.log("###EXISTE### "+ productoEncontrado);
                return res.status(200).send({ mensaje: 'El producto ya existe cambie de nombre' });
            } else {
                producto.save((err, productoGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion de guardar producto' });
                    if (productoGuardado) {
                        console.log('Producto Registrado');
                        console.log({ producto: productoGuardado});
                        return res.status(201).send({ producto: productoGuardado });
                    } else {
                        res.status(404).send({ mensaje: 'no se ha registrado el producto' });
                    }
                });
            }

        });
    } else {
        return res.status(200).send({ mensaje: '¡¡¡ debe enviar por lo menos nombre, descripcion y precio !!!' });
    }
}

function getProducto(req, res) {

    if (req.params.id) {

        Producto.findById(req.params.id, (err, productoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion, envie un id de producto' });
            if (productoEncontrado) {
                res.status(200).send({ product: productoEncontrado });
            } else {
                return res.status(404).send({ mensaje: 'no se encontro el producto' });
            }
        });
    } else {
        return res.status(200).send({ mensaje: "¿? dime que buscar" });
    }
}
//Listar por categorias
//Listar por usuario

function listarProductos(req, res) {
    var pagina = 1;
    var itemsPorPg = 4;
    if (req.params.pagina) pagina = req.params.pagina;
    if (req.params.items) itemsPorPg = Number(req.params.items);
    
    Producto.find({}).paginate(pagina, itemsPorPg,(err, productos, total)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de busqueda'});
        if(!productos) return res.status(200).send({mensaje:'no hay productos para mostrar'});
        return res.status(200).send({
            total,
            paginas:Math.ceil(total/itemsPorPg),
            productos
        }); 
    });

}

module.exports={
    productoHome,
    guardarProducto,
    getProducto,
    listarProductos
}