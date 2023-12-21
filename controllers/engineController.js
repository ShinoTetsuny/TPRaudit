const engine = require('../models/engine')

exports.getAllEngines = (req, res, next) => {
    engine.findAll()
        .then((engine) => res.status(200).json(engine))
        .catch((error) => res.status(400).json({ error }))
}

exports.getOneEngine = (req, res, next) => {
    engine.findOne({ where: { id: req.params.id } })
        .then((engine) => res.status(200).json(engine))
        .catch((error) => res.status(400).json({ error }))
}

exports.createEngine = (req, res, next) => {
    engine.create({
        name: req.body.name,
        type : req.body.type,
    })
        .then((engine) => res.status(200).json(engine))
        .catch((error) => res.status(400).json({ error }))
}

exports.editEngine = (req, res, next) => {
    engine.update({
        name: req.body.name,
        type : req.body.type,
    }, { where: { id: req.params.id } })
        .then((engine) => res.status(200).json(engine))
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteEngine = (req, res, next) => {
    engine.destroy({ where: { id: req.params.id } })
        .then((engine) => res.status(200).json(engine))
        .catch((error) => res.status(400).json({ error }))
}