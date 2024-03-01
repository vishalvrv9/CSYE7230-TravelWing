const express = require('express');
const router = express.Router();
const routesV1 = require('./v1');
const auth = require('../controllers/auth.controller');



/**
 * GET health checkup
 */
router.get('/api/health', (req, res) => res.send({ status: 'OK' }));
router.post('/signup', auth.signup);
router.post('/login', auth.signin);
// /deleteUserIternary
// /getIternaryById
// router.get('/getIternary',checktoken,)
// router.get('deleteIternaryID',checktoken,)
router.use(routesV1);


module.exports = router;