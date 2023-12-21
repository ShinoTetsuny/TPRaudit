const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionController');

router.get('/', optionController.getAllOptions);
router.get('/:id', optionController.getOneOption);

router.post('/', optionController.createOption);

router.put('/:id', optionController.editOption);

router.delete('/:id', optionController.deleteOption);

module.exports = router;