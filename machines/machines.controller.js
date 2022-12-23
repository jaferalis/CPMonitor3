const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const machinesService = require('./machines.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/',  create);
router.put('/:id',  update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    machinesService.getAll()
        .then(machines => res.json(machines))
        .catch(next);
}

function getById(req, res, next) {
    machinesService.getById(req.params.id)
        .then(machine => res.json(machine))
        .catch(next);
}

function create(req, res, next) {
    console.log(req.body);
    req.body.position=0;
    machinesService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    console.log(req.body);
    machinesService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'machine updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    machinesService.delete(req.params.id)
        .then(() => res.json({ message: 'machine deleted' }))
        .catch(next);
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
