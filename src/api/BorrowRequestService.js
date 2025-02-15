import { API_BASE } from './config';

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
        return await response.json();
    } catch (error) {
        console.error('Get Borrow Requests API error:', error);
        throw error;
    }
}

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
        return await response.json();
    } catch (error) {
        console.error('Create Borrow Request API error:', error);
        throw error;
    }
}
