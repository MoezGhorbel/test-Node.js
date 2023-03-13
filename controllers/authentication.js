const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body
        const found = await User.findOne({ email: email })
        if (found) {
            res.status(400).json({ message: 'Email exist, Do you want to login?' })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        console.log(password, hashedPassword)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ message: 'Server Error' })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "user do not exist" })
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) { return res.status(400).json({ message: "Error, please make sure that your email and password are correct" }) };
        const data = {
            userId: user._id,
            userEmail: user.email
        }
        const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ user: user, token: token });
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
};