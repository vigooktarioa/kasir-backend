const userModel = require('../models/index').user
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

exports.login = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) return res.status(400).json({
        'message': 'Email and Passsword are required'
    })
    try{
        const user = await userModel.findOne({
            where:{
                email: req.body.email
            }
        });
        const match = await argon2.verify(user.password, req.body.password);
        if(match) {
            const id_user = user.id_user;
            const username = user.username;
            const email = user.email;  

            const accessToken = jwt.sign({
                id_user, 
                username, 
                email
            }, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: process.env.JWT_EXPIRATION
            });

            const refreshToken = jwt.sign({
                id_user,
                username, 
                email
            }, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: process.env.JWT_REFRESH_EXPIRATION
            });

            await userModel.update({refresh_token: refreshToken},{
                where:{
                    id_user: id_user
                }
            });

            res.cookie('refreshToken', refreshToken,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ accessToken });
        }else{
            res.status(401).json({
                'message': 'Wrong password'
            })
        }     
    }catch (error){
        res.status(404).json({
            'message': 'Email does not exist'
        })
        console.log(error)
    }
}

exports.logout = async (request, response) => {
    const refreshToken = request.cookies.refreshToken;
    if(!refreshToken) return response.sendStatus(204);

    const user = await userModel.findOne({
        where:{
            refresh_token: refreshToken
        }
    })
    if(user) return response.sendStatus(204);

    await userModel.update({refresh_token: null},{
        where:{
            id_user: id_user
        }
    });
    response.clearCookie('refreshToken');
    return response.sendStatus(200);
}

exports.refreshToken = async(request, response) => {
    try {
        const refreshToken = request.cookies.refreshToken
        if(!refreshToken) return response.sendStatus(401);
        const user = await userModel.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user) return response.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if(error) return response.sendStatus(403);
            const id_user = user.user_id;
            const username = user.username;
            const email = user.email;
            const accessToken = jwt.sign({id_user, username, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: process.env.JWT_EXPIRATION
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}

