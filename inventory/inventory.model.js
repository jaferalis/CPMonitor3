const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        itemname: { type: DataTypes.STRING, allowNull: false },
        vendor: {type: DataTypes.STRING, allowNull: false},
        purchasedate: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        purchasedqty: { type: DataTypes.INTEGER, allowNull: false },
        currentqty: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        defaultScope: {
          
        },
        scopes: {

        }
    };

    return sequelize.define('Inventory', attributes, options);
}