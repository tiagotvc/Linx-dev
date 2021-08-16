const express = require("express")
const cors = require('cors')
const productRouter = require('./routes/product-router')
const db = require('./db')
const app = express()


app.use(cors());

app.options('*', cors());

app.use(express.json({
    limit: "20mb"
}));

app.use(express.urlencoded({
    limit: "20mb",
    extended: true
}));


db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use('/api', productRouter)


const port = process.env.PORT || 3001;
module.exports = app.listen(port, () =>  console.log(`Listening on port ${port}....`));
