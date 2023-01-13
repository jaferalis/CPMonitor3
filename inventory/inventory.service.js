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
    return await db.Inventories.findAll();
}

async function getById(id) {
    return await get(id);
}

async function create(params) {

    const inventory = new db.Inventories(params);
    await inventory.save();
}

async function update(id, params) {
    const inventory = await get(id);
    // copy params to user and save
    Object.assign(inventory, params);
    await inventory.save();
}

async function _delete(id) {
    const inventory = await get(id);
    await inventory.destroy();
}

// helper functions

async function get(id) {
    const inventory = await db.Inventories.findByPk(id);
    if (!inventory) throw 'User not found';
    return inventory;
}
