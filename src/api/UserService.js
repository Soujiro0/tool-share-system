import { API_BASE } from './config';

/**
 * Fetches a list of users with optional filters, pagination, and sorting.
 *
 * @param {string} token - The authentication token.
 * @param {number} limit - The number of users per page.
 * @param {number} page - The current page number.
 * @param {number} [roleId] - The role ID to filter users (optional).
 * @param {string} [searchQuery] - The search keyword (optional).
 * @param {string} [sortColumn] - The column to sort by (optional).
 * @param {string} [sortOrder] - The sorting order ('asc' or 'desc', optional).
 * @returns {Promise<object>} - The response data containing users.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function getUsers(token, roleId) {
    try {
        const params = new URLSearchParams({});

        if (roleId) params.append("role_id", roleId.toString());

        const response = await fetch(`${API_BASE}/users.php?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching users');
        }
        return await response.json();
    } catch (error) {
        console.error('Get Users API error:', error);
        throw error;
    }
}

