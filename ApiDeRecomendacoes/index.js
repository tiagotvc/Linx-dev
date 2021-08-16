const express = require("express");
const cors = require('cors');
const recommendationsRouter = require('./routes/recommendations-router');
const app = express();

app.use(cors());

app.options('*', cors());

app.use(express.json({
    limit: "20mb"
}));

app.use(express.urlencoded({
    limit: "20mb",
    extended: true
}));

app.use('/api', recommendationsRouter);


const port = process.env.PORT || 3007;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}....`));
