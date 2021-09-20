const { login, signup } = require('../controllers/auth');
const { getToken, getAccessTokenForUser } = require('../utils/jwt');

const Router = require('express').Router();


Router.post("/login", async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await login({ email: email, password: password });

        const token = await getAccessTokenForUser(user);

        res.cookie('accessToken',token, { httpOnly: true });
        
        // if accessToken fails, regenerate it using refreshToken 
        return res.send({
            user: user,
            auth: {
                accessToken: token,
                refreshToken: null
            }
        });

    }catch(error){
        console.log({
            error
        })
        return res.status(400).send({
            error:"invalid credentials"
        })
    }

});


Router.post("/signup", async (req,res)=> {


   try{
       const { email, firstName, lastName, password, confirmPassword } = req.body;

       if(password!==confirmPassword) throw new Error("password and 'confirm password' didn't match");


       const user = await signup({ email, firstName, lastName, password });

       const token = await getAccessTokenForUser(user);

       res.cookie('accessToken', token, { httpOnly: true });
       

       return res.send({
           user: user,
           auth: {
               accessToken: token,
               refreshToken: null
           }
       });

   }catch(error){

       res.clearCookie('accessToken');
       
       return res.status(400).send({
           error: error.message
       });
   }




});

Router.post("/forgot-password", (req,res) => {
    // TODO: 
});



module.exports = Router;
