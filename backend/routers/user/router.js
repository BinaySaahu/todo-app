const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loginController = require("../../controller/user/login");
const registerController = require("../../controller/user/register");


router.post('/signup',registerController.register);
router.post('/login',loginController.login);

module.exports = router;