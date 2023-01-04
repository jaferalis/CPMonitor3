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
    return await db.Machines.findAll();
}

async function getById(id) {
    return await getMachine(id);
}

async function create(params) {
    // validate
    // if (await db.Machines.findOne({ where: { email: params.email } })) {
    //     throw 'Email "' + params.email + '" is already registered';
    // }

    const machine = db.Machines.create(params);
    
    // hash password
    // machine.passwordHash = await bcrypt.hash(params.password, 10);

    // save machine
    // await machine.save();
}

async function update(id, params) {
    const machine = await getMachine(id);

    // copy params to machine and save
    Object.assign(machine[0], params);
    await machine[0].save();
}

async function _delete(id) {
    const machine = await getMachine(id);
    await machine[0].destroy();
}

// helper functions

async function getMachine(id) {
    const machine = [];
    machine.push(await db.Machines.findByPk(id));
    if (!machine) throw 'User not found';
    return machine;
}
