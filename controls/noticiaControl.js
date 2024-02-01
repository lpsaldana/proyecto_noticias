'use strict';
const models = require('./../models');
var noticia = models.noticia;
var usuario = models.usuario;
var uuid = require('uuid');

class noticiaControl {
    async listar(req, res) {
        const lista = await noticia.findAll({
            attributes: ['titulo', 'cuerpo', 'fecha', 'external', 'estado']
        });
        res.status(200);
        res.json({
            msg: "ok",
            code: 200,
            data: lista
        });
    }

    async listar_usuario(req, res){
        const auxU = await usuario.findOne({
            where:{external:req.params.external}
        });
        if(auxU){
            const lista = await noticia.findAll({
                attributes: ['titulo', 'cuerpo', 'fecha', 'external', 'estado'],
                where:{id_usuario:auxU.id}
            });
            res.status(200); 
            res.json({ msg:"ok", code:200, data:lista });
        }else{
            res.status(200);
            res.json({ msg:"ok", code:200, data:[] });
        }
    }

    async guardar(req, res) {
        let usuarioNoticia = await usuario.findOne({
            attributes: ['id'],
            where: { external: req.body.external }
        })
        if (usuarioNoticia) {
            const data = {
                titulo: req.body.titulo,
                cuerpo: req.body.cuerpo,
                fecha: req.body.fecha,
                external: uuid.v4(),
                id_usuario: usuarioNoticia.id
            };
            let noticiaCreada = await noticia.create(data);
            if (noticiaCreada) {
                res.status(200);
                res.json({
                    msg: "ok",
                    code: 200,
                    data: "Se ha registrado la noticia"
                });
            } else {
                res.status(400);
                res.json({
                    msg: "Solucitud no válida",
                    code: 400,
                    data: "No se ha registrado la noticia"
                });
            }
        }else{
            res.status(400);
            res.json({
                msg: "Solucitud no válida",
                code: 400,
                data: "No se ha encontrado el usuario"
            });
        }

    }
    async buscar(req, res){
        const noticiaEncontrada = await noticia.findOne({
            attributes:['titulo', 'cuerpo', 'fecha', 'external', 'estado'],
            where:{external:req.params.external}
        });
        if(noticiaEncontrada){
            res.status(200);
            res.json({
                msg:"ok",
                code:200,
                data:noticiaEncontrada
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
        const noticiaEncontrada = await noticia.findOne({
            where:{external:req.body.external}
        });
        if(noticiaEncontrada){
            noticiaEncontrada.titulo = req.body.titulo?req.body.titulo:noticiaEncontrada.titulo;
            noticiaEncontrada.cuerpo = req.body.cuerpo?req.body.cuerpo:noticiaEncontrada.cuerpo;
            noticiaEncontrada.external = uuid.v4(); 
            const noticiaGuardada = noticiaEncontrada.save();
            if(!noticiaGuardada){
                res.status(400);
                res.json({
                    msg:"Solicitud no válida",
                    code:400,
                    data:'No se logró modificar la noticia'
                });
            }else{
                res.status(200);
                res.json({
                    msg:"ok",
                    code:200,
                    data:'Noticia Modificada'
                });
            }
        }else{
            res.status(400);
            res.json({
                msg:"Solicitud no válida",
                code:400,
                data:'Noticia no encontrada'
            });
        }
    }
}

module.exports = noticiaControl;