const mongoose = require('mongoose');
mongoose.connect('MONGO_URL')
    .then((response) => {
        console.log("Connected to DataBase");
    })
    .catch((error) => {
        console.log(error);
    });