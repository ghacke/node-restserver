const express = require('express');
const _ = require('underscore');

const { vertificaToken, verificaRolAdmin } = require('../middlewares/autenticacion');

const app = express();

let Categoria = require('../models/categoria');

// ===================================
// Listar todas las categorias
// ===================================
app.get('/categoria', vertificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    cuantos: conteo,
                    categorias
                });
            });
        })

});

// ===================================
// Mostrar una taregoria por ID
// ===================================
app.get('/categoria/:id', vertificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: 'El ID no es valido.'
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


// ===================================
// Crear nueva categoria
// ===================================
app.post('/categoria', [vertificaToken, verificaRolAdmin], (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

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
    });
});

// ===================================
// Actualiza una categoria
// ===================================
app.put('/categoria/:id', [vertificaToken, verificaRolAdmin], (req, res) => {

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
    });
});

// ===================================
// Borra una categoria
// ===================================
app.delete('/categoria/:id', [vertificaToken, verificaRolAdmin], (req, res) => {

    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
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
    });
});

module.exports = app;