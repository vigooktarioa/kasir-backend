/** load library express */
const express = require(`express`)
/** create object that instances of express */
const app = express()
/** define port of server */
const PORT = 8000
/** load library cors */
const cors = require(`cors`)
/** open CORS policy */
app.use(cors())
/** define all routes */
const userRoute = require(`./routes/user.route`)
const mejaRoute = require('./routes/meja.route')
/** define prefix for each route */
app.use(`/user`, userRoute)
app.use(`/meja`, mejaRoute)
/** run server based on defined port */
app.listen(PORT, () => {
    console.log(`Server kasir app running on port
    ${PORT}`) 
    })