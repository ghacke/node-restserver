require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./routes'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true },
    (err, res) => {
        if (err) throw err;

        console.log("base de datos online.");
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puert ${ process.env.PORT }.`);
});