const { extractJiraData } = require('../utilsutils/jiraHandler');
const jiraService = require('../services/jiraService');

exports.receiveWebhook = async (req, res) => {
    try {
        const jiraInfo = extractJiraData(req.body);
        await jiraService.handleBusinessLogic(jiraInfo);

        res.status(200).send('Webhook Processed');
    } catch (error) {
        console.error("Controller Error:", error.message);
        res.status(400).send('Invalid payload');
    }
};