const jwt = require('jsonwebtoken'); 

// const { TokenExpiredError } = jwt

// exports.catchError = (err, res) => {
//     if(err instanceof TokenExpiredError){
//         return res.status(401).send({
//             message: ""
//         })
//     }
// } 

exports.verifyToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return response.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error) return response.sendStatus(403);
        request.email = decoded.email;
        next();
    })
}