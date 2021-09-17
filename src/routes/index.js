const Router = require('express').Router();

const { isAuthenticated } = require('../middlewares');
const AuthRouter = require("./auth");
const MessagingRouter = require("./messaging");


Router.use(AuthRouter);

Router.use(isAuthenticated, MessagingRouter);

module.exports = Router;
