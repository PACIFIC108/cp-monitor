export const API_BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

export const apiFetch = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const error = new Error(body?.message || body || 'Request failed');
    error.status = response.status;
    error.details = body?.errors;
    throw error;
  }
  return body;
};

export const eventStreamUrl = (path) => `${API_BASE}${path}`;
