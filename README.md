# Jira Integration API

A Node.js application for integrating with Atlassian Jira, providing REST API endpoints and webhook handling.

## Features

- Create, read, update, and delete Jira issues and projects
- Webhook support for Jira events
- Status management and transitions
- User and project management

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```env
ATLASSIAN_USERNAME=your-email@example.com
ATLASSIAN_API_KEY=your-api-token
DOMAIN=your-domain
PORT=3000
```

Get your API token from [Atlassian Account Settings](https://id.atlassian.com/manage-profile/security/api-tokens).

## Usage

Start the server:
```bash
npm start
```

### API Endpoint

**POST** `/api/jira/webhook` - Receives and processes Jira webhook events

### Available Functions

Uncomment functions in `app.js` to use:

- `getUsersFunc()` - Get all users (needed for account IDs)
- `createProject("KEY")` - Create a new project
- `createIssueAndUpdate()` - Create issue and set status to "In Progress"
- `getIssuesFunc()` - Get all issues
- `getRecentProjects()` - Get recent projects
- `getIssueByIDFunc('PROJ-1')` - Get specific issue
- `getTransitionsFunc('PROJ-1')` - Get available transitions
- `updateStatusFunc('PROJ-1', '21')` - Update status (11=To Do, 21=In Progress, 31=In Review, 41=Done)
- `updateIssue1()` - Update issue details
- `deleteIssueByIDFunc('PROJ-1')` - Delete issue

## Webhook Setup

1. Go to Jira Project Settings → Webhooks
2. Add webhook URL: `http://your-server:3000/api/jira/webhook`
3. Select events to receive

## Dependencies

- express, axios, dotenv, request
