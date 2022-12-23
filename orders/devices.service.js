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
    return await getUser(id);
}

async function create(params) {
    // validate
    // if (await db.Devices.findOne({ where: { email: params.email } })) {
    //     throw 'Email "' + params.email + '" is already registered';
    // }

    const device = new db.Devices(params);
    
    // hash password
    // user.passwordHash = await bcrypt.hash(params.password, 10);

    // save user
    await device.save();
}

async function update(id, params) {
    const user = await getDevice(id);

    // validate
    const emailChanged = params.email && user.email !== params.email;
    if (emailChanged && awaitdb.Devices.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" is already registered';
    }

    // hash password if it was entered
    if (params.password) {
        params.passwordHash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getDevice(id);
    await user.destroy();
}

// helper functions

async function getDevice(id) {
    const device = await db.Devices.findByPk(id);
    if (!device) throw 'User not found';
    return device;
}
