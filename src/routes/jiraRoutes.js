const express = require('express');
const router = express.Router();
const jiraController = require('../controllers/jiraController');

router.post('/webhook', jiraController.receiveWebhook);

module.exports = router;