'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
//var port = process.env.PORT || 8080;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://wendy-portfolio:xNP8lrX8nX6esow8@cluster0.jh1ni.mongodb.net/moviesbd', { useNewUrlParser:true, useUnifiedTopology: true })
        .then(() =>{
            console.log("Conexión a base de datos establecida con éxito");

            //Creacion del Servidor
            app.listen(port,()=>{
                console.log("Servidor corriendo correctamente");
            });
        })
        .catch(err => console.log(err));

        //