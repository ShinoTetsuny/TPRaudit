const option = require('../models/option');

exports.getAllOptions = (req, res, next) => {
    option.findAll()
        .then((option) => res.status(200).json(option, models))
        .catch((error) => res.status(400).json({ error }))
};

exports.getOneOption = async (req, res, next) => {
    let object = {}
    let anOption = await option.findPk( req.params.id )
        .catch((error) => res.status(400).json({ error }))
        
    object.option = anOption

    let models = await option.findPk( req.params.id )
        .then((option) => option.getModels())
        .catch((error) => res.status(400).json({ error }))

    object.models = models

    res.status(200).json(object)
};

exports.createOption = async (req, res, next) => {
    let newOption = await option.create({
        name: req.body.name,
        price: req.body.price,
    })
        .catch((error) => res.status(400).json({ error }))
    req.body.models.forEach(model => {
        newOption.addModel(model)
    });

    res.status(201).json(newOption)
};

exports.editOption = async (req, res, next) => {
    let oldOption = await option.findPk( req.params.id )
        .catch((error) => res.status(400).json({ error }))
    
    await option.update({
        name: req.body.name,
        price: req.body.price,
    }, { where: { id: req.params.id } })
        .then(() => {
            oldOption.removeModels()
            req.body.models.forEach(model => {
                oldOption.addModel(model)
            });
        })
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};

exports.deleteOption = async (req, res, next) => {
    let oldOption = await option.findOne({ where: { id: req.params.id } })
        .catch((error) => res.status(400).json({ error }))
    oldOption.removeModels()
    option.destroy({ where: { id: req.params.id } })
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};