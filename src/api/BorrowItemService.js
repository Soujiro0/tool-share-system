import { API_BASE } from "./config";

export async function getItemHistory(unitId) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request-items.php/?unit_id=${unitId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching item history', error);
        throw error;
    }
}

export async function getAssignUnitsByRequestId(requestId) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request-items.php/?request_id=${requestId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching item history', error);
        throw error;
    }
}

export async function createItemRequest(requestData) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request-items.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error creating item request', error);
        throw error;
    }
}

export async function deleteItemRequest(itemRequestId) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request-items.php/${itemRequestId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error creating item request', error);
        throw error;
    }
}

export async function assignUnitToRequest(assignData) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request-items.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(assignData),
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error creating item request', error);
        throw error;
    }
}

export async function returnUnits(requestId, returnData) {
    try {
        const response = await fetch(`${API_BASE}/borrow-request-items.php/return/${requestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(returnData),
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error returning item request', error);
        throw error;
    }
}

