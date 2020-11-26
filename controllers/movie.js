'use strict'

var Movie = require('../models/movie');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: "Home"
        });
    },

    test: function(req, res){
        return res.status(200).send({
           message: "Movie Controller" 
        });
    },

    saveMovie: function(req, res) {
        var movie = new Movie();

        var params = req.body;
        movie.title = params.name;
        movie.description = params.description;
        movie.duration = params.duration;
        movie.category = params.category;
        movie.trailer = params.trailer;
        movie.releasedate = params.releasedate;
        movie.image = null;
        
        movie.save((err, movieStored) =>{
            if(err) return res.status(500).send({message: "Could not save!"});

            if(!movieStored) return res.status(404).send({message: "Could not save movie"});

            return res.status(200).send({movie: movieStored});
        });
    },

    getMovie: function(req, res){
        var movieId = req.params.id;

        if(movieId == null) return res.status(400).send({message: "Movie does not exist!"});

        Movie.findById(movieId,(err, movie) => {
            if(err) return res.status(500).send({message: "Could not return movie"});

            if(!movie) return res.status(400).send({message: "Movie does not exist!"});

            return res.status(200).send({
                movie
            });
        });
    },

    getMovies: function(req,res){
        //en el metodo find, se puede hacer filros como {year: 2019}
        Movie.find({}).sort('-releasedate').exec((err, movies) => {
            if(err) return res.status(500).send({message: "Could not return movie"});

            if(!movies) return res.status(404).send({message: "No movies to show"});

            return res.status(200).send({movies});
        });
    },

    updateMovie: function(req,res){
        var movieId = req.params.id;
        var update = req.body;

        Movie.findByIdAndUpdate(movieId, update, {new:true}, (err, movieUpdated) => {
            if(err) return res.status(500).send({message: "Error update"});

            if(!movieUpdated) return res.status(404).send({message: "Could not update movie"});

            return res.status(200).send({
                movie: movieUpdated
            });
        });
    },

    deleteMovie: function(req, res){
        var movieId = req.params.id;

        Movie.findByIdAndRemove(movieId, (err, movieRemoved) => {
            if(err) return res.status(500).send({message: "Could not delete movie"});

            if(!movieRemoved) return res.status(404).send({message: "Could not delete movie"});

            return res.status(200).send({
                movie: movieRemoved
            });
        });
    },

    uploadImage: function(req, res){
        
        var movieId = req.params.id;
        var fileName = 'Image not uploaded';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
            Movie.findByIdAndUpdate(movieId, {image: fileName}, {new: true}, (err, movieUpdated) => {
            if(err) return res.status(200).send({message: "the image file was not uploaded"});         
            if(!movieUpdated) return res.status(404).send({message: "The project does not exist"});          
                return res.status(200).send({
                    movie: movieUpdated
                });
            });
        }else{
                fs.unlink(filePath, err => {
                    return res.status(200).send({message: "The extension is not valid"});
                });
            }       
        }else{
            return res.status(200).send({
                message: fileName
            });
        }
    }, 

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "The image does not exist."
                });
            }
        })
    }

};

module.exports = controller;