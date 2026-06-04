import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMallBrands = (brandId?: number) => {
  const [data, setData] = useState<{ brands: any[]; currentBrand: any; productTypes: any[]; scenes: any[] }>({
    brands: [],
    currentBrand: null,
    productTypes: [],
    scenes: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = brandId ? `/api/mall-brands/frontend/detail?brandId=${brandId}` : '/api/mall-brands/frontend/detail';
    axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const responseData = res.data?.data || res.data;
        setData({
          brands: responseData.brands || [],
          currentBrand: responseData.currentBrand || null,
          productTypes: responseData.productTypes || [],
          scenes: responseData.scenes || [],
        });
      })
      .catch((err) => {
        console.error('Failed to fetch mall brands:', err);
        setData({ brands: [], currentBrand: null, productTypes: [], scenes: [] });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [brandId]);

  return { ...data, loading };
};

export const useProductScenes = () => {
  const [scenes, setScenes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/product-scenes/frontend/list', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const responseData = res.data?.data || res.data;
        setScenes(Array.isArray(responseData) ? responseData : []);
      })
      .catch((err) => {
        console.error('Failed to fetch product scenes:', err);
        setScenes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { scenes, loading };
};

export const useProductDetail = (productId: string | undefined) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    axios.get(`/api/products/frontend/detail?id=${productId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const responseData = res.data?.data || res.data;
        if (responseData && responseData.id) {
          setProduct(responseData);
        } else {
          setError('Product not found');
          setProduct(null);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch product detail:', err);
        if (err.response?.status === 404) {
          setError('Product not found');
        } else {
          setError('Failed to load product');
        }
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  return { product, loading, error };
};

export const useProductsSearch = (params: { brandId?: number; typeId?: number; sceneId?: number; parameterKey?: string; parameterValue?: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if (params.brandId) query.append('brandId', params.brandId.toString());
    if (params.typeId) query.append('typeId', params.typeId.toString());
    if (params.sceneId) query.append('sceneId', params.sceneId.toString());
    if (params.parameterKey) query.append('parameterKey', params.parameterKey);
    if (params.parameterValue) query.append('parameterValue', params.parameterValue);

    axios.get(`/api/products/frontend/search?${query.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const responseData = res.data?.data || res.data;
        setProducts(Array.isArray(responseData) ? responseData : []);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.brandId, params.typeId, params.sceneId, params.parameterKey, params.parameterValue]);

  return { products, loading };
};
