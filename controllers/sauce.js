const Sauce = require('../models/Sauce');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauces enregistré ' }))
        .catch(error => res.status(400).json({ error }))
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    } : {...req.body };
    Sauce.updateOne({ _id: req.params.id, }, {...sauceObject, _id: req.params.id })

    .then(() => res.status(200).json({ message: "Sauce mise a jour" }))
        .catch(error => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(201).json({ message: "objet supprimer" }))
                    .catch(error => res.status(404).json(error))
            });
        })
        .catch(error => res.status(404).json({ error }));
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllSauce = (req, res, next) => {

    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
};

exports.likeSauces = (req, res, next) => {
    let bodyUserId = req.body.userId;
    let like = req.body.like;
    let sauceId = req.params.id;
    Sauce.findOne({ _id: req.params.id }).then(sauce => {
        console.log(like)
        if (like === 1) {
            console.log(sauceId)
            Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: bodyUserId }, $inc: { likes: +1 }, })
                .then((response) => {
                    console.log(response)
                    res.status(201).json({ message: "Sauce Liker" });
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).json({ error });
                })
        }


        if (like === -1) {
            Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: bodyUserId }, $inc: { dislikes: +1 }, })
                .then(() => res.status(201).json({ message: "Sauce Disliker" }))
                .catch(error => res.status(400).json({ error }))
        }

        if (like === 0) {
            const indexLike = sauce.usersLiked.indexOf(bodyUserId);
            if (indexLike > -1) {
                sauce.usersLiked.slice(indexLike, 1);
                Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: { $each: [], $slice: indexLike } }, $inc: { likes: -1 }, })
                    .then(() => res.status(200).json({ message: 'Sauce déliker' }))
                    .catch((error) => res.status(400).json({ error }))
            } else if (indexLike === -1) {
                const indexDislike = sauce.usersDisliked.indexOf(bodyUserId);
                sauce.usersDisliked.slice(indexDislike, 1);
                Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: { $each: [], $slice: indexDislike } }, $inc: { dislikes: -1 }, })
                    .then(() => res.status(200).json({ message: 'Dislike anuuler' }))
                    .catch((error) => res.status(400).json({ error }))
            }

        }
    });

}