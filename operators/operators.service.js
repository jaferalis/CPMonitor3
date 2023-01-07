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
    return await db.Operators.findAll();
}

async function getById(id) {
    return await getOperator(id);
}

async function create(params) {


    const device = db.Operators.create(params);
    

}

async function update(id, params) {
    const operator = await getOperator(id);


    // copy params to operator and save
    Object.assign(operator[0], params);
    await operator[0].save();
}

async function _delete(id) {
    const operator = await getOperator(id);
    await operator[0].destroy();
}

// helper functions

async function getOperator(id) {
    const operator = [];
    operator.push(await db.Operators.findByPk(id));
    if (!operator) throw 'User not found';
    return operator;
}
