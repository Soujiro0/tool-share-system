import { API_BASE } from "./config";

export async function getItems() {
    try {
        const response = await fetch(`${API_BASE}/items.php`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching item', error);
        throw error;
    }
}

export async function createItem(itemData) {
    console.log(itemData)
    try {
        const response = await fetch(`${API_BASE}/items.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating item', error);
        throw error;
    }
}

export async function updateItem(itemId, itemData) {
    try {
        const response = await fetch(`${API_BASE}/items.php/${itemId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating item', error);
        throw error;
    }
}

export async function deleteItem(itemId) {
    try {
        const response = await fetch(`${API_BASE}/items.php/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting item', error);
        throw error;
    }
}