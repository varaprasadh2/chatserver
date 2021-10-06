const Router = require('express').Router();

const { isAuthenticated } = require('../middlewares');
const { User } = require('../models');
const AuthRouter = require("./auth");
const MessagingRouter = require("./messaging");


Router.use(AuthRouter);

Router.use(isAuthenticated, MessagingRouter);

Router.get("/me", isAuthenticated, async (req, res)=> {
    try{    
        const user = await User.findOne({
            where: {
                id: req.user.userId
            }
        });
        return res.send({
            user
        });

    }catch(error){
        res.status(400).send({
            error: error.message
        })
    }
})
module.exports = Router;
