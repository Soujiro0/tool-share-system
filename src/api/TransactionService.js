import { API_BASE } from './config';

export async function createTransaction(token, transactionData) {
    try {
        const response = await fetch(`${API_BASE}/transaction.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ "request_id" : transactionData }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error creating transaction');
        }
        return await response.json();
    } catch (error) {
        console.error('Create Transaction API error:', error);
        throw error;
    }
}

export async function getTransactions(token) {
    try {
        const response = await fetch(`${API_BASE}/transaction.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error fetching transactions');
        }
        return await response.json();
    } catch (error) {
        console.error('Get Transactions API error:', error);
        throw error;
    }
}

export async function updateTransactionStatus(token, transactionId, status) {
    try {
        const response = await fetch(`${API_BASE}/transaction.php?transaction_id=${transactionId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ "transaction_status" : status }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error updating transaction status');
        }
        return await response.json();
    } catch (error) {
        console.error('Update Transaction Status API error:', error);
        throw error;
    }
}