const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

router.get('/', modelController.getAllModels);
router.get('/:id', modelController.getOneModel);

router.post('/', modelController.createModel);

router.put('/:id', modelController.editModel);

router.delete('/:id', modelController.deleteModel);

module.exports = router;