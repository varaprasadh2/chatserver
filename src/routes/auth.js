const { login, signup } = require('../controllers/auth');
const { getToken, getAccessTokenForUser } = require('../utils/jwt');

const Router = require('express').Router();


Router.post("/login", async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await login({ email: email, password: password });

        const token = await getAccessTokenForUser(user);

        res.cookie('accessToken',token, { httpOnly: true });

        return res.send(user);

    }catch(error){
    
        return res.status(400).send(error)
    }

});


Router.post("/signup", async (req,res)=> {


   try{
       const { email, firstName, lastName, password, confirmPassword } = req.body;

       if(password!==confirmPassword) throw new Error("password and 'confirm password' didn't match");


       const user = await signup({ email, firstName, lastName, password });

       const token = await getAccessTokenForUser(user);

       res.cookie('accessToken', token, { httpOnly: true });

       return res.send(user);

   }catch(error){

       res.clearCookie('accessToken');
       
       return res.status(400).send({
           error: error.message
       });
   }




});

Router.post("/forgot-password", (req,res) => {
    // TODO: 
})


module.exports = Router;
