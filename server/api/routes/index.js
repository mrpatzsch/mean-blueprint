var express = require('express');
var router = express.Router();
var bpModelCtrl = require('../controllers/bpModel');

router.get('/bpModels', bpModelCtrl.all);
router.post('/bpModels', bpModelCtrl.create);
router.put('/bpModels/:id', bpModelCtrl.updateSingle);
router.delete('/bpModels/:id', bpModelCtrl.deleteSingle);

module.exports = router;
