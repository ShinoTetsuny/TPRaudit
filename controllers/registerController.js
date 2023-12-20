const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../database/database')

exports.register = async (req, res) => {
    try {
        const { name, password, email } = req.body;
    
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId: 3
        });

        const expiresIn = '24h'
        const token = jwt.sign(
            {
                userId: user.id,
                roleId: 3,
            },
            process.env.JWT_SECRET,
            { expiresIn }
        );

        res.status(201).json({ user, token });
    } catch (err) {
        console.error(err);
        res.status(500).json("Internal Server Error");
    }
};