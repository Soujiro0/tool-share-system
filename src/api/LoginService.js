// src/api/LoginService.js
import { API_BASE } from './config';

export async function loginApi(username, password) {
    try {
        const response = await fetch(`${API_BASE}/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}
