const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors')
    //const helmet = require('helmet');


//Connexion a Mongodb

mongoose.connect('mongodb+srv://youcef:biboune7@cluster0.okd0i.mongodb.net/youcef?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion a MongoDB reussi !'))
    .catch(() => console.log('connexion a MongoDb echouée !'));

const app = express();
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();

});



//utilisation cors package

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;