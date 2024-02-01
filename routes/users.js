var express = require('express');
var router = express.Router();
const {body} = require('express-validator');
let jwt = require('jsonwebtoken');

const usuarioA = require('../controls/usuarioControl');
const noticiaA = require('../controls/noticiaControl');
const loginA = require('../controls/loginControl');
const usuarioControl = new usuarioA();
const noticiaControl = new noticiaA();
const loginControl = new loginA();

var auth = function middleware(req, res, next){
  const token = req.headers["api-token"];
  console.log(token);
  if(!token){
    res.status(403);
    res.json({ msg: "Solucitud no válida", code: 403, data: "No se envió token" });
  }else{
    require('dotenv').config();
    const llave = process.env.KEY;
    jwt.verify(token,llave,async(err,decoded)=>{
      if(err){
        res.status(401);
        res.json({ msg: "Solucitud no válida", code: 401, data: "Token no válido", error:err });
      }else{
        const models = require('./../models');
        var usuario = models.usuario;
        const auxU = await usuario.findOne({
          where:{external:decoded.external}
        });
        if(!auxU){
          res.status(401);
          res.json({ msg: "Solucitud no válida", code: 401, data: "Token no válido" });
        }else{
          next();
        }
      }
    });
  }
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/admin/usuarios', auth, usuarioControl.listar);

router.post('/admin/usuarios/guardar', [body('nombre','ingrese un nombre válido').trim().exists().not().isEmpty(), body('correo','ingrese un correo válido').trim().exists().not().isEmpty().isEmail(), body('clave','ingrese una clave válida').trim().exists().not().isEmpty()], usuarioControl.guardar);
router.get('/admin/usuarios/:external', usuarioControl.buscar);
router.post('/admin/usuarios/modificar', usuarioControl.actualizar);

router.get('/admin/noticias', noticiaControl.listar);
router.post('/admin/noticias/guardar', noticiaControl.guardar);
router.get('/admin/noticias/:external', noticiaControl.buscar);
router.post('/admin/noticias/modificar', noticiaControl.actualizar);
router.get('/admin/noticias/user/:external', auth, noticiaControl.listar_usuario);

router.post('/login',[body('correo','ingrese un correo válido').trim().exists().not().isEmpty().isEmail(), body('clave','ingrese una clave válida').trim().exists().not().isEmpty()], loginControl.iniciarSesion);
/*
router.get('/inicio/:a/:b', function(req, res, next) {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  const c = a + b;
  res.send("<span>Suma = "+c+"</span>");
});

router.post('/inicio', function(req, res, next) {
  const a = Number(req.body.a);
  const b = Number(req.body.b);
  const c = a + b;
  const data = {
    respuesta: c
  };
  res.json(data);
});

router.get('/multiplyThreeNumbers/:n1/:n2/:n3',function(req,res,next){
  const n1 = req.params.n1*1;
  const n2 = req.params.n2*1;
  const n3 = req.params.n3*1;
  const response = n1 * n2 * n3;
  res.send('La respuesta de la multiplicación es: ' + response);
});

router.post('/multiplyThreeNumbers/',function(req,res,next){
  const n1 = req.body.n1*1;
  const n2 = req.body.n2*1;
  const n3 = req.body.n3*1;
  const mult = n1 * n2 * n3;
  const response = {
    'data' : mult
  }
  res.json(response)
});

router.get('/userRegistration/:name/:lastname/:email/:phone',function(req,res,next){
  const name = req.params.name;
  const lastname = req.params.lastname;
  const email = req.params.email;
  const phone = req.params.phone;
  res.send('Nombres: '+name+' '+lastname+' Email: '+email+' Celular: '+phone);
});

router.post('/userRegistration',function(req,res,next){
  const response = {
    'nombre':  req.body.name,
    'apellido': req.body.lastname,
    'correo': req.body.email,
    'celular': req.body.phone
  }
  console.log(response);
  res.json(response);
});
*/
module.exports = router;
