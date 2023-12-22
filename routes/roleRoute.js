const express = require('express');
const router = express.Router();
const rolesRoute = require('../controllers/roleController');

router.get('/', rolesRoute.getAllRoles);

router.get('/:id', rolesRoute.getOneRole);

router.get('/verify', rolesRoute.verifyRole);

router.post('/', rolesRoute.addRole);

router.put('/:id', rolesRoute.updateRole);

router.delete('/:id', rolesRoute.deleteRole);

module.exports = router;