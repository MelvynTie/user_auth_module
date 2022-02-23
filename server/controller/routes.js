const authController = require('./authController');
const verifyToken = require('./verifyToken');

const getAllUser = authController.getAllUser;
const registerUser = authController.registerUser;
const getRegisteredUser = authController.getRegisteredUser;
const loginUser = authController.loginUser;
const logoutUser = authController.logoutUser;

const router = require('express').Router();
module.exports = function (app) {

}
const routes = (app) => {
  app.route('/')
    .get(getAllUser);
  app.route('/register')
    .post(registerUser)
    .get(verifyToken, getRegisteredUser);
  app.route('/login')
    .post(loginUser);
  app.route('/logout')
    .post(logoutUser);

};

module.exports = routes;
