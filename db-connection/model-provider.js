const { Sequelize } = require('sequelize');//creating instance of db
const { MODEL_NAMES } = require("../util/constant");
const getUserModel = require("./user-model");
const getEmployeeModel = require("./employee-model");

const registeredModels = {};

async function getDatabaseConnection() {
    const sequelize = new Sequelize(
        "postgres", //database name
        "postgres", //username
        "Teja@3566", //password
        {
            host: "localhost",
            dialect: "postgres" //typeofdb
        }
    );

    await sequelize.authenticate();
    return sequelize;
}

function registerModels(dbConnection) {
    let models = {
        [MODEL_NAMES.USER]: getUserModel,
        [MODEL_NAMES.EMPLOYEE]: getEmployeeModel,
    };
 // console.log(getUserModel)
    Object.entries(models).map(([modelName, getModel]) => {
        registeredModels[modelName] = getModel(dbConnection, modelName);
    });
    return registeredModels;
}

async function initializeDatabaseSchema() {
    const sequelize = await getDatabaseConnection();
    registerModels(sequelize);
    await sequelize.sync();
}

initializeDatabaseSchema();

module.exports = registeredModels;