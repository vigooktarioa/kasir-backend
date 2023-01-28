const express = require('express')
const app = express()

app.use(express.json())

const menuController = require('../controller/menu.controller')
const upload = require(`../controller/upload-cover`).single(`cover`)

app.get("/", menuController.getAllMenu)
app.post("/find", menuController.findMenu)
app.post("/", [upload], menuController.addMenu)
app.put("/:id_menu", menuController.updateMenu)
app.delete("/:id", menuController.deleteMenu)

module.exports = app