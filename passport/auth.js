const User = require('../models/user');

module.exports = function authRole(Role) {
    return (req, res, next) => {
        const user = req.user;
        if (user && user.role === Role) {
            next();
        } else {
            res.status(401).json('Not allowed');
        }
    }
};