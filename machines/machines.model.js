const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        _id: {type:DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
        position: { type: DataTypes.INTEGER, allowNull: false, unique:true, autoIncrement:true,startAt:1 },
        machinename: { type: DataTypes.STRING, allowNull: false },
        machinetype: { type: DataTypes.STRING, allowNull: false },
        purchasedate: { type: DataTypes.DATE, allowNull: false},        
        vendor: { type: DataTypes.STRING, allowNull: false },
        vendorphone : {type: DataTypes.INTEGER, allowNull: false},
        amcrenewal : {type: DataTypes.DATE, allowNull: false}
    };

    const options = {
        defaultScope: {
          
        },
        scopes: {

        }
    };

    return sequelize.define('Machines', attributes, options);
}