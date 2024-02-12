const express = require('express');
const router = express.Router();
const routesV1 = require('./v1');



/**
 * GET health checkup
 */
router.get('/api/health', (req, res) => res.send({ status: 'OK' }));

router.use(routesV1);


module.exports = router;