const detail_transaksi = require('../models/detail_transaksi')

const transaksiModel = require('../models/index').transaksi
const detailTransaksiModel = require('../models/index').detail_transaksi
const Op = require('sequelize').Op

exports.addTransaksi = async (request, response) => {
    let newData = {
        tgl_transaksi: request.body.tgl_transaksi,
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status
    }

    // insert ke tabel transaksi
    transaksiModel.create(newData)
    .then(result => {
        // mengambil id terakhir dari transaksi
        let transaksiID = result.id_transaksi
        // menyimpan detail_transaksi dari request ini dalam bentuk array
        let detailTransaksi = request.body.detail_transaksi

        // insert transaksiID ke tiap item di detail_transaksi
        // (1 transaksi bisa memiliki beberapa detail_transaksi)
        for (let i = 0; i < detailTransaksi.length; i++) {
        detailTransaksi[i].transaksiID = transaksiID
        }
         
        // insert semua detail_transaksi
        // (termasuk id_transaksi yang diambil dari 
        // result.id ke setiap detail_transaksi yang berkaitan)

        // TODO gimana biar id_transaksi bisa masuk ke detail_transaksi
        
        detailTransaksiModel.bulkCreate(detailTransaksi)
        .then(result => {
            return response.json({
                success: true,
                message: 'New transaction and transaction details has been inserted'
            })
        })
        .catch(error => {
            return response.json({    
                success: false,
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.updateTransaksi = async(request, response) => {
    let newData = {
        tgl_transaksi: request.body.tgl_transaksi,
        id_user: request.body.id_user,
        id_meja: request.body.id_meja,
        nama_pelanggan: request.body.nama_pelanggan,
        status: request.body.status
    }

    let transaksiID = request.params.id_transaksi

    transaksiModel.update(newData, { where: { id: transaksiID} })
    .then(async result => {
        await detailTransaksi.destroy(
            { where: { transaksiID: transaksiID}}
        )

        let detailTransaksi = request.body.detail_transaksi

        if (Array.isArray(request.body.detail_transaksi)) {
            for (let i = 0; i < request.body.detail_transaksi.length; i++) {
            detailTransaksi[i].transaksiID = transaksiID
            }
          }

        detailTransaksiModel.bulkCreate(detailTransaksi)
        .then(result => {
            return response.json({
                success: true,
                message:'New transaction has been updated'
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

exports.deleteTransaksi = async(request,response) => {
    let transaksiID = request.params.id_transaksi

    detailTransaksiModel.destroy(
        { where: { transaksiID: transaksiID}}
    )
    .then(result => {
        transaksiModel.destroy({where: { id: transaksiID}})
        .then(result => {
            return response.json({
              success: true,
              message: ` transaction has deleted`
            })
        })
        .catch(error => {
            return response.json({
              success: false,
              message: error.message
            })
            })
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        })
    })
}

//TODO kurang pembayaran transaksi dimana meja akan diubah dari status tersedia menjadi tidak tersedia atau sebaliknya