const express = require('express')
const app = express()

app.use(express.json())

const menuController = require('../controller/menu.controller')

app.get("/", menuController.getAllMenu)
app.post("/find", menuController.findMenu)
app.post("/", [upload.single(`cover`)], menuController.addMenu)
app.put("/:id_menu", menuController.updateMenu)
app.delete("/:id", menuController.deleteMenu)

module.exports = app