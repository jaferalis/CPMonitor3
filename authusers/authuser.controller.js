const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('../users/user.service');
const authService = require('./authuser.service');

userData= {
    "connection": "Username-Password-Authentication",
    "email": "abc1@hotmail.com",
    "name": "ghi",
    "password": "secret",
    "email_verified": true,
    "verify_email": true
}

// routes

router.get('/', getAll);
router.get('/:id', getById);
router.post('/',  create);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    console.log(req.body);
    //Update the userData for auth0 and create it
    userData.email = req.body.email;
    userData.name = req.body.name ;
    authService.create(userData)
        .then(function() {
          // res.json(user);

           //req.body.userid = resp.user_id;
            userService.create(req.body).then((user)=>{
           //  res.json({ message: 'User created' });
                // res.body = resp;
                res.send(user)
            })
        } )
        .catch(next);
}

function update(req, res, next) {
    //Update the userData for auth0 and send it
    userData.name = res.body.name;
    userData.email = res.body.email;
    // pass the auth0 id here not the user id of DB
    authService.update(req.params.id, userData)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    authService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.string().valid(Role.Admin, Role.User).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        firstName: Joi.string().empty(''),
        lastName: Joi.string().empty(''),
        role: Joi.string().valid(Role.Admin, Role.User).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
