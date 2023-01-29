const express = require(`express`)
const cors = require(`cors`)
require('dotenv').config()


const app = express()
const PORT = process.env.APP_PORT
app.use(cors())

const userRoute = require(`./routes/user.route`)
const mejaRoute = require('./routes/meja.route')
const menuRoute = require('./routes/menu.route')

app.use(`/user`, userRoute)
app.use(`/meja`, mejaRoute)
app.use(`/menu`, menuRoute)

app.use(express.static(__dirname))

app.listen(PORT, () => {
    console.log(`Server kasir app running on port
    ${PORT}`) 
})