const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/', mainController.getRoot);
router.get('/health', mainController.getHealth);
router.get('/process', mainController.getProcess);

module.exports = router;
