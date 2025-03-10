import { API_BASE } from "./config";

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