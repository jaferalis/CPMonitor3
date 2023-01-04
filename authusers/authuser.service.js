

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
}

module.exports = {
  // getAll,
  // getById,
  create,
  update,
  delete: _delete
};


 async function create(userData) {
    let userResp;
    auth0.createUser(userData);
    //   .then(function (user) {
    //     userResp = user;
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
    // return userResp;
  }

  async function update(id, body) {
    let updateData = {
      "connection": "Username-Password-Authentication",
      "name": "ghi",
    };
    let userResp;
    updateData.name = body.name;
    auth0.updateUser({ id: id }, updateData)
      .then(function (user) {
        userResp = user;
      })
      .catch(function (err) {
        console.log(err);
      });
    return userResp;
  }

  async function _delete(id){
    const userid = '63992192815c1303759569d1'
    var res = false;
    auth0.deleteUser({ id: id })
      .then(function () {
        res = true;
      })
      .catch(function () {

      });
      return res;
  }
