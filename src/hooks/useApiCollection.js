import { useEffect, useState } from 'react';

const API_BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api`;

export default function useApiCollection(path) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch(`${API_BASE}${path}`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error(`Unable to load ${path.split('/').pop()}.`);
        return response.json();
      })
      .then(setItems)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message || 'Unable to load content.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [path]);

  return { items, loading, error };
}
