const model = require('../models/model')
const engineController = require('../controllers/engineController')
const engine = require('../models/engine')


exports.getAllModels = (req, res, next) => {
    model.findAll()
        .then((model) => res.status(200).json(model))
        .catch((error) => res.status(400).json({ error }))
};

exports.getOneModel = (req, res, next) => {
    model.findOne({ where: { id: req.params.id } })
        .then((model) => res.status(200).json(model))
        .catch((error) => res.status(400).json({ error }))
};

exports.createModel = async (req, res, next) => {

    // create model
    await model.create({
        name: req.body.name,
        seat: req.body.seat,
        door: req.body.door,
        price: req.body.price,
        engineId: req.body.engineId,
    })
        .then((model) => res.status(200).json(model))
        .catch((error) => res.status(400).json({ error }))
};

exports.editModel = (req, res, next) => {
    model.update({
        name: req.body.name,
        seat: req.body.seat,
        door: req.body.door,
        price: req.body.price,
        engineId: req.body.engineId,
    }, { where: { id: req.params.id } })
        .then((model) => res.status(200).json(model))
        .catch((error) => res.status(400).json({ error }))
};

exports.deleteModel = (req, res, next) => {
    model.destroy({ where: { id: req.params.id } })
        .then((model) => res.status(200).json(model))
        .catch((error) => res.status(400).json({ error }))
};