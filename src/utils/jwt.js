const jwt = require('jsonwebtoken');

const getToken = async payload => {
    const secret = process.env.JWT_SECRET;
    const token = await jwt.sign(payload, secret); //TODO: handle expires in
    return token;
}

const decodeToken = async token => {
    const secret = process.env.JWT_SECRET;
    const payload = await jwt.verify(token, secret);
    return payload;
};

const getAccessTokenForUser = async user => {
    const token = await getToken({
        userId: user.id,
        email: user.email
    });
    return token;
}


module.exports = {
    getToken,
    decodeToken,
    getAccessTokenForUser,
};
