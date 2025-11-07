const express = require('express');
const router = express.Router();

router.use('/admin', require('./adminRoutes'));
router.use('/student', require('./studentRoutes'));

module.exports = router;