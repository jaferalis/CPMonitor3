const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const inventoryService = require('./inventory.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/',  create);
router.put('/:id',  update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    inventoryService.getAll()
        .then(devices => res.json(devices))
        .catch(next);
}

function getById(req, res, next) {
    inventoryService.getById(req.params.id)
        .then(device => res.json(device))
        .catch(next);
}

function create(req, res, next) {
    console.log(req.body);
    inventoryService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    inventoryService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'DEvice updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    inventoryService.delete(req.params.id)
        .then(() => res.json({ message: 'Device deleted' }))
        .catch(next);
}

