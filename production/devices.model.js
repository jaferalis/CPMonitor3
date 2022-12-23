const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        _id: {type:DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
        position: { type: DataTypes.INTEGER, allowNull: false, unique:true, autoIncrement:true },
        date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        machinename: { type: DataTypes.STRING, allowNull: false },
        machinetype: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        operator: { type: DataTypes.STRING, allowNull: false },
        rawqty : {type: DataTypes.INTEGER, allowNull: false},
        achievedqty : {type: DataTypes.INTEGER, allowNull: false},
        remarks: {type: DataTypes.STRING, allowNull: false}
    };

    const options = {
        defaultScope: {
          
        },
        scopes: {

        }
    };

    return sequelize.define('Devices', attributes, options);
}