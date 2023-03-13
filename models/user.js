const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
        require: [true, 'required!']
    },
    email: {
        type: String,
        require: [true, 'required!']
    },
    password: {
        type: String,
        require: [true, 'required!']
    },
    role: {
        type: String,
        enum: ["ADMIN", "CUSTOMER"],
        default: "CUSTOMER"
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('User', authSchema);