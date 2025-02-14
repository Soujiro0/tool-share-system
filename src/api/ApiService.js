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
