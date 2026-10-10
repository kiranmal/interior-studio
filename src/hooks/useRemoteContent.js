import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || '';

export default function useRemoteContent(type, fallback = []) {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    let alive = true;
    fetch(`${API}/api/content?type=${encodeURIComponent(type)}`)
      .then((res) => res.ok ? res.json() : Promise.reject(new Error('Content unavailable')))
      .then((data) => { if (alive && Array.isArray(data.items) && data.items.length) setItems(data.items); })
      .catch(() => {});
    return () => { alive = false; };
  }, [type]);

  return items;
}
