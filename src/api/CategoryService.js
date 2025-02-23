import { API_BASE } from './config';

/**
 * Fetches the list of categories from the API.
 * 
 * @param {string} token - The authentication token.
 * @returns {Promise<Object[]>} A list of categories.
 * @throws {Error} If fetching categories fails.
 */
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
        return await response.json();
    } catch (error) {
        console.error('Get Categories API error:', error);
        throw error;
    }
}

/**
 * Creates a new category.
 * 
 * @param {string} token - The authentication token.
 * @param {Object} categoryData - The category data to create.
 * @returns {Promise<Object>} The created category data.
 * @throws {Error} If creating the category fails.
 */
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

        return await response.json();
    } catch (error) {
        console.error('Create Category API error:', error);
        throw error;
    }
}

/**
 * Updates an existing category by ID.
 * 
 * @param {string} token - The authentication token.
 * @param {number} id - The ID of the category to update.
 * @param {Object} categoryData - The updated category data.
 * @returns {Promise<Object>} The updated category data.
 * @throws {Error} If updating the category fails.
 */
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

/**
 * Deletes a category by ID.
 * 
 * @param {string} token - The authentication token.
 * @param {number} id - The ID of the category to delete.
 * @returns {Promise<Object>} The API response after deletion.
 * @throws {Error} If deleting the category fails.
 */
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