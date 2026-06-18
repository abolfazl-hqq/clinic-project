const BASE_URL = 'http://127.0.0.1:8000/api/accounts';

export const authService = {
    login: async (username, password) => {
        const response = await fetch(`${BASE_URL}/login/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });
        const data = await response.json();
        if (!response.ok) throw data;
        if (data.access) {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
        }
        return data;
    },

    register: async (userData) => {
        const response = await fetch(`${BASE_URL}/register/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) throw data;
        if (data.tokens?.access) {
            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);
        }
        return data;
    },

    // FIX: تمدید خودکار توکن با refresh token
    refreshToken: async () => {
        const refresh = localStorage.getItem('refresh_token');
        if (!refresh) throw new Error('No refresh token');
        const response = await fetch(`${BASE_URL}/token/refresh/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({refresh})
        });
        const data = await response.json();
        if (!response.ok) throw data;
        localStorage.setItem('access_token', data.access);
        if (data.refresh) localStorage.setItem('refresh_token', data.refresh);
        return data.access;
    },

    getCurrentUser: async () => {
        let token = localStorage.getItem('access_token');
        let response = await fetch(`${BASE_URL}/profile/`, {
            headers: {'Authorization': `Bearer ${token}`}
        });

        // FIX: اگه 401 بود، refresh token رو امتحان کن
        if (response.status === 401) {
            try {
                token = await authService.refreshToken();
                response = await fetch(`${BASE_URL}/profile/`, {
                    headers: {'Authorization': `Bearer ${token}`}
                });
            } catch {
                throw new Error('Session expired');
            }
        }

        if (!response.ok) throw new Error('Failed to get user');
        return await response.json();
    },

    logout: async () => {
        try {
            const refresh = localStorage.getItem('refresh_token');
            const token = localStorage.getItem('access_token');
            if (refresh && token) {
                await fetch(`${BASE_URL}/logout/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({refresh})
                });
            }
        } catch {}
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },

    isAuthenticated: () => {
        if (typeof window !== 'undefined') {
            return !!localStorage.getItem('access_token');
        }
        return false;
    },
};