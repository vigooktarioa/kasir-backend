// load model for user table
const userModel = require('../models/index').user

// load operation from Sequelize
const Op = require('sequelize').Op

exports.getAllUser = async (request, response) => {
    // call findAll() to get all data
    try {
        let user = await userModel.findAll();
        response.json({
            success: true,
            data: user,
            message: 'All user have been loaded'
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getOneUser = async (request, response) => {
    try {
        let user = await userModel.findAll({
            where: {
                id_user: request.params.id_user
            }
        });
        response.json({
            success: true,
            data: user,
            message: 'One user has been loaded'
        })
    } catch (err) {
        console.log(err);
    }
}

// create function for filter
exports.searchUser = async (request, response) => {
    // define keyword to find data
    let keyword = request.body.keyword

    // call findAll() within where clause and
    // operation to find data based on keyword
    let user = await userModel.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.substring]: keyword }},
                { email: { [Op.substring]: keyword }},
                { role: { [Op.substring]: keyword } }
            ]
        }
    })
    return response.json({
        success: true,
        data: user,
        message: 'Searching success'
    })
}

// create function for add new user
exports.addUser = (request, response) => {
    // prepare data from request
    let newUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    }

    // execute inserting data to user's table
    userModel.create(newUser)
        .then(result => {
            // if inser's process success
            return response.json({
                success: true,
                data: result,
                message: 'New user has been inserted'
            })
        })
        .catch(error => {
            // if insert's process fail
            return response.json({
                success: false,
                message: error.message
            })
        })
}

// create function for update member
exports.updateUser = (request, response) => {
    // prepare data that has been changed
    let dataUser = {
        nama_user: request.body.nama_user,
        role: request.body.role,
        username: request.body.username,
        email: request.body.email,
        password: request.body.password
    }

    // define id user that will be update
    let idUser = request.params.id_user

    // execute update data based on defined id member
    userModel.update(dataUser, {where: {id_user: idUser} })
    .then(result => {
        // if update's process success
        return response.json({
            success: true,
            data:dataUser,
            message: 'Data user has been updated'
        })
    })
    .catch(error =>{
        // if update's process fail
        return response.json({
            success: false,
            message: error.message
        })
    })
}

// create function to delete data
exports.deleteUser = (request, response) => {
    // define id user that will be update
    let idUser = request.params.id_user

    // execute delete data based on defined id user
    userModel.destroy({ where: { id_user: idUser }})
    .then(result => {
        return response.json({
            success: true,
            message: 'Data user has been updated'
        })
    })
    .catch(error => {
        // if update's process fail
        return response.json({
            success: false,
            message: error.message
        })
    })
}