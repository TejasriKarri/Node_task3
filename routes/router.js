const express1 = require("express");
const getAutoSuggestUsers = require('../controllers/routeController.js').getAutoSuggestUsers;

const getUserById = require('../controllers/routeController.js').getUserById;
const getUser = require('../controllers/routeController.js').getUser;
const createUser = require('../controllers/routeController.js').createUser;
const updateUser = require('../controllers/routecontroller.js').updateUser;
const deleteUser = require('../controllers/routecontroller.js').deleteUser;
const softDeleteUser = require('../controllers/routeController.js').softDeleteUser;
const router = express1.Router();

router.get("/:Id", getUserById);
router.get("/:loginsubstring/:limit", getAutoSuggestUsers);
router.get("/", getUser);
router.patch("/:Id", updateUser);
router.delete("/:Id", deleteUser)
router.delete("/:isDeleted/:Id", softDeleteUser);
router.post("/", createUser);
module.exports = {
    router: router
}