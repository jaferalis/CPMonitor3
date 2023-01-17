const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const prodcompService = require('./prodcomp.service');

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/',  create);
router.put('/:id',  update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    const queryParams = {};
    for (const key in req.query) {
      queryParams[key] = req.query[key];
    }    
    prodcompService.getAll(queryParams)
        .then(devices => res.json(devices))
        .catch(next);
}

function getById(req, res, next) {
    prodcompService.getById(req.params.id)
        .then(device => res.json(device))
        .catch(next);
}

function create(req, res, next) {
    console.log(req.body);
    prodcompService.create(req.body)
        .then((result) => res.json(result))
        .catch(next);
}

function update(req, res, next) {
    prodcompService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'record updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    prodcompService.delete(req.params.id)
        .then(() => res.json({ message: 'record deleted' }))
        .catch(next);
}

