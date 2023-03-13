const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: [true, 'required!']
    },
    description: {
        type: String,
        require: [true, 'required!']
    },
    quantity: {
        type: Number,
        require: [true, 'required!']
    },
    price: {
        type: Number,
        require: [true, 'required!']
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Product', productSchema);