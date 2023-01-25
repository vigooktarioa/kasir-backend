const menuModel = require('../models/index').menu
const Op = require('sequelize').Op
const path = require('path')
const fs = require('fs')
const upload = require(`./upload-cover`).single(`cover`)

// create function to get all menu
exports.getAllMenu = async(request,response) => {
    // call findAll() to get all data
    let books = await menuModel.findAll()
    return response.json({
        success: true,
        data: menu,
        message: 'All menus have been loaded'
    })
}

// create function for filter using keyword
exports.findMenu = async(request,response) => {
    // define keyword to find data
    let keyword = request.body.keyword

    let menu = await menuModel.findAll({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: keyword } },
                { jenis: { [Op.substring]: keyword } },
                { harga: { [Op.substring]: keyword } }
            ]
        }
    })
    return request.json({
        success: true,
        data: menu,
        message: 'All menus have been loaded'
    })
}

exports.addMenu = (request, response) => {
    // run function upload
    upload(request, response, async error => {
        // check if there are error when upload
        if (error) {
            return response.json({ message: error})
        }
        if (!request.file){
            return response.json({ message : 'nothing to upload'})
        }

        // prepare data from request
        let newMenu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            gambar: request.filename.filename,
            harga: request.body.harga
        }

        menuModel.create(newMenu)
        .then(result => {
            // if insert's process success
            return response.json({
                success: true,
                data: result,
                message: 'New menu has been inserted'
            })
        })

        .catch(error => {
            // if insert's process failed
            return response.json({
                success: false,
                message: error.message
            })
        })
    })
}

// create function to update book
exports.updateBook = async(request,response) => {
    // run upload function
    upload(request,response,async error => {
        if (error){
            return response.json({ message : error })
        }

        let id_menu = request.params.id_menu

        let menu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            harga: request.body.harga
        }

        if (request.file){
            const selectedMenu = await menuModal.findOne({
                where: { id_menu: id_menu }
            })

            const oldCoverMenu = selectedMenu.
            
            const pathCover = path.join(__dirname, '../cover', oldCoverMenu)

            if(fs.existsSync(pathCover)){
                fs.unlink(pathCover, error => console.log(error))
            }
            
        }
    })
}