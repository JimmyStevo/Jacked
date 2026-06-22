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
  return handleFetch(`${API_BASE}/auth/register`, {
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

export const insertSettings = async (payload) => {
  return handleFetch(`${API_BASE}/settings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};
