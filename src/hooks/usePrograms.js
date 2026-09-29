import { useEffect, useState } from 'react';

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`;

export async function fetchPrograms(signal) {
  const response = await fetch(`${API_BASE}/programs`, { signal });
  if (!response.ok) throw new Error('Course catalog is temporarily unavailable. Please try again shortly.');
  return response.json();
}

export default function usePrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetchPrograms(controller.signal)
      .then(setPrograms)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message || 'Unable to load courses.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  return { programs, loading, error };
}
