const model = require('../models/model')
const engineController = require('../controllers/engineController')
const engine = require('../models/engine')


exports.getAllModels = (req, res, next) => {
    model.findAll()
        .then((model) => res.status(200).json(model))
        .catch((error) => res.status(400).json({ error }))
};

exports.getOneModel = async (req, res, next) => {
    let object = {}

    let aModel = await model.findOne({ where: { id: req.params.id } })
        .catch((error) => res.status(400).json("model"))
    
    if (!aModel) {
        return res.status(404).json({ error: 'Model not found' });
    }
    
    object.model = aModel

    let options = await model.findOne({ where: { id: req.params.id } })
        .then((model) => model.getOptions())
        .catch((error) => res.status(400).json("options"))
    object.options = options

    res.status(200).json(object)
};

exports.createModel = async (req, res, next) => {

    let newModel = await model.create({
        name: req.body.name,
        seat: req.body.seat,
        door: req.body.door,
        price: req.body.price,
        engineId: req.body.engineId,
    })
    .catch((error) => res.status(400).json({ error }))
    if (req.body.options.length != 0) {
        req.body.options.forEach(option => {
            newModel.addOption(option)
        })
    };

    res.status(201).json(newModel)
};

exports.editModel = async (req, res, next) => {
    let aModel = await model.findOne({ where: { id: req.params.id } })
        .catch((error) => res.status(400).json({ error }))
    await model.update({
        name: req.body.name,
        seat: req.body.seat,
        door: req.body.door,
        price: req.body.price,
        engineId: req.body.engineId,
    }, { where: { id: req.params.id } })
    .catch((error) => res.status(400).json({ error , message: "error"}))

    await aModel.setOptions(req.body.options)
    console.log(aModel);
    res.status(200).json(aModel)
};

exports.deleteModel = (req, res, next) => {
    let aModel = model.findOne({ where: { id: req.params.id } })
        .catch((error) => res.status(400).json({ error }))
    aModel.removeOptions()
    model.destroy({ where: { id: req.params.id } })
        .then((model) => res.status(200).json(model))
        .catch((error) => res.status(400).json({ error }))
};