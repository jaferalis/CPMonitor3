const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('../users/user.service');
const authService = require('./authuser.service');
const authconfig = require('auth.json');



const ManagementClient = require('auth0').ManagementClient;
var auth0 = new ManagementClient(authconfig.auth0);

userData= {
    "connection": "Username-Password-Authentication",
    "email": "abc@hotmail.com",
    "name": "ghi",
    "password": "secret",
    "email_verified": true,
    "verify_email": true
};

updateData= {

    "connection": "Username-Password-Authentication",
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
    //let _id = "auth0|" + req.params.id;
    // get the user from the id
    let _id = "";
    userService.getById(req.params.id).then((user)=>{
        console.log(user);
        //get the auth0 id
        _id = user.userid;
       // res.send(user);
       updateData.name = req.body.name;
        auth0.updateUser({ id: _id }, updateData)
        .then(function (user) {
          userService.update(req.params.id, req.body).then(()=>{
              res.send("user Updated");             
            })
        })
        .catch(next);          
    });

 

}

function _delete(req, res, next) {
   // let _id = "auth0|" + req.params.id;
    let _id = "";
    console.log(req.params.id);
    userService.getById(req.params.id).then((user)=>{
        //get the auth0 id
        console.log(user);
        _id = user.userid;
        auth0.deleteUser({ id: _id })
        .then(function (user) {
          userService.delete(req.params.id).then(()=>res.json("User Deleted"))
         // res.send(user);
        })
        .catch(next);        
    });    
    // console.log( "id for auth0:" + _id);



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
