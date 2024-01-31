'use strict';
const models = require('./../models');
var usuario = models.usuario;
var uuid = require('uuid');

class usuarioControl{
    async listar(req, res){
        const lista = await usuario.findAll({
            attributes:['nombre','correo','external','estado']
        });
        res.status(200);
        res.json({
            msg:"ok",
            code:200,
            data:lista
        });
    }
    async guardar(req, res){
        const data = {
            nombre: req.body.nombre,
            clave: req.body.clave,
            correo: req.body.correo,
            external: uuid.v4()
        };
        let usuarioCreado = await usuario.create(data);
        if(usuarioCreado){
            res.status(200);
            res.json({
                msg:"ok",
                code:200,
                data:"Se ha registrado"
            });
        }else{
            res.status(400);
            res.json({
                msg:"Solucitud no válida",
                code:400,
                data:"No se ha registrado"
            });
        }
    }
    async buscar(req, res){
        const usuarioEncontrado = await usuario.findOne({
            attributes:['nombre','correo','external','estado'],
            where:{external:req.params.external}
        });
        if(usuarioEncontrado){
            res.status(200);
            res.json({
                msg:"ok",
                code:200,
                data:usuarioEncontrado
            });
        }else{
            res.status(400);
            res.json({
                msg:"Solicitud no válida",
                code:400,
                data:[]
            });
        }
    }

    async actualizar(req, res){
        const usuarioEncontrado = await usuario.findOne({
            where:{external:req.body.external}
        });
        if(usuarioEncontrado){
            usuarioEncontrado.nombre = req.body.nombre;
            usuarioEncontrado.external = uuid.v4(); 
            const usuarioGuardado = usuarioEncontrado.save();
            if(!usuarioGuardado){
                res.status(400);
                res.json({
                    msg:"Solicitud no válida",
                    code:400,
                    data:'No se logró modificar el usuario'
                });
            }else{
                res.status(200);
                res.json({
                    msg:"ok",
                    code:200,
                    data:'Usuario Modificado'
                });
            }
        }else{
            res.status(400);
            res.json({
                msg:"Solicitud no válida",
                code:400,
                data:'Usuario no encontrado'
            });
        }
    }
}

module.exports = usuarioControl;