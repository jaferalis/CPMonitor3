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

    return await db.ProdComps.findAll({where: params});    
}

async function getById(id) {
    return await get(id);
}

async function create(params) {

    return await db.ProdComps.create(params);
}

async function update(id, params) {
    const prodcomp = await get(id);
    // copy params to user and save
    Object.assign(prodcomp, params);
    await prodcomp.save();
}

async function _delete(id) {
    const prodcomp = await get(id);
    await prodcomp.destroy();
}

// helper functions

async function get(id) {
    const prodcomp = await db.ProdComps.findByPk(id);
    if (!prodcomp) throw 'User not found';
    return prodcomp;
}
