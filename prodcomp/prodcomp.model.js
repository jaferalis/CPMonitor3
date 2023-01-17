const { DataTypes } = require('sequelize');
// A product is maded of many components/items. This table maintains the inventory level of the items
module.exports = model;

function model(sequelize) {
    const attributes = {
        _id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true, startAt:1},
        prodname: { type: DataTypes.STRING, allowNull: false },
        compname: { type: DataTypes.STRING, allowNull: false }, //component used for the product
        compqtyused: { type: DataTypes.INTEGER, allowNull: false } //component quantity used for the product
    };

    const options = {
        defaultScope: {
          
        },
        scopes: {

        }
    };

    return sequelize.define('prodcomp', attributes, options);
}