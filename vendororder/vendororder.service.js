const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(params) {

    return await db.VendorOrders.findAll({where: params});    
}

async function getById(id) {
    return await get(id);
}

async function create(params) {

    return await db.VendorOrders.create(params);
}

async function update(id, params) {
    const vendororder = await get(id);
    // copy params to user and save
    Object.assign(vendororder, params);
    await vendororder.save();
}

async function _delete(id) {
    const vendororder = await get(id);
    await vendororder.destroy();
}

// helper functions

async function get(id) {
    const vendororder = await db.VendorOrders.findByPk(id);
    if (!vendororder) throw 'User not found';
    return vendororder;
}
