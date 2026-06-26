const computeApiBase = () => {
  if (process.env.REACT_APP_API_BASE) return process.env.REACT_APP_API_BASE;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // When developing locally, assume backend runs on :5000
    if (host === "localhost" || host === "127.0.0.1") return "http://localhost:5000/api";
    // In production, use relative path so same origin is used
    return "/api";
  }
  return "http://localhost:5000/api";
};

const API_BASE = computeApiBase();

const handleFetch = async (url, options) => {
  const attempts = new Set();
  attempts.add(url);

  // If a relative /api path was provided, also try explicit local backend hosts
  if (url.startsWith("/api")) {
    attempts.add(`http://localhost:5000${url}`);
    attempts.add(`http://127.0.0.1:5000${url}`);
  } else {
    // If an absolute URL was provided, try swapping localhost/127.0.0.1
    try {
      const u = new URL(url);
      if (u.hostname === "localhost") {
        const alt = new URL(url);
        alt.hostname = "127.0.0.1";
        attempts.add(alt.toString());
      }
      // also add relative fallback
      attempts.add(url.replace(/https?:\/\/.+?\/api/, "/api"));
    } catch (e) {
      // ignore
    }
  }

  let lastErr = null;
  for (const attempt of attempts) {
    if (!attempt) continue;
    try {
      const response = await fetch(attempt, options);
      const contentType = response.headers.get("content-type") || "";
      let data = {};
      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = { message: await response.text() };
      }
      if (!response.ok) {
        throw new Error(data.message || `Request failed: ${response.status}`);
      }
      return data;
    } catch (err) {
      lastErr = err;
    }
  }
  throw new Error(lastErr?.message || "Network error");
};

export const registerUser = async (payload) => {
  return handleFetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

export const loginUser = async (payload) => {
  return handleFetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

// SETTINGS SECTION
export const insertSettings = async (payload, token) => {
  return handleFetch(`${API_BASE}/settings`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
     },
    body: JSON.stringify(payload),
  });
};

export const getSettings = async (token) => {
  return handleFetch(`${API_BASE}/settings`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
  });
};

//WORKOUT / WEIGHT LOGGING SECTION
export const insertWeightLogging = async (payload, token) => {
  return handleFetch(`${API_BASE}/weightLogging`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
     },
    body: JSON.stringify(payload),
  });
};

export const getWeightLogging = async (token) => {
  return handleFetch(`${API_BASE}/weightLogging`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
  });
};

export const insertWorkoutLogging = async (payload, token) => {
  return handleFetch(`${API_BASE}/workout`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
     },
    body: JSON.stringify(payload),
  });
};

export const getWorkoutLogging = async (token) => {
  return handleFetch(`${API_BASE}/workout`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
  });
};

export const getExercises = async (token, filters) => {
  const params = new URLSearchParams()
  if (filters.muscle) params.append('muscle', filters.muscle)
  if (filters.level) params.append('level', filters.level)
  if (filters.category) params.append('category', filters.category)

  return handleFetch(`${API_BASE}/workout?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
  });
};

// STARTUP SECTION

export const insertStartup = async (payload, token) => {
  return handleFetch(`${API_BASE}/startup`, {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
};

export const getStartup = async (token) => {
  return handleFetch(`${API_BASE}/startup`, {
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
  });
};

// OVERVIEW SECTION

export const insertOverview = async (payload, token) => {
  return handleFetch(`${API_BASE}/overview`, {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
    body: JSON.stringify(payload),
  });
};

export const getOverview = async (token) => {
  return handleFetch(`${API_BASE}/overview`, { 
    method: "GET",
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token}`
    },
  });
};

// NUTRITION SECTION

export const nutritionAPI = {
  getAll: async (fromDate, toDate) => {
    const token = localStorage.getItem('token');
    let url = `${API_BASE}/nutrition`;
    if (fromDate && toDate) {
      url += `?from=${fromDate}&to=${toDate}`;
    }
    return handleFetch(url, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` },
    });
  },
  add: async (entry) => {
    const token = localStorage.getItem('token');
    return handleFetch(`${API_BASE}/nutrition`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(entry),
    });
  },
  delete: async (meal, date) => {
    const token = localStorage.getItem('token');
    let url = `${API_BASE}/nutrition?meal=${encodeURIComponent(meal)}`;
    if (date) {
      url += `&date=${date}`;
    }
    return handleFetch(url, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
  },
};


