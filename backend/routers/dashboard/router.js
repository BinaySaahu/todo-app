const express = require("express");
const router = express.Router();
const dashController = require('../../controller/dashboard/dashboard');
const getDataController = require('../../controller/dashboard/getData');
const middleware = require('../../middleware/verify')

router.put('/dashboard',
    dashController.dash
);
router.get('/getdata',middleware.verify,getDataController.getdata
);

module.exports = router;