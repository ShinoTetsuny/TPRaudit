const jwt = require('jsonwebtoken')
require('dotenv').config()
const Role = require('../models/role')


exports.authentificator = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization

    if(token && process.env.JWT_SECRET){
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401).json({error: 'Access denied'})
            } else {
                next()
            }
        })
    } else {
        res.status(401).json({error: 'Access denied'})
    }
}

exports.authenticatorAdmin = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;

    if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            roleId = await Role.findByPk(decoded.userId)
            if (err) {
                return res.status(401).json({ error: 'Access denied' });
            }

            if (decoded && roleId) {
                if (roleId === 1) {
                    next();
                } else {
                    res.status(403).json({ error: 'Permission denied' });
                }
            } else {
                res.status(401).json({ error: 'Access denied' });
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied' });
    }
};

exports.authenticatorAccountant = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;

    if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            roleId = await Role.findByPk(decoded.userId)
            if (err) {
                return res.status(401).json({ error: 'Access denied' });
            }

            if (decoded && roleId) {
                if (roleId === 1 || roleId === 2) {
                    next();
                } else {
                    res.status(403).json({ error: 'Permission denied' });
                }
            } else {
                res.status(401).json({ error: 'Access denied' });
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied' });
    }
};

exports.authenticatorUser = (req, res, next) => {
    const token = req.query.token ? req.query.token : req.headers.authorization;
    const { id } = req.params

    if (token && process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            roleId = await Role.findByPk(decoded.userId)
            if (err) {
                return res.status(401).json({ error: 'Access denied' });
            }

            if (decoded && roleId) {
                if (id == decoded.userId || roleId === 1) {
                    next();
                } else {
                    res.status(403).json({ error: 'Permission denied' });
                }
            } else {
                res.status(401).json({ error: 'Access denied' });
            }
        });
    } else {
        res.status(401).json({ error: 'Access denied' });
    }
};