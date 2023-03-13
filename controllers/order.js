const Product = require('../models/product');
const Order = require('../models/order');

exports.order = async (req, res) => {
    try {
        let price = 0;
        await Promise.all(req.body.products.map(async (item) => {
            const product = await Product.findById(item);
            if (!product) {
                throw new Error(`Product with ID ${item} not found`);
            }
            if (product.quantity < 1) {
                throw new Error(`Product ${product.name} is out of stock`);
            }
            await Product.findByIdAndUpdate(product._id, { $inc: { quantity: -1 } }, { new: true })
            price += product.price
        }))
        const order = await Order.create({ totalPrice: price, products: req.body.products, customer: req.user._id });
        res.status(200).json({ message: 'The order has been made', order: order });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server Error' });
    }
};

exports.findOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: 'Error Server' })
    }
};

exports.findOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            throw new Error(`Order with ID number ${req.params.id} not found`);
        }
        res.send(order);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error Server' })
    }
};

exports.removeOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        await order.remove();
        res.status(200).json({ message: 'Order removed' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message || 'Server Error' });
    }
};