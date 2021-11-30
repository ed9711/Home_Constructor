const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const cors = require('cors')
const model = require("./routes/Model");
const user = require("./routes/User");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/model', model);
app.use('/user', user);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
module.exports = app;