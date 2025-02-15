// src/api/ItemService.js
import { API_BASE } from './config';

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
        return await response.json();
    } catch (error) {
        console.error('Get Items API error:', error);
        throw error;
    }
}

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
