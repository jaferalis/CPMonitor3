const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(queryString) {
    if (Object.keys(queryString).length === 0)
    {
        return await db.User.findAll();
    }
    else
    {
        return await db.User.findAll({
            where:  queryString
        });
    }
    
}

async function getById(id) {
    return await getUser(id);
}

async function create(params) {

    db.User.create(params);
    
}

async function update(id, params) {
    const user = await getUser(id);

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}
