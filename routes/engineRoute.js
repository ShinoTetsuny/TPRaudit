const express = require('express');
const router = express.Router();
const engineController = require('../controllers/engineController');

router.get('/', engineController.getAllEngines);
router.get('/:id', engineController.getOneEngine);

router.post('/', engineController.createEngine);

router.put('/:id', engineController.editEngine);

router.delete('/:id', engineController.deleteEngine);

module.exports = router;