const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true }, //Nom de la sauce
    manufacturer: { type: String, required: true }, //Fabricant de la sauce
    description: { type: String, required: true }, //Principal ingrediant dans la sauce
    mainPepper: { type: String, required: true }, //Principal ingédiant de la sauce
    imageUrl: { type: String, requirerd: false }, //String de l'image de la sauce télécharger par l'utilisateur
    heat: { type: Number, required: true }, //Nombre entre 1 et 10 décrivant la sauce 
    likes: { type: Number, required: true }, //Nombre d'utilisateur qui aiment la sauce
    dislikes: { type: Number, required: true }, //Nombre d'utilissateur qui n'aime pas la sauce 
    usersLiked: { type: [String], required: true }, //Array d'identifiants d'utillisateur ayant ailé la sauce
    usersDisliked: { type: [String], required: true }, //Array d'identifiants d'utilisateurs n'ayant pas aimé
})

module.exports = mongoose.model('Sauce', sauceSchema);