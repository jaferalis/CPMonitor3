const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getCount,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(params) {
    //get the query params and form the query here.
    // const {where} =  params;
    const jsonstr = "{where:" + JSON.stringify(params) + "}";
    console.log("where =" + jsonstr);
    // return await db.Devices.findAll({where:{
    //     machinename:"Lathe-1"
    // }});
    return await db.Devices.findAll({where: params});
}

async function getById(id) {
    return await getDevice(id);
}

async function create(params) {
    // validate
    //Need to change db.Devices(params) to db.Devices.create(params)
    const device = db.Devices.create(params);
    
    // save user
    // await device.save();
}

async function update(id, params) {
    const user = await getDevice(id);

    // copy params to user and save
    Object.assign(user[0], params);
    await user[0].save();
}

async function _delete(id) {
    const user = await getDevice(id);
    await user[0].destroy();
}

// helper functions

async function getDevice(id) {
    const device = [];
     device.push(await db.Devices.findByPk(id));
    if (!device) throw 'User not found';
    return device;
}

async function getCount() {
    const count = await db.Devices.count();
    return count;
}