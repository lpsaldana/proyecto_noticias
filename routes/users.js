var express = require('express');
var router = express.Router();

const usuarioA = require('../controls/usuarioControl');
const noticiaA = require('../controls/noticiaControl');
const usuarioControl = new usuarioA();
const noticiaControl = new noticiaA();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/admin/usuarios', usuarioControl.listar);

router.post('/admin/usuarios/guardar', usuarioControl.guardar);
router.get('/admin/usuarios/:external', usuarioControl.buscar);
router.post('/admin/usuarios/modificar', usuarioControl.actualizar);

router.get('/admin/noticias', noticiaControl.listar);
router.post('/admin/noticias/guardar', noticiaControl.guardar);
router.get('/admin/noticias/:external', noticiaControl.buscar);
router.post('/admin/noticias/modificar', noticiaControl.actualizar);
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
