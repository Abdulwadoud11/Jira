exports.handleBusinessLogic = async (jiraInfo) => {
    const { status, key, actionPerformedBy } = jiraInfo;
    const normalizedStatus = status.toLowerCase();
    console.log(`${key} is now ${status} (Action by: ${actionPerformedBy})`);
};