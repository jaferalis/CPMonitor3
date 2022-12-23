const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Devices.findAll();
}

async function getById(id) {
    return await getDevice(id);
}

async function create(params) {
    // validate

    const device = new db.Devices(params);
    
    // save user
    await device.save();
}

async function update(id, params) {
    const user = await getDevice(id);

    // copy params to user and save
    Object.assign(user[0], params);
    await user[0].save();
}

async function _delete(id) {
    const user = await getDevice(id);
    await user.destroy();
}

// helper functions

async function getDevice(id) {
    const device = [];
     device.push(await db.Devices.findByPk(id));
    if (!device) throw 'User not found';
    return device;
}
