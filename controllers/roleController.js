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
            if (role) {
                res.json({ role: role });
            } else {
                res.status(404).json({ message: 'Role non trouvé' });
            }
        })
        .catch(err => {

            console.error(err);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        });
    }

exports.verifyRole = (req, res) => {
    const token = req.body.token ? req.body.token : req.headers.authorization
    console.log(token);
    if(token && process.env.JWT_SECRET){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(200).json({error: 'Access denied', role: 0})
            } else {
                User.findOne({
                    where: {
                        id: decoded.id
                    }
                }).then(user => {
                    Role.findOne({
                        where: {
                            id: user.roleId
                        }
                    }).then(role => {
                        res.status(200).json({role: role.id})
                    })
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
            if (role) {
                res.json({ message: "Role ajouté avec succès" });
            } else {
                res.status(404).json({ message: "Erreur lors de l'ajout du role" });
            }
            
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