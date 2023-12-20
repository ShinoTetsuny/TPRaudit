const option = require('../models/option')

exports.getAllOptions = (req, res, next) => {
    option.findAll()
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};

exports.getOneOption = (req, res, next) => {
    option.findOne({ where: { id: req.params.id } })
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};

exports.createOption = (req, res, next) => {
    option.create({
        name: req.body.name,
        price: req.body.price,
    })
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};

exports.editOption = (req, res, next) => {
    option.update({
        name: req.body.name,
        price: req.body.price,
    }, { where: { id: req.params.id } })
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};

exports.deleteOption = (req, res, next) => {
    option.destroy({ where: { id: req.params.id } })
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};