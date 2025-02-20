import { API_BASE } from './config';

export async function getActivityLogs(token, limit = 10, page = 1, userType = "", actionType = "", startDate = "", endDate = "", searchQuery = "") {
    try {
        const response = await fetch(
            `${API_BASE}/activity_logs.php?user_type=${userType}&limit=${limit}&page=${page}&action_type=${actionType}&start_date=${startDate}&end_date=${endDate}&search_query=${searchQuery}`,
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
        return data;
    } catch (error) {
        console.error("Get Activity Logs API error:", error);
        throw error;
    }
}

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
