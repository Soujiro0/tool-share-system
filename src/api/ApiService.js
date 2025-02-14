// src/api/api.js

const API_BASE = 'http://localhost/test-server/api/routes'; // Adjust to your API base URL

/**
 * Login API: POST /api/login.php
 * Expects: { username, password }
 * Returns: { token }
 */
export async function loginApi(username, password) {
    try {
        const response = await fetch(`${API_BASE}/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        const data = await response.json();
        console.log(data.token);
        return data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}

/**
 * Get Borrow Requests API: GET /api/borrow-requests.php
 * Requires JWT Bearer token in Authorization header.
 */
export async function getBorrowRequests(token) {
    try {
        const response = await fetch(`${API_BASE}/borrow-requests.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching borrow requests');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Get Borrow Requests API error:', error);
        throw error;
    }
}

/**
 * Create Borrow Request API: POST /api/borrow-requests.php
 * Requires JWT Bearer token in Authorization header.
 * Expects a payload with: { student_name, course_year, instructor_id, purpose }
 */
export async function createBorrowRequest(borrowData, token) {
    try {
        const response = await fetch(`${API_BASE}/borrow-requests.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(borrowData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating borrow request');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Create Borrow Request API error:', error);
        throw error;
    }
}

/**
 * Get Items API: GET /api/items.php
 * Requires JWT Bearer token in Authorization header.
 */
export async function getItems(token, limit = 10, page = 1) {
    try {
        const response = await fetch(`${API_BASE}/items.php?limit=${limit}&page=${page}`, {
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
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Get Items API error:', error);
        throw error;
    }
}

/**
 * Create Item API: POST /api/items.php
 * Expects item data in the request body.
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
        const data = await response.json();
        console.log('Create Item:', data);
        return data;
    } catch (error) {
        console.error('Create Item API error:', error);
        throw error;
    }
}

/**
 * Update Item API: PATCH /api/items.php?id={itemId}
 * Expects updated item data in the request body.
 */
export async function updateItem(token, itemId, updatedData) {
    try {
        const response = await fetch(`${API_BASE}/items.php?id=${itemId}`, {
            method: 'PATCH', // or PUT if your API expects PUT
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
        const data = await response.json();
        console.log('Update Item:', data);
        return data;
    } catch (error) {
        console.error('Update Item API error:', error);
        throw error;
    }
}

/**
 * Delete Item API: DELETE /api/items.php?id={itemId}
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
        const data = await response.json();
        console.log('Delete Item:', data);
        return data;
    } catch (error) {
        console.error('Delete Item API error:', error);
        throw error;
    }
}

/**
 * Process Return API: PATCH /api/return.php
 * Requires JWT Bearer token in Authorization header.
 * Expects payload: { transaction_id, damage_report (optional) }
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
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Process Return API error:', error);
        throw error;
    }
}

/**
 * Create a new category.
 * @param {string} token - The JWT token.
 * @param {Object} categoryData - The category data, e.g., { name: "New Category" }.
 * @returns {Object} - Response data from the API.
 */
export async function createCategory(token, categoryData) {
    try {
        const response = await fetch(`${API_BASE}/categories.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(categoryData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating category');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('APIService createCategory error:', error);
        throw error;
    }
}

/**
 * Fetch all categories.
 * @param {string} token - The JWT token.
 * @returns {Array} - An array of categories.
 */
export async function getCategories(token) {
    try {
        const response = await fetch(`${API_BASE}/categories.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching categories');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('APIService getCategories error:', error);
        throw error;
    }
}

/**
 * Update an existing category.
 * @param {string} token - The JWT token.
 * @param {number} id - The ID of the category to update.
 * @param {Object} categoryData - The updated category data.
 * @returns {Object} - Response data from the API.
 */
export async function updateCategory(token, id, categoryData) {
    try {
        const response = await fetch(`${API_BASE}/categories.php?id=${id}`, {
            method: 'PUT', // or 'PATCH' if that's what your API supports
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(categoryData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating category');
        }
        return await response.json();
    } catch (error) {
        console.error('APIService updateCategory error:', error);
        throw error;
    }
}

/**
 * Delete a category.
 * @param {string} token - The JWT token.
 * @param {number} id - The ID of the category to delete.
 * @returns {Object} - Response data from the API.
 */
export async function deleteCategory(token, id) {
    try {
        const response = await fetch(`${API_BASE}/categories.php?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error deleting category');
        }
        return await response.json();
    } catch (error) {
        console.error('APIService deleteCategory error:', error);
        throw error;
    }
}
