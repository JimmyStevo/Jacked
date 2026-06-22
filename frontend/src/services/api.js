const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

export const registerUser = async (payload) => {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Registration failed.");
  return data;
};

export const loginUser = async (payload) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed.");
  return data;
};

/* Nutrition API */

export const nutritionAPI = {
    getAll: async () => {
        const res = await fetch(`${API_BASE}/nutrition`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // Return empty array if null/undefined
        return data || [];
    },
    add: async (entry) => {
        const res = await fetch(`${API_BASE}/nutrition`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    },
    delete: async (meal) => {
        const res = await fetch(`${API_BASE}/nutrition/${meal}`, { method: 'DELETE' });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    },
};

/* Settings API */

export const settingsAPI = {
    insert: async (payload) => {
        const response = await fetch(`${API_BASE}/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return response.json();
    },
    getAll: async () => {
        const response = await fetch(`${API_BASE}/settings`);
        return response.json();
    },
};
