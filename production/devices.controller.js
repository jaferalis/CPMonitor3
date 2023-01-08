const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const devicesService = require('./devices.service');
const { DataTypes } = require('sequelize');
const jwtService = require('../authusers/auth.controller');


// routes

router.get('/', getAll);
router.get('/:id', getById);
router.get('/count/count',getCount);
router.post('/',  create);
router.put('/:id',  update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    devicesService.getAll()
        .then(devices => res.json(devices))
        .catch(next);
}

function getById(req, res, next) {
    devicesService.getById(req.params.id)
        .then(device => res.json(device))
        .catch(next);
}

function create(req, res, next) {
    console.log(req.body);
    req.body.position=0;
    req.body.date =Date.now();
    devicesService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    devicesService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'DEvice updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    devicesService.delete(req.params.id)
        .then(() => res.json({ message: 'Device deleted' }))
        .catch(next);
}

function getCount(req, res, next) {
    devicesService.getCount().then(count=>{
         res.json( {count} );
     });
 }
// schema functions

// function createSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().required(),
//         firstName: Joi.string().required(),
//         lastName: Joi.string().required(),
//         role: Joi.string().valid(Role.Admin, Role.User).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).required(),
//         confirmPassword: Joi.string().valid(Joi.ref('password')).required()
//     });
//     validateRequest(req, next, schema);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         title: Joi.string().empty(''),
//         firstName: Joi.string().empty(''),
//         lastName: Joi.string().empty(''),
//         role: Joi.string().valid(Role.Admin, Role.User).empty(''),
//         email: Joi.string().email().empty(''),
//         password: Joi.string().min(6).empty(''),
//         confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
//     }).with('password', 'confirmPassword');
//     validateRequest(req, next, schema);
// }
