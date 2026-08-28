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

export const useProductDetail = (productId: string | number | null) => {
  const [product, setProduct] = useState<any>(null);
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

    axios.get(`/api/products/${productId}`, {
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

export const useProductsSearch = ({ brandId, categoryId, seriesId, sceneId, typeId, keyword, page = 0, size = 20 }: { brandId?: number; categoryId?: number; seriesId?: number; sceneId?: number; typeId?: number; keyword?: string; page?: number; size?: number }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if (brandId) query.append('brandId', brandId.toString());
    if (categoryId) query.append('categoryId', categoryId.toString());
    if (seriesId) query.append('seriesId', seriesId.toString());
    if (sceneId) query.append('sceneId', sceneId.toString());
    if (typeId) query.append('typeId', typeId.toString());
    if (keyword) query.append('keyword', keyword);
    query.append('page', page.toString());
    query.append('size', size.toString());

    axios.get(`/api/products/frontend/list?${query.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const responseData = res.data?.data || res.data;
        if (responseData.content) {
          setProducts(responseData.content);
          setTotalElements(responseData.totalElements || 0);
          setTotalPages(responseData.totalPages || 0);
        } else if (Array.isArray(responseData)) {
          setProducts(responseData);
          setTotalElements(responseData.length);
          setTotalPages(1);
        } else {
          setProducts([]);
          setTotalElements(0);
          setTotalPages(0);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
        setTotalElements(0);
        setTotalPages(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [brandId, categoryId, seriesId, sceneId, typeId, keyword, page, size]);

  return { products, loading, totalElements, totalPages };
};

export const useProductFilterOptions = (brandId?: number) => {
  const [filterOptions, setFilterOptions] = useState<{
    brands: any[];
    scenes: any[];
    types: any[];
    categories: any[];
    seriesList: any[];
  }>({
    brands: [],
    scenes: [],
    types: [],
    categories: [],
    seriesList: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if (brandId != null) query.append('brandId', brandId.toString());

    axios.get(`/api/products/frontend/filter-options?${query.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const responseData = res.data?.data || res.data;
        setFilterOptions({
          brands: responseData.brands || [],
          scenes: responseData.scenes || [],
          types: responseData.types || [],
          categories: responseData.categories || [],
          seriesList: responseData.seriesList || [],
        });
      })
      .catch((err) => {
        console.error('Failed to fetch product filter options:', err);
        setFilterOptions({ brands: [], scenes: [], types: [], categories: [], seriesList: [] });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [brandId]);

  return { filterOptions, loading };
};

export const useProductTypes = (brandId?: number) => {
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = brandId ? `/api/product-types/brand/${brandId}` : '/api/product-types/frontend/list';
    axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const responseData = res.data?.data || res.data;
        setProductTypes(Array.isArray(responseData) ? responseData : []);
      })
      .catch((err) => {
        console.error('Failed to fetch product types:', err);
        setProductTypes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [brandId]);

  return { productTypes, loading };
};
