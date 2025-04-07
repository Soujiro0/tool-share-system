import { API_BASE } from './config';

export async function getAllRequests() {
    try {
        const response = await fetch(`${API_BASE}/borrow-request.php`);

        if (!response.ok) {
            throw new Error(data.message || "Fetching Failed");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error Fetching Requests", error);
        throw error;
    }
}

export async function getUserRequests(userId) {
    try {
        const params = new URLSearchParams({ user_id: userId });
        const response = await fetch(`${API_BASE}/borrow-request.php?${params.toString()}`);

        if (!response.ok) {
            throw new Error(data.message || "Fetching Failed");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error Fetching Requests", error);
        throw error;
    }
}

export async function createRequest(requestsData) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestsData),
        });

        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error("Error Creating Requests", error);
        throw error;
    }
}

export async function updateRequestFaculty(requestId, updatedData) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request.php/faculty/${requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error Updating Requests", error);
        throw error;
    }
}

export async function approveRequestByAdmin(requestId, updatedData) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request.php/admin/${requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error Updating Requests", error);
        throw error;
    }
}

export async function deleteRequest(requestId) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request.php/${requestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error Deleting Requests", error);
        throw error;
    }
}

