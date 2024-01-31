'use strict';
const models = require('./../models');
var usuario = models.usuario;
var uuid = require('uuid');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

class loginControl {
    async iniciarSesion(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            //buscar por correo o usuario
            const user = await usuario.findOne({
                where: { correo: req.body.correo }
            });
            if (user) {
                if (user.clave === req.body.clave) {
                    if (user.estado) {
                        const data = {
                            external: user.external,
                            nombre: user.nombre,
                            check: true
                        };
                        require('dotenv').config();
                        const llave = process.env.KEY;
                        const token = jwt.sign(data, llave, { expiresIn: '12h' });
                        const data1 = {
                            external: user.external,
                            nombre: user.nombre,
                            token: token
                        };
                        res.status(200);
                        res.json({
                            msg: "ok",
                            code: 200,
                            data: data1
                        });
                    } else {
                        res.status(400);
                        res.json({ msg: "Solucitud no válida", code: 400, data: "Cuenta no activa" });
                    }
                } else {
                    res.status(400);
                    res.json({ msg: "Solucitud no válida", code: 400, data: "Clave incorrecta" });
                }
            } else {
                res.status(400);
                res.json({ msg: "Solucitud no válida", code: 400, data: "Usuario no encontrado" });
            }
        } else {
            res.status(400);
            res.json({ msg: "error", code: 400, data: errors });
        }
    }
}

module.exports = loginControl;