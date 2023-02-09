const express = require("express");
const app = express();

app.use(express.json());

const transaksiController = require("../controllers/transaksi.controller");

app.post("/", transaksiController.addTransaksi);
app.put("/edit/:id", transaksiController.updateTransaksi);
app.put("/pay/:id", transaksiController.createPayment);
app.delete("/:id", transaksiController.deleteTransaksi);

module.exports = app;
