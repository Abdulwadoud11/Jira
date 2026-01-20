const extractJiraData = (body) => {
    if (!body || !body.issue) {
        throw new Error("Invalid Jira payload");
    }
    const { issue, changelog, user } = body;
    return {
        key: issue.key,
        id: issue.id,
        project: issue.fields.project.name,
        summary: issue.fields.summary,
        status: issue.fields.status.name,
        priority: issue.fields.priority?.name || 'None',
        issueType: issue.fields.issuetype.name,
        description: issue.fields.description,
        assignee: issue.fields.assignee?.displayName || 'Unassigned',
        reporter: issue.fields.reporter?.displayName,
        actionPerformedBy: user?.displayName,
        changes: changelog ? changelog.items.map(item => ({
            field: item.field, from: item.fromString, to: item.toString
        })) : []
    };
};

module.exports = { extractJiraData };