const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('../users/user.service');
const authService = require('./authuser.service');



const ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient({
  domain: 'serverlessjaf.auth0.com',
  clientId: '3LTMUjQpdjHs2urxEVJ90jhxIuGUNXgG',  // API Explorer M2M application
  clientSecret: 'kg8bADadqUk8XeuHeHMpFiNlWpy2Jx8ksTD50eDzoNsVnR9c3JikEomOctXcJZMV', 
  scope: "read:users create:users delete:users" ,
  audience: 'https://serverlessjaf.auth0.com/api/v2/',
  tokenProvider: {
   enableCache: true,
   cacheTTLInSeconds: 10
 }
});

userData= {
    "connection": "Username-Password-Authentication",
    "email": "abc@hotmail.com",
    "name": "ghi",
    "password": "secret",
    "email_verified": true,
    "verify_email": true
};

updateData= {

    "email": "abc@hotmail.com",
    "name": "ghi"
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
    auth0.createUser(userData)
        .then(function(user) {
           req.body.userid = user.user_id;
            userService.create(req.body).then((user1)=>{
              res.send(user);             
            })
        } )
        .catch(next);
}

function update(req, res, next) {
    //Update the userData for auth0 and send it
    let _id = "auth0|" + req.params.id;

    auth0.updateUser({ id: _id }, req.body)
      .then(function (user) {
        userService.update(req.body).then(()=>{
            res.send(user);             
          })
      })
      .catch(next);   

}

function _delete(req, res, next) {
    let _id = "auth0|" + req.params.id;
    auth0.deleteUser({ id: _id })
      .then(function (user) {
        userService.delete(id).then(()=>res.json("User Deleted"))
        res.send(user);
      })
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
