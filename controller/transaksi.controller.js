const { request } = require('../routes/menu.route')

const transaksiModel = require('..models/index').transaksi
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

    transaksiModel.create(newData)
    .then(result =>)
}