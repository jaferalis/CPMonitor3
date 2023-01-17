const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const componentService = require('./component.service');

// routes

router.get('/', getAll);
router.get('/:itemname', getById);
router.post('/',  create);
router.put('/:itemname',  update);
router.delete('/:itemname', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    const queryParams = {};
    for (const key in req.query) {
      queryParams[key] = req.query[key];
    }    
    componentService.getAll(queryParams)
        .then(devices => res.json(devices))
        .catch(next);
}

function getById(req, res, next) {
    componentService.getById(req.params.itemname)
        .then(device => res.json(device))
        .catch(next);
}

function create(req, res, next) {
    console.log(req.body);
    componentService.create(req.body)
        .then(() => res.json({ message: 'record created' }))
        .catch(next);
}

function update(req, res, next) {
    componentService.update(req.params.itemname, req.body)
        .then(() => res.json({ message: 'record updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    componentService.delete(req.params.itemname)
        .then(() => res.json({ message: 'record deleted' }))
        .catch(next);
}

