const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        _id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true, startAt:1},
        name: { type: DataTypes.STRING, allowNull: false },
        joindate: { type: DataTypes.DATE, allowNull: false },
        phonenumber: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        defaultScope: {
          
        },
        scopes: {

        }
    };

    return sequelize.define('Operators', attributes, options);
}