import { useState, useEffect } from 'react';
import axios from 'axios';

export const useReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/customer-reviews', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const data = res.data?.data || res.data;
        if (data && Array.isArray(data) && data.length > 0) {
          setReviews(data.map((item: any) => ({
            id: item.id,
            content: item.content,
            avatar: item.avatarUrl,
            author: item.customerName,
            role: `${item.companyName} ${item.position}`
          })));
        } else {
          setReviews([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch reviews:', err);
        setReviews([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { reviews, loading };
};