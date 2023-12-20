const user = require('../models/user');
const Role = require('../models/role');

exports.getAllUsers = (req, res) => {
    user.findAll()
        .then(users => {
            res.json(users).json({ message: 'Liste des utilisateurs' });
        })
        .catch(err => console.log(err))
}

exports.getOneUser = (req, res) => {
    const { id } = req.params;
    user.findOne({
            where: {
                id: id
            }
        })
        .then(user => {
            res.json(user).json({ message: 'Utilisateur trouvé' });
        })
        .catch(err => console.log(err))
}

exports.addUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    // console.log(role);
    const newRole = await Role.findOne({
        where: {
            name: role
        }
    });

    user.create({
            name: name,
            email: email,
            password: password,
            roleId: newRole.id
        })
        .then(user => {
            res.json(user);
        })
        .catch(err => console.log(err))
}

exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    user.update({
            name: name,
            email: email,
            password: password
        }, {
            where: {
                id: id
            }
        })
        .then(user => {
            res.json({ user });
        })
        .catch(err => console.log(err))
}

exports.deleteUser = (req, res) => {
    const { id } = req.params;
    user.destroy({
            where: {
                id: id
            }
        })
        .then(user => {
            res.json(user).json({ message: 'Utilisateur supprimé' });
        })
        .catch(err => console.log(err))
}