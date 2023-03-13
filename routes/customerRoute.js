const express = require('express');
const router = express.Router();
const passport = require('passport');
const authRole = require('../passport/auth');
const { findCustomers, findCustomerById, updateCustomer, removeCustomer } = require('../controllers/customer');

router.get('/customers', passport.authenticate('bearer', { session: false }), authRole("ADMIN"), findCustomers)
router.get('/customer/:id', passport.authenticate('bearer', { session: false }), authRole(["ADMIN", "CUSTOMER"]), findCustomerById)
router.put('/updateCustomer/:id', passport.authenticate('bearer', { session: false }), authRole("ADMIN"), updateCustomer)
router.delete('/deleteCustomer/:id', passport.authenticate('bearer', { session: false }), authRole("ADMIN"), removeCustomer)

module.exports = router;