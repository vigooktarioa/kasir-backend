// load library express
const express = require('express')

// initiate object that instance of express
const app = express()

// allow to read 'request with json type
app.use(express.json())

// load user's controller
const userController = require('../controller/user.controller')
app.get("/", userController.getAllUser)
app.post("/", userController.addUser)
app.post("/find", userController.findUser)
app.put("/:id", userController.updateUser)
app.delete("/:id", userController.deleteUser)

// export app in order to load in another file
module.exports = app