const Role = require('../models/role');

exports.getAllRoles = (req, res) => {
    Role.findAll()
        .then(roles => {
            res.json(roles).json({ message: 'Liste des roles' });
        })
        .catch(err => console.log(err))
}

exports.getOneRole = (req, res) => {
    const { id } = req.params;
    Role.findOne({
            where: {
                id: id
            }
        })
        .then(role => {
            res.json(role).json({ message: 'Role trouvé' });
        })
        .catch(err => console.log(err))
}

exports.addRole = (req, res) => {
    const { name } = req.body;
    Role.create({
            name: name
        })
        .then(role => {
            res.json(role);
        })
        .catch(err => console.log(err))
}

exports.updateRole = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    Role.update({
            name: name
        }, {
            where: {
                id: id
            }
        })
        .then(role => {
            res.json(role);
        })
        .catch(err => console.log(err))
}

exports.deleteRole = (req, res) => {
    const { id } = req.params;
    Role.destroy({
            where: {
                id: id
            }
        })
        .then(role => {
            res.json(role);
        })
        .catch(err => console.log(err))
}