import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBrands = () => {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/brands', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const data = res.data?.data || res.data;
        if (data && Array.isArray(data) && data.length > 0) {
          setBrands(data);
        } else {
          setBrands([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch brands:', err);
        setBrands([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { brands, loading };
};