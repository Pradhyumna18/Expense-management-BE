const express = require('express')
const app = express();
const dotenv = require("dotenv")
const bodyparser = require('body-parser')
const routes = require('./Routes/routes')
const cors = require('cors')
dotenv.config()
const port = process.env.PORT
console.log(app.get('env'))
app.use(bodyparser.json())
app.use(cors())
app.use('/', routes)
app.listen(port, () => {
    console.log("listening to port ", port)
})
app.use((error, req, res, next) => {
    res.status(500).json(
        {
            success: false,
            error
        }
    )
}
);
module.exports = app
