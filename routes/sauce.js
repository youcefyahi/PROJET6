const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// // Le CRUD// //

// // Les Routes GET // // 
router.get('/', auth, sauceCtrl.getAllSauce); //Revoie le tableau de toute les sauce
router.get('/:id', auth, sauceCtrl.getOneSauce); //Revoie une sauce avec l'ID fournis

// // Les routes POST // //

router.post('/', auth, multer, sauceCtrl.createSauce); //Ajouter les sauces,leur image,
router.post('/:id/like', auth, multer, sauceCtrl.createSauce); // Fonctionaliter j'aime ,

// // Les route PUT // // 

router.put('/:id', auth, multer, sauceCtrl.modifySauce) //Met a jour la sauce

// // Les routes DELETE // //

router.delete('/:id', auth, sauceCtrl.deleteSauce); // Supprime les sauces

module.exports = router;