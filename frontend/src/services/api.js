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

// SETTINGS SECTION
export const insertSettings = async (payload) => {
  const response = await fetch(`${API_BASE}/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Could not save settings.");
  return data;
};

//WORKOUT / WEIGHT LOGGING SECTION
