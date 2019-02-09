require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/usuario.js'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true },
    (err, res) => {
        if (err) throw err;

        console.log("base de datos online.");
    }
);

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puert ${ process.env.PORT }.`);
});