const Role = require('../models/role');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

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

exports.verifyRole = (req, res) => {
    const token = req.query.token ? req.query.token : req.headers.authorization

    if(token && process.env.JWT_SECRET){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(200).json({error: 'Access denied', role: 0})
            } else {
                User.findOne({
                    where: {
                        id: decoded.id
                    },
                    include: [Role]
                }).then(user => {
                    res.status(200).json({role: user.role.name})
                })
            }
        })
    } else {
        res.status(401).json({error: 'Access denied'})
    }
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