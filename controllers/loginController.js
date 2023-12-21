const User = require('../models/user')
const Role = require('../models/role')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../database/database')

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (user) {
            const storedPassword = user.password;
            const match = await bcrypt.compare(password, storedPassword);

            if (match) {
                const expiresIn = '24h' 
                const token = jwt.sign(
                    {
                        userId: user.id,
                        roleId : user.roleId
                    },
                    process.env.JWT_SECRET,
                    { expiresIn }
                );

                res.json({ token });
            } else {
                res.status(401).send("Invalid password");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};