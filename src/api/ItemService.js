import { API_BASE } from './config';

/**
 * Fetches a list of items with optional filters, pagination, and sorting.
 * 
 * @param {string} token - The authentication token.
 * @param {number} limit - The number of items per page.
 * @param {number} page - The current page number.
 * @param {string} [category] - The category filter (optional).
 * @param {string} [searchQuery] - The search keyword (optional).
 * @param {string} [sortColumn] - The column to sort by (optional).
 * @param {string} [sortOrder] - The sorting order ('asc' or 'desc', optional).
 * @returns {Promise<object>} - The response data containing items.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function getItems(token, limit, page, category, searchQuery, sortColumn, sortOrder) {
    try {
        const params = new URLSearchParams({
            limit: limit.toString(),
            page: page.toString(),
        });

        if (category) params.append("category", category);
        if (searchQuery) params.append("search", encodeURIComponent(searchQuery));
        if (sortColumn) params.append("sort_by", sortColumn);
        if (sortOrder) params.append("order", sortOrder.toUpperCase());

        const response = await fetch(`${API_BASE}/items.php?${params.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching items');
        }
        return await response.json();
    } catch (error) {
        console.error('Get Items API error:', error);
        throw error;
    }
}

/**
 * Creates a new item in the inventory.
 * 
 * @param {string} token - The authentication token.
 * @param {object} itemData - The item details to be created.
 * @returns {Promise<object>} - The response data containing the created item.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function createItem(token, itemData) {
    try {
        const response = await fetch(`${API_BASE}/items.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(itemData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating item');
        }
        return await response.json();
    } catch (error) {
        console.error('Create Item API error:', error);
        throw error;
    }
}

/**
 * Updates an existing item in the inventory.
 * 
 * @param {string} token - The authentication token.
 * @param {number} itemId - The ID of the item to update.
 * @param {object} updatedData - The updated item details.
 * @returns {Promise<object>} - The response data containing the updated item.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function updateItem(token, itemId, updatedData) {
    try {
        const response = await fetch(`${API_BASE}/items.php?id=${itemId}`, {
            method: 'PATCH', // or PUT if your API supports it
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating item');
        }
        return await response.json();
    } catch (error) {
        console.error('Update Item API error:', error);
        throw error;
    }
}

/**
 * Deletes an item from the inventory.
 * 
 * @param {string} token - The authentication token.
 * @param {number} itemId - The ID of the item to delete.
 * @returns {Promise<object>} - The response data confirming deletion.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function deleteItem(token, itemId) {
    try {
        const response = await fetch(`${API_BASE}/items.php?id=${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error deleting item');
        }
        return await response.json();
    } catch (error) {
        console.error('Delete Item API error:', error);
        throw error;
    }
}

/**
 * Processes the return of a borrowed item.
 * 
 * @param {object} transactionData - The details of the return transaction.
 * @param {string} token - The authentication token.
 * @returns {Promise<object>} - The response data confirming the return.
 * @throws {Error} - Throws an error if the request fails.
 */
export async function processReturn(transactionData, token) {
    try {
        const response = await fetch(`${API_BASE}/return.php`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(transactionData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error processing return');
        }
        return await response.json();
    } catch (error) {
        console.error('Process Return API error:', error);
        throw error;
    }
}
