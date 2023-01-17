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
    // const jsonstr = "{where:" + JSON.stringify(params) + "}";
    // console.log("where =" + jsonstr);
    // return await db.Devices.findAll({where:{
    //     machinename:"Lathe-1"
    // }});
    return await db.Components.findAll({where: params});
}

async function getById(itemname) {
    return await get(itemname);
}

async function create(params) {

    const component = new db.Components(params);
    await component.save();
}

async function update(itemname, params) {
    const component = await get(itemname);
    // copy params to user and save
    Object.assign(component, params);
    await component.save();
}

async function _delete(itemname) {
    const component = await get(itemname);
    await component.destroy();
}

// helper functions

async function get(itemname) {
    const component = await db.Components.findByPk(itemname);
    if (!component) throw 'User not found';
    return component;
}
