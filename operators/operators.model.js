const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        _id: {type:DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
        position: { type: DataTypes.INTEGER, allowNull: false, unique:true, autoIncrement:true },
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