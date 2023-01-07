const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getCount
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

    await db.User.create(params);
    
}

async function update(email, params) {
    const user = await getUser(email);

    // copy params to user and save
    Object.assign(user, params);
    await user.save();
}

async function _delete(email) {
    const user = await getUser(email);
    await user.destroy();
}

// helper functions

async function getUser(email) {
    const user = await db.User.findByPk(email);
    if (!user) throw 'User not found';
    return user;
}

async function getCount() {
    const count = await db.User.count();
    return count;
}