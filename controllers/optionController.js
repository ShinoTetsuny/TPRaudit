const option = require('../models/option');

exports.getAllOptions = (req, res, next) => {
    option.findAll()
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};

exports.getOneOption = async (req, res, next) => {
    let object = {}
    let anOption = await option.findByPk( req.params.id )
        .catch((error) => res.status(400).json({ error }))
    
    if (!anOption) {
        return res.status(404).json({ error: 'Option not found' });
    }
    object.option = anOption

    let models = await option.findByPk( req.params.id )
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
    let anOption = await option.findByPk( req.params.id )
        .catch((error) => res.status(400).json({ error }))
    
    await option.update({
        name: req.body.name,
        price: req.body.price,
    }, { where: { id: req.params.id } })
        .catch((error) => res.status(400).json({ error }))

    await anOption.setOptions(req.body.models)
    console.log(anOption);
    res.status(200).json(anOption)

};

exports.deleteOption = async (req, res, next) => {
    let anOption = await option.findOne({ where: { id: req.params.id } })
        .catch((error) => res.status(400).json({ error }))
    anOption.removeModels()
    option.destroy({ where: { id: req.params.id } })
        .then((option) => res.status(200).json(option))
        .catch((error) => res.status(400).json({ error }))
};