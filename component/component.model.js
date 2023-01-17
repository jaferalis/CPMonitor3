const { DataTypes } = require('sequelize');
// A product is maded of many components/items. This table maintains the inventory level of the items
module.exports = model;

function model(sequelize) {
    const attributes = {
        itemname: { type: DataTypes.STRING,primaryKey: true, allowNull: false },
        currentqty: { type: DataTypes.INTEGER, allowNull: false },
        //the level at which an order for more of the component should be placed        
        reorderpoint: { type: DataTypes.INTEGER, allowNull: false },
        //the number of days it takes for the component to be delivered 
        leadtime: { type: DataTypes.INTEGER, allowNull: false }
    };

    const options = {
        defaultScope: {
          
        },
        scopes: {

        }
    };

    return sequelize.define('components', attributes, options);
}