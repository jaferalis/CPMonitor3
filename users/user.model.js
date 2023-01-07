const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        _id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true, startAt:1},
        email: { type: DataTypes.STRING, allowNull: false},
        name: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: false },
        userid: {type:DataTypes.STRING, allowNull:false}
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
           // attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}