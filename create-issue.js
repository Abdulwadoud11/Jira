var axios = require('axios');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME
const password = process.env.ATLASSIAN_API_KEY
const domain = process.env.DOMAIN

const auth = {
  username: username,
  password: password
};

//creates an issue in Jira 
async function createIssue(projectKey, issueType, summary, description) {
  try {
    const baseUrl = `https://${domain}.atlassian.net`;

    const data = {
      fields: {
        project: { key: projectKey },
        summary,
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "First paragraph" }]
            },
            {
              type: "paragraph",
              content: [{ type: "text", text: "Second paragraph" }]
            }
          ]
        },
        issuetype: { name: issueType }
      }
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      auth: auth
    };

    const response = await axios.post(
      `${baseUrl}/rest/api/3/issue`,
      data,
      config
    );

    return response.data.key;

  } catch (error) {
    console.error(
      "Jira error:",
      error.response?.data || error.message
    );
  }
}


module.exports = createIssue;