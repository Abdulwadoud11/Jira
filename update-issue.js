const axios = require("axios");
require("dotenv").config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = { username, password };

async function updateIssue(params) {
    const { issueKey, summary, description, assignee, labels } = params;

    try {
        const baseUrl = `https://${domain}.atlassian.net`;

        // Build the fields object dynamically
        const fields = {};
        if (summary) fields.summary = summary;
        if (description)
            fields.description = {
                type: "doc",
                version: 1,
                content: [
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: description }]
                    }
                ]
            };
        if (assignee) fields.assignee = { id: assignee }; // accountId
        if (labels) fields.labels = labels;

        const response = await axios.put(
            `${baseUrl}/rest/api/3/issue/${issueKey}`,
            { fields },
            { auth, headers: { "Content-Type": "application/json" } }
        );

        console.log(`Issue ${issueKey} updated successfully!`, response.status);
        return response.statusCode;

    } catch (error) {
        console.error(
            "Jira error:",
            error.response?.data || error.message
        );
        throw error; // rethrow so caller knows it failed
    }
}

module.exports = updateIssue;
