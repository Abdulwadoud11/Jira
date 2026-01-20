var axios = require('axios');
require('dotenv').config();

const username = process.env.ATLASSIAN_USERNAME;
const password = process.env.ATLASSIAN_API_KEY;
const domain = process.env.DOMAIN;

const auth = {
  username: username,
  password: password
};

// Get all issues in a particular project
async function getIssues() {
  try {
    const baseUrl = 'https://' + domain + '.atlassian.net';

    const response = await axios.get(
      `${baseUrl}/rest/api/3/search/jql`,
      {
        auth,
        params: {
          jql: 'project = KAN AND status = "In Progress"',
          maxResults: 50,
          fields: 'summary,status,assignee,created' // limit fields
        }
      }
    );

    return response.data.issues;

  } catch (error) {
    console.log('error:');
    console.log(error.response?.data || error.message);
  }
}

module.exports = getIssues;