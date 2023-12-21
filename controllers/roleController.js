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
            if (role) {
                // Si le rôle est trouvé, renvoyer la réponse JSON avec le rôle et le message
                res.json({ role: role });
            } else {
                // Si le rôle n'est pas trouvé, renvoyer un message d'erreur avec le code d'état 404 (Not Found)
                res.status(404).json({ message: 'Role non trouvé' });
            }
        })
        .catch(err => {
            // En cas d'erreur, envoyer un message d'erreur avec le code d'état 500 (Erreur interne du serveur)
            console.error(err);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        });
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