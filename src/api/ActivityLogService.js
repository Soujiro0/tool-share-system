import { API_BASE } from './config';

/**
 * Fetches a paginated list of activity logs with optional filters.
 * 
 * @param {string} token - The authentication token.
 * @param {number} limit - The number of logs per page.
 * @param {number} page - The current page number.
 * @param {string} [userType] - The type of user (optional).
 * @param {string} [actionType] - The action type filter (optional).
 * @param {string} [startDate] - The start date filter (optional).
 * @param {string} [endDate] - The end date filter (optional).
 * @param {string} [searchQuery] - The search keyword (optional).
 * @returns {Promise<Object>} The API response containing the activity logs.
 */
export async function getActivityLogs(token, limit, page, userType, actionType, startDate, endDate, searchQuery) {
    try {
        const params = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
            role_id: userType,
        });

        if (actionType) params.append("action_type", actionType);
        if (startDate) params.append("start_date", startDate);
        if (endDate) params.append("end_date", endDate);
        if (searchQuery) params.append("search_query", encodeURIComponent(searchQuery));

        const response = await fetch(
            `${API_BASE}/activity_logs.php?${params.toString()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error fetching activity logs");
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Get Activity Logs API error:", error);
        throw error;
    }
}

/**
 * Fetches a single activity log by its ID.
 * 
 * @param {string} token - The authentication token.
 * @param {number} id - The ID of the activity log to fetch.
 * @returns {Promise<Object>} The activity log data.
 */
export async function getActivityLog(token, id) {
    try {
        const response = await fetch(`${API_BASE}/activity_logs.php?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching activity log');
        }
        return await response.json();
    } catch (error) {
        console.error('Get Activity Log API error:', error);
        throw error;
    }
}

/**
 * Creates a new activity log.
 * 
 * @param {string} token - The authentication token.
 * @param {Object} logData - The activity log data to be created.
 * @returns {Promise<Object>} The response from the API.
 */
export async function createActivityLog(token, logData) {
    try {
        const response = await fetch(`${API_BASE}/activity_logs.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(logData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating activity log');
        }
        return await response.json();
    } catch (error) {
        console.error('Create Activity Log API error:', error);
        throw error;
    }
}

/**
 * Updates an existing activity log.
 * 
 * @param {string} token - The authentication token.
 * @param {number} id - The ID of the activity log to update.
 * @param {Object} logData - The updated activity log data.
 * @returns {Promise<Object>} The updated activity log data.
 */
export async function updateActivityLog(token, id, logData) {
    try {
        const response = await fetch(`${API_BASE}/activity_logs.php?id=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(logData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating activity log');
        }
        return await response.json();
    } catch (error) {
        console.error('Update Activity Log API error:', error);
        throw error;
    }
}

/**
 * Deletes an activity log by ID.
 * 
 * @param {string} token - The authentication token.
 * @param {number} id - The ID of the activity log to delete.
 * @returns {Promise<Object>} The API response after deletion.
 */
export async function deleteActivityLog(token, id) {
    try {
        const response = await fetch(`${API_BASE}/activity_logs.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error deleting activity log');
        }
        return await response.json();
    } catch (error) {
        console.error('Delete Activity Log API error:', error);
        throw error;
    }
}