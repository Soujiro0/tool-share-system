import { API_BASE } from './config';

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
        console.error('Get Categories API error:', error);
        throw error;
    }
}

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
        console.error('Create Category API error:', error);
        throw error;
    }
}

export async function updateCategory(token, id, categoryData) {
    try {
        const response = await fetch(`${API_BASE}/categories.php?id=${id}`, {
            method: 'PUT',
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
        console.error('Update Category API error:', error);
        throw error;
    }
}

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
        console.error('Delete Category API error:', error);
        throw error;
    }
}
