const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/user');

let secret = process.env.SECRET_KEY;

passport.use(new BearerStrategy(async (token, done) => {
    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));