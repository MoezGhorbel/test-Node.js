const express = require('express');
const router = express.Router();
const passport = require('passport');
const authRole = require('../passport/auth');
const { findOrders, findOrderById, removeOrder, order } = require('../controllers/order');

router.post('/createOrder', passport.authenticate('bearer', { session: false }), order)
router.get('/orders', passport.authenticate('bearer', { session: false }), authRole("ADMIN", "CUSTOMER"), findOrders)
router.get('/order/:id', passport.authenticate('bearer', { session: false }), authRole("ADMIN", "CUSTOMER"), findOrderById)
router.delete('/deleteOrder/:id', passport.authenticate('bearer', { session: false }), authRole("ADMIN"), removeOrder)

module.exports = router;