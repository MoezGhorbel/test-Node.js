const express = require('express');
const router = express.Router();
const passport = require('passport');
const authRole = require('../passport/auth');
const { findProducts, findProductById, updateProduct, removeProduct, createProduct } = require('../controllers/product');

router.post('/createProduct', passport.authenticate('bearer', { session: false }), authRole("ADMIN"), createProduct)
router.get('/products', findProducts)
router.get('/product/:id', findProductById)
router.put('/updateProduct/:id', passport.authenticate('bearer', { session: false }), authRole("ADMIN"), updateProduct)
router.delete('/deleteProduct/:id', passport.authenticate('bearer', { session: false }), authRole("ADMIN"), removeProduct)

module.exports = router;