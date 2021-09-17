// TODO: 
const { decodeToken } = require("../utils/jwt");

const isAuthenticated = async (req,res, next) => {
    try{
        const token = req.cookies.accessToken;
        const user = await decodeToken(token)
        req.user = user; 
        next();
    }catch(error){
        res.status(401).send({
            error: "you are not authorized!"
        })
    }
}

module.exports = {
    isAuthenticated
};
