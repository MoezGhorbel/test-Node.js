const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        default: 0
    },
    Products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    customer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Order', orderSchema);