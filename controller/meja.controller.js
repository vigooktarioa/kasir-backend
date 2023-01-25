const mejaModel = require('../models/index')
const Op = require('sequelize').Op
const path = require('path')
const fs = require('fs')

exports.getAllMeja = async(req, res)