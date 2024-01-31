'use strict';
const models = require('./../models');
var usuario = models.usuario;
var uuid = require('uuid');
const {validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');

class loginControl{

}

module.exports = loginControl;