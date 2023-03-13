const User = require('../models/user');

exports.findCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: "CUSTOMER" })
        res.json(customers)
    } catch (error) {
        return res.status(500).json({ message: 'Error Server' })
    }
};

exports.findCustomerById = async (req, res) => {
    try {
        const customer = await User.findById(req.params.id);
        res.json(customer);
    } catch (error) {
        return res.status(500).json({ message: 'Error Server' })
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Customer updated', customer: updatedCustomer });
    } catch (error) {
        return res.status(500).json({ message: 'Error Server' })
    }
};

exports.removeCustomer = async (req, res) => {
    try {
        const deletedCustomer = await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Customer deleted', customer: deletedCustomer });
    } catch (error) {
        return res.status(500).json({ message: 'Error Server' })
    }
};