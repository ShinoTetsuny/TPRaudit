const jwt = require('jsonwebtoken')
require('dotenv').config()


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
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Access denied' });
            }

            if (decoded && decoded.roleId) {
                if (decoded.roleId === 1) {
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
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Access denied' });
            }

            if (decoded && decoded.roleId) {
                if (decoded.roleId === 1 || decoded.roleId === 2) {
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