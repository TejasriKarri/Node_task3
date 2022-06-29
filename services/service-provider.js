const models = require('../db-connection/model-provider.js');
const { MODEL_NAMES } = require("../util/constant");
exports.CreateUser = async (data) => {
    try {
        let getUserData = await models[MODEL_NAMES.USER].create(data)
        //console.log(getUserData);
        return getUserData;
    }
    catch (err) {
        console.log(err)
    }
}
exports.getUserData = async () => {
    try {
        let UserData = await models[MODEL_NAMES.USER].findAll()
        //console.log(getUserDataById)
        return UserData;
    }
    catch (err) {
        console.log(err)
    }
}
exports.getUserDataById = async (Id) => {
    try {
        let UserDataById = await models[MODEL_NAMES.USER].findAll({
            where: {
                Id: Id
            }
        })
        return UserDataById
    }
    catch (err) {
        console.log(err)
    }
}

exports.updateUserData = async (Id, Login, Password, age) => {
    try {
        let upadtedData = await models[MODEL_NAMES.USER].update({ Login: Login, Password: Password, age: age }, {
            where: {
                Id: Id
            }
        })
        return upadtedData
    }
    catch (err) {
        console.log(err)
    }
}
exports.softDelete = async (isDeleted, Id) => {
    try {
        let data = await models[MODEL_NAMES.USER].update({ isDeleted: isDeleted }, {
            where: {
                Id: Id
            }
        })
        return data
    }
    catch (err) {
        console.log(err)
    }
}
exports.deleteUserData = async (Id) => {
    try {
        let data = models[MODEL_NAMES.USER].destroy({
            where: {
                Id: Id
            }
        })
        return data
    }
    catch (err) {
        console.log(err)
    }
}