const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.verifyJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401).json({
        'message': "Unauthorized"
    })
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (error, decoded) => {
        console.log(error)
        if(error) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}