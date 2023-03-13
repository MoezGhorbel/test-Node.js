const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error Server' });
  }
};

exports.findProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Error Server' })
  }
};

exports.findProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated', product: product });
  } catch (error) {
    return res.status(500).json({ message: 'Error Server' });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};