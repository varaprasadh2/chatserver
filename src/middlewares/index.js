// TODO: 
const { decodeToken } = require("../utils/jwt");

const isAuthenticated = async (req,res, next) => {
    try{
        const token = req.cookies.accessToken;
        // const token = req.headers.authorization.split(" ")[1];
        
        const user = await decodeToken(token);

        req.user = user; 

        next();
    }catch(error){
        console.log(error);

        res.status(401).send({
            error: "you are not authorized!"
        })
    }
}

module.exports = {
    isAuthenticated
};
