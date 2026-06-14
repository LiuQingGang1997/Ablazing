import { useState, useEffect } from 'react';
import axios from 'axios';

export interface DynamicNews {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  dynamicType: string;
  dynamicTypeName: string;
  publishDate: string;
  viewCount: number;
  sortOrder: number;
}

export const useDynamicNews = (limit?: number) => {
  const [news, setNews] = useState<DynamicNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (limit) {
      params.append('limit', String(limit));
    }

    axios.get(`/api/dynamic-news/frontend/list?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          setNews([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch dynamic news:', err);
        setNews([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [limit]);

  return { news, loading };
};