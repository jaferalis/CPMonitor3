const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
//    const mysqlPort = process.env.MYSQL_PORT;
    console.log(config.database);
    console.log(host);
    console.log(port);
    console.log(user);
    console.log(password);
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' , port: port});

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Devices = require('../production/devices.model')(sequelize);
    db.Machines = require('../machines/machines.model')(sequelize);
    db.Operators = require('../operators/operators.model')(sequelize);
    // db.Components = require('../component/component.model')(sequelize);
    // db.ProdComps = require('../prodcomp/prodcomp.model')(sequelize); //THis table give the compostiion of product
    // db.VendorOrders = require('../vendororder/vendororder.model')(sequelize);

    // sync all models with database
    await sequelize.sync({ alter: true });
}