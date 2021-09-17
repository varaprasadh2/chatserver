const uuid = require('uuid');
const { getContentHash ,isHashMatches} = require('../../utils');

const { User }  = require("../../models/index");


const signup = async payload => {
    const { email, firstName, lastName, password } = payload;

    try{
        // check if user already registered
        const existingUser = await User.findOne({ where: { email: email } })

        if (existingUser) throw new Error("email is already taken");


        const hashedPassword = await getContentHash(password);

        const user = {
            id: uuid.v4(),
            email:email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword
        }

        const newUser =  await User.create(user);
        console.log(newUser);

        return newUser;

    }catch(error){
        console.log("error at signup", payload);
        throw error;
    }
}

const login = async payload => {
    const { email, password } = payload;
    
    // find user 
    const user = await User.findOne({ where: { email: email }});

    if(!user){
        throw new Error("user not found!");
    }

    const passwordHash = user.password;

    const matches = await isHashMatches(password, passwordHash);

    // return token 
    if(!matches) throw new Error("invalid credentials");

   return user;

}

module.exports = {
    login,
    signup
};
