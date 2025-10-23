const express = require('express');
const router = express.Router();
const {
    cuentasTotales,
    cuentaPorId,
    cuentasBalance
} = require('./cuentas');

router.get('/cuentasBalance', cuentasBalance);  
router.get('/cuenta/:id', cuentaPorId);         
router.get('/cuentas', cuentasTotales); 

module.exports = router;