import { API_BASE } from './config';

export async function getBorrowRequests(token) {
    try {
        const response = await fetch(`${API_BASE}/borrow_request.php`, {
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
        console.log(data);
        return data;
    } catch (error) {
        console.error('Get Borrow Requests API error:', error);
        throw error;
    }
}

export async function createBorrowRequest(token, borrowData) {
    try {
        const response = await fetch(`${API_BASE}/borrow_request.php`, {
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
        console.log(data);
        return data;
    } catch (error) {
        console.error('Create Borrow Request API error:', error);
        throw error;
    }
}

export async function updateBorrowRequestStatus(token, requestId, status) {
    try {
        const response = await fetch(`${API_BASE}/borrow_request.php?request_id=${requestId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ "request_status" : status }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating borrow request status');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Update Borrow Request Status API error:', error);
        throw error;
    }
}
