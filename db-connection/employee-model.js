const { DataTypes } = require('sequelize');
module.exports = function (sequelize, modelName) {
    return sequelize.define(modelName, {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Login: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        Password: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        age: {
            type: DataTypes.INTEGER
            // allowNull defaults to true
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
            // allowNull defaults to true
        },
    }, {
        freezeTableName: true
    });
}
