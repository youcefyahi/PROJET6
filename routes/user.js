//const { Router } = require('express');
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // Fonctionnalité d'inscription //Mot de passe de l'utilisatteur chifré  // // 
router.post('/login', userCtrl.login); // Fonctionnalité de connexion //

module.exports = router;