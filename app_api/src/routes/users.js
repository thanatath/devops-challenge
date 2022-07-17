const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();

router.post('/user', controller.createUser);
router.get('/user/:username', controller.getUser);
router.delete('/user', controller.deleteUser);

module.exports = router;