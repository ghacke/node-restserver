const express = require('express');

const Producto = require('../models/producto');
const { vertificaToken, verificaRolAdmin } = require('../middlewares/autenticacion');

const app = express();

// ===================================
// Listar todas los productos
// ===================================
app.get('/producto', vertificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .sort('nombre')
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.count({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios
                });
            });
        })
});

// ===================================
// Mostrar un productos
// ===================================
app.get('/producto/:id', vertificaToken, (req, res) => {
    // populate: usuario, categoria

    let id = req.params.id;

    Producto.find({ _id: id })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, usuarioDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.json({
                ok: true,
                usuario: usuarioDB[0]
            });
        })
});

// ===================================
// Buscar productos
// ===================================
app.get('/producto/buscar/:termino', vertificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                productos
            });
        })
});

// ===================================
// Crear un producto
// ===================================
app.post('/producto', [vertificaToken, verificaRolAdmin], (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario,
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

// ===================================
// Actualiza un producto
// ===================================
app.put('/producto/:id', [vertificaToken, verificaRolAdmin], (req, res) => {
    /*
        let id = req.params.id;
        let body = _.pick(req.body, ['descripcion']);

        Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categoria: categoriaDB
            });
        });*/
});

// ===================================
// Borra un  producto
// ===================================
app.delete('/producto/:id', [vertificaToken, verificaRolAdmin], (req, res) => {

    let id = req.params.id;

    let cambiaEstado = {
        disponible: false
    }

    Producto.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});



module.exports = app;