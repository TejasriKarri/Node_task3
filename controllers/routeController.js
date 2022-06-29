const express = require("express");
const router = express.Router();
const { MODEL_NAMES } = require("../util/constant");
const userServices = require("../services/service-provider.js")
const models = require('../db-connection/model-provider.js');
//const { CreateUser: getUsersFromDB } = require("../services/service-provider");
const validators = require('../validators/joivalidations.js').validator
const validate = require('../validators/joivalidations.js').validate
const createUser = async (req, res) => {
    const data = req.body
    const isValid = validators(data);
    // console.log(isValid.error)
    const userData = await models[MODEL_NAMES.USER].findOne({ where: { Id: data.Id } });// The findOne method obtains the first entry it finds 
    if (userData === null && isValid.error == undefined) { //if null the data is not present
        let getUsers = await userServices.CreateUser(data)
        // res.send(getUsers)
        //console.log (getUsers)
        res.status(201).send("user created succesfully")
    }
    else {
        if (isValid.error != undefined) {
            res.send(isValid.error)
        }
        else {
            res.send(`Data with the id: ${data.Id} is already present`);
        }
    }
}
const getUser = async (req, res) => {
    let getUserById = await userServices.getUserData();
    res.send(getUserById)
}
//where clause
const getUserById = async (req, res) => {
    const Id = req.params.Id

    const data = await models[MODEL_NAMES.USER].findOne({ where: { Id: Id } });
    if (data != null) {
        let getUserById = await userServices.getUserDataById(Id)
        res.send(getUserById)
    }
    else {
        res.send(`Data with id: ${Id} is not present`)
    }

}
const getAutoSuggestUsers = async (req, res) => {
    const loginSubstring = req.params.loginsubstring;
    const limit = req.params.limit
    const listOfUsers = await models[MODEL_NAMES.USER].findAll()
    const SortedUsers = listOfUsers.sort((a, b) => {
        a.Login - b.Login
    })
    const suggestedUsers = SortedUsers.filter((user) => user.Login.includes(loginSubstring) != false).slice(0, limit);
    if (suggestedUsers.length != 0) {
        res.send(suggestedUsers)
    }
    else {
        res.send(`User with substring ${loginSubstring} is not present`)
    }
}
const updateUser = async (req, res) => {
    const id = req.params.Id
    const { Login, Password, age } = req.body
    const isValid = validate(req.body);
    const data = await models[MODEL_NAMES.USER].findOne({ where: { Id: id } });
    if (Login || Password || age) {
        if (data != null && isValid.error == undefined) {

            let updatedData = await userServices.updateUserData(id, Login, Password, age)
            res.send(`user with Id ${id} updated`);
        }
        else {
            if (isValid.error != undefined) {
                res.send(isValid.error)
            }
            else {
                res.send(`user with id:${id} is not present`)
            }
        }
    }
    else {
        res.send("please enter some data !! it can't be empty ")
    }
}
const softDeleteUser = async (req, res) => {
    const isDeleted = req.params.isDeleted
    const Id = req.params.Id
    const data = await models[MODEL_NAMES.USER].findOne({ where: { Id: Id, isDeleted: false } });
    if (data === null) {
        res.send(`Data with Id: ${Id} is not present`)
    }
    else {
        let softDeleteUser = await userServices.softDelete(isDeleted, Id)
        res.status(201).send("deleted data succesfully")
    }
}
const deleteUser = async (req, res) => {
    const Id = req.params.Id
    const data = await models[MODEL_NAMES.USER].findOne({ where: { Id: Id } });
    if (data === null) {
        res.send(`Data with Id: ${Id} is not present`)
    }
    else {
        //console.log("in destroy")
        let deleteUser = await userServices.deleteUserData(Id)
        res.send("deleted succesfully from the db")
    }


}
//router.get("/:loginsubstring/:limit", getAutoSuggestUsers);


module.exports = {
    getUserById: getUserById,
    getUser: getUser,
    getAutoSuggestUsers: getAutoSuggestUsers,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    softDeleteUser: softDeleteUser
}