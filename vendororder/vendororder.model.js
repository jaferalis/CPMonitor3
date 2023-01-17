const { DataTypes } = require('sequelize');
// A product is maded of many components/items. This table maintains the inventory level of the items
module.exports = model;

function model(sequelize) {
    const attributes = {
        _id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true, startAt:1},
        compname: { type: DataTypes.STRING, allowNull: false }, //component name
		suppliername: { type: DataTypes.STRING, allowNull: false },
        qty: { type: DataTypes.INTEGER, allowNull: false }, //quantity ordered with vendor
        priceperunit : { type: DataTypes.DECIMAL(10,2), allowNull: false }, //quantity ordered with vendor
        orderdate : { type: DataTypes.DATE, allowNull: false },
        deliveryby: { type: DataTypes.DATE, allowNull: false },
        received: { type: DataTypes.BOOLEAN, allowNull: false }, 
        receivedon: { type: DataTypes.DATE, allowNull: false},
    };

    const options = {
        defaultScope: {
          
        },
        scopes: {

        }
    };

    return sequelize.define('vendororder', attributes, options);
}