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

export interface DynamicNewsResponse {
  content: DynamicNews[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export const useDynamicNews = (page?: number, size?: number) => {
  const [news, setNews] = useState<DynamicNews[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page !== undefined) {
      params.append('page', String(page));
    }
    if (size !== undefined) {
      params.append('size', String(size));
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
        if (data && Array.isArray(data.content)) {
          setNews(data.content);
          setTotalPages(data.totalPages || 0);
          setTotalElements(data.totalElements || 0);
        } else if (Array.isArray(data)) {
          setNews(data);
          setTotalPages(1);
          setTotalElements(data.length);
        } else {
          setNews([]);
          setTotalPages(0);
          setTotalElements(0);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch dynamic news:', err);
        setNews([]);
        setTotalPages(0);
        setTotalElements(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, size]);

  return { news, loading, totalPages, totalElements };
};