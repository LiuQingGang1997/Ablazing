import { mockBrands, mockCurrentBrand, mockProductTypes, mockProducts, mockCategories } from '../mock/mallData';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight, Play, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useI18n } from '../i18n/I18nProvider';
import { useBrands } from '../hooks/useBrands';
import { useMallBrands, useProductsSearch } from '../hooks/useMall';

const HotStores = () => {
  const { lang, t } = useI18n();
  const { brands: partnersLogos } = useBrands();


  // 数据统计
  const stats = [
    { value: '72+', label: lang === 'zh' ? '合作品牌' : 'Partner brands' },
    { value: '2000+', label: lang === 'zh' ? '合作门店' : 'Partner stores' },
    { value: '5000+', label: lang === 'zh' ? 'SKU数量' : 'SKUs' },
    { value: '100%', label: lang === 'zh' ? '正品保障' : 'Authenticity' },
  ];

  type Option = { value: string; label: string };
  type FilterDef = { key: string; label: string; options: Option[] };

  const [activeBrandId, setActiveBrandId] = useState<string | number | undefined>(undefined);
  const { brands: apiBrands, currentBrand: apiCurrentBrand, productTypes: apiProductTypes } = useMallBrands(activeBrandId ? Number(activeBrandId) : undefined);
  const sourceBrands = apiBrands.length > 0 ? apiBrands : mockBrands;
  const displayBrands = sourceBrands.map(b => ({
    id: b.id,
    name: b.name,
    logo: b.logoUrl || '',
    slogan: b.slogan || '',
    introduction: b.introduction || '',
    promoImageUrl: b.promoImageUrl || '',
    promoVideoUrl: b.promoVideoUrl || '',
    mobilePromoVideoUrl: b.mobilePromoVideoUrl || '',
    detailDescription: b.detailDescription || '',
    video: b.promoVideoUrl || '',
    videoPc: b.promoVideoUrl || '',
    videoMobile: b.mobilePromoVideoUrl || '',
    cardImage: b.promoImageUrl || ''
  }));

  // Active brand mapping
  const fallbackCurrentBrand = mockCurrentBrand;
  const currentBrandData = apiCurrentBrand || fallbackCurrentBrand;
  const activeBrand = {
    id: currentBrandData.id,
    name: currentBrandData.name || '',
    title: currentBrandData.slogan || currentBrandData.name || '',
    subtitle: currentBrandData.introduction || '',
    description: currentBrandData.detailDescription || '',
    logo: currentBrandData.logoUrl || '',
    foundedYear: currentBrandData.foundedYear || 2000,
    overview: currentBrandData.detailDescription || '',
    metrics: currentBrandData.metrics || [],
    highlights: currentBrandData.highlights || [],
    productTypes: (apiProductTypes.length > 0 ? apiProductTypes : mockProductTypes).map(t => ({
      id: String(t.id),
      zh: t.name || t.typeName || '',
      en: t.enName || '',
      image: t.image || t.imageUrl || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
      focusTitle: t.focusTitle || '',
      focusSubtitle: t.focusSubtitle || '',
      focusDesc: t.focusDesc || ''
    })),
    heroImagePc: currentBrandData.promoImageUrl || '',
    heroImageMobile: currentBrandData.promoImageUrl || '',
    videoPc: currentBrandData.promoVideoUrl || '',
    videoMobile: currentBrandData.mobilePromoVideoUrl || '',
    video: currentBrandData.promoVideoUrl || '',
    heroImage: currentBrandData.promoImageUrl || '',
    cardImage: currentBrandData.promoImageUrl || ''
  };

  const [isMdUp, setIsMdUp] = useState(false);
  const brandPhilosophyRef = useRef<HTMLElement | null>(null);
  const [hoveredBrandIndex, setHoveredBrandIndex] = useState<number | null>(null);
  const [productFilters, setProductFilters] = useState<Record<string, string>>({ category: 'all' });
  const [productFilterOpenKey, setProductFilterOpenKey] = useState<string | null>(null);
  const productFilterBarRef = useRef<HTMLDivElement | null>(null);
  const [productPage, setProductPage] = useState(1);
  const brandInlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isBrandInlineVideoPlaying, setIsBrandInlineVideoPlaying] = useState(false);
  const [isBrandListOpen, setIsBrandListOpen] = useState(false);
  const brandSwitcherRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const apply = () => setIsMdUp(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const activeBrandVideoSrc = isMdUp
    ? (activeBrand.videoPc || activeBrand.video || 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true1.mp4')
    : (activeBrand.videoMobile || activeBrand.video || 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true1.mp4');
  const activeBrandHeroImageSrc = isMdUp
    ? (activeBrand.heroImagePc || activeBrand.heroImage || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop')
    : (activeBrand.heroImageMobile || activeBrand.heroImage || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop');

  useEffect(() => {
    setProductFilters({ category: 'all' });
    setProductFilterOpenKey(null);
    setProductPage(1);
    setIsBrandListOpen(false);
  }, [activeBrandId]);

  useEffect(() => {
    setIsBrandInlineVideoPlaying(false);
    const v = brandInlineVideoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, [activeBrandId]);

  const brandStripRef = useRef<HTMLDivElement>(null);
  const [isBrandStripDragging, setIsBrandStripDragging] = useState(false);
  const [isBrandStripPointerDown, setIsBrandStripPointerDown] = useState(false);
  const brandStripItemButtonRefs = useRef<HTMLButtonElement[]>([]);
  const brandStripLogoOverlayRefs = useRef<HTMLDivElement[]>([]);
  const isBrandStripDraggingRef = useRef(false);
  const [brandStripStartX, setBrandStripStartX] = useState(0);
  const [brandStripScrollLeft, setBrandStripScrollLeft] = useState(0);

  const brandStripItems = [...displayBrands, ...displayBrands, ...displayBrands];

  const productsBoxRef = useRef<HTMLDivElement | null>(null);
  const scrollToProducts = (nextCategoryId: string) => {
    setProductFilters({ category: nextCategoryId });
    setProductFilterOpenKey(null);
    setProductPage(1);
    productsBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const switchBrand = (dir: -1 | 1) => {
    if (displayBrands.length === 0) return;
    setHoveredBrandIndex(null);
    setIsBrandListOpen(false);
    const currentIndex = displayBrands.findIndex(b => b.id === activeBrand.id);
    const total = displayBrands.length || 1;
    const nextIndex = (currentIndex + dir + total) % total;
    const newBrandId = displayBrands[nextIndex].id as number;
    setActiveBrandId(newBrandId);
  };

  const selectBrand = (nextIndex: number) => {
    if (displayBrands.length === 0) return;
    setHoveredBrandIndex(null);
    setIsBrandListOpen(false);
    const total = displayBrands.length || 1;
    const normalized = ((nextIndex % total) + total) % total;
    const newBrandId = displayBrands[normalized].id as number;
    setActiveBrandId(newBrandId);
  };

  const partnersLogoWallRef = useRef<HTMLDivElement>(null);
  const [isPartnersLogoWallDragging, setIsPartnersLogoWallDragging] = useState(false);
  const [partnersLogoWallStartX, setPartnersLogoWallStartX] = useState(0);
  const [partnersLogoWallScrollLeft, setPartnersLogoWallScrollLeft] = useState(0);

  const normalizePartnersLogoWallScroll = () => {
    const el = partnersLogoWallRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;
    if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
    if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
  };

  useEffect(() => {
    const el = partnersLogoWallRef.current;
    if (!el) return;

    const ensureMiddle = () => {
      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth <= 0) return;
      if (el.scrollLeft === 0) el.scrollLeft = singleSetWidth;
    };

    ensureMiddle();
    let tries = 0;
    const intervalId = window.setInterval(() => {
      ensureMiddle();
      normalizePartnersLogoWallScroll();
      tries += 1;
      if (tries >= 30) window.clearInterval(intervalId);
      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0 && el.scrollLeft !== 0) window.clearInterval(intervalId);
    }, 100);

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(() => {
        ensureMiddle();
        normalizePartnersLogoWallScroll();
      });
      ro.observe(el);
    }

    const onResize = () => {
      ensureMiddle();
      normalizePartnersLogoWallScroll();
    };
    window.addEventListener('resize', onResize);

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', onResize);
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const el = partnersLogoWallRef.current;
    if (!el) return;

    let rafId = 0;
    let paused = false;

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    const tick = () => {
      if (!paused && !isPartnersLogoWallDragging) {
        el.scrollLeft += 0.6;
        const singleSetWidth = el.scrollWidth / 3;
        if (singleSetWidth > 0) {
          if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
          if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isPartnersLogoWallDragging]);

  const handlePartnersLogoWallStart = (clientX: number) => {
    const el = partnersLogoWallRef.current;
    if (!el) return;
    setIsPartnersLogoWallDragging(true);
    const rect = el.getBoundingClientRect();
    setPartnersLogoWallStartX(clientX - rect.left);
    setPartnersLogoWallScrollLeft(el.scrollLeft);
  };

  const handlePartnersLogoWallMove = (clientX: number) => {
    const el = partnersLogoWallRef.current;
    if (!el || !isPartnersLogoWallDragging) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const walk = (x - partnersLogoWallStartX) * 1.6;
    el.scrollLeft = partnersLogoWallScrollLeft - walk;
  };

  const handlePartnersLogoWallEnd = () => setIsPartnersLogoWallDragging(false);

  useEffect(() => {
    const onMouseUp = () => setIsPartnersLogoWallDragging(false);
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  const productTypes = activeBrand.productTypes ?? [];
  const [activeProductTypeIndex, setActiveProductTypeIndex] = useState(0);
  const [activeProductTypeVirtualIndex, setActiveProductTypeVirtualIndex] = useState(0);
  const productTypesStripRef = useRef<HTMLDivElement>(null);
  const [isProductTypesDragging, setIsProductTypesDragging] = useState(false);
  const [productTypesStartX, setProductTypesStartX] = useState(0);
  const [productTypesScrollLeft, setProductTypesScrollLeft] = useState(0);
  const productTypesPauseUntilRef = useRef(0);

  const productTypeItems = [...productTypes, ...productTypes, ...productTypes];

  useEffect(() => {
    setActiveProductTypeIndex(0);
    setActiveProductTypeVirtualIndex(productTypes.length);
    const el = productTypesStripRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth;
    });
  }, [activeBrandId]);

  useEffect(() => {
    const el = productTypesStripRef.current;
    if (!el || productTypes.length === 0) return;

    let rafId = 0;
    let paused = false;

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    const tick = () => {
      if (!paused && !isProductTypesDragging && Date.now() >= productTypesPauseUntilRef.current) {
        el.scrollLeft += 0.3;
        const singleSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        }
        if (el.scrollLeft < singleSetWidth) {
          el.scrollLeft += singleSetWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [activeBrandId, isProductTypesDragging, productTypes.length]);

  useEffect(() => {
    const el = productTypesStripRef.current;
    if (!el || productTypes.length === 0) return;
    const target = el.querySelector(
      `[data-ptype="${activeProductTypeVirtualIndex}"]`
    ) as HTMLElement | null;
    if (!target) return;
    const left = Math.max(0, target.offsetLeft - 8);
    el.scrollTo({ left, behavior: 'smooth' });
  }, [activeBrandId, activeProductTypeVirtualIndex, productTypes.length]);

  const setProductTypeVirtualIndex = (nextVirtualIndex: number, pauseMs: number) => {
    const el = productTypesStripRef.current;
    if (!el || productTypes.length === 0) return;

    productTypesPauseUntilRef.current = Date.now() + pauseMs;

    const singleSetWidth = el.scrollWidth / 3;
    let normalized = nextVirtualIndex;

    while (normalized >= productTypes.length * 2) {
      el.scrollLeft -= singleSetWidth;
      normalized -= productTypes.length;
    }

    while (normalized < productTypes.length) {
      el.scrollLeft += singleSetWidth;
      normalized += productTypes.length;
    }

    setActiveProductTypeVirtualIndex(normalized);
    setActiveProductTypeIndex(normalized % productTypes.length);
  };

  const handleProductTypesStart = (clientX: number) => {
    const el = productTypesStripRef.current;
    if (!el) return;
    productTypesPauseUntilRef.current = Date.now() + 1200;
    setIsProductTypesDragging(true);
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
      if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
    }
    setProductTypesStartX(clientX - el.offsetLeft);
    setProductTypesScrollLeft(el.scrollLeft);
  };

  const handleProductTypesMove = (clientX: number) => {
    const el = productTypesStripRef.current;
    if (!el || !isProductTypesDragging) return;
    const x = clientX - el.offsetLeft;
    const walk = (x - productTypesStartX) * 1.6;
    el.scrollLeft = productTypesScrollLeft - walk;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (el.scrollLeft >= singleSetWidth * 2) {
        el.scrollLeft -= singleSetWidth;
        setProductTypesScrollLeft((prev) => prev - singleSetWidth);
      }
      if (el.scrollLeft < singleSetWidth) {
        el.scrollLeft += singleSetWidth;
        setProductTypesScrollLeft((prev) => prev + singleSetWidth);
      }
    }
  };

  const handleProductTypesEnd = () => setIsProductTypesDragging(false);

  useEffect(() => {
    const onMouseUp = () => setIsProductTypesDragging(false);
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  useEffect(() => {
    const el = brandStripRef.current;
    if (!el) return;

    const onMouseUp = () => {
      setIsBrandStripDragging(false);
      setIsBrandStripPointerDown(false);
    };
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  useEffect(() => {
    isBrandStripDraggingRef.current = isBrandStripDragging;
  }, [isBrandStripDragging]);

  useEffect(() => {
    const el = brandStripRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let paused = false;
    let singleSetWidth = 0;
    const pxPerSecond = 42;

    const updateMetrics = () => {
      singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth <= 0) return;
      if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
      if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
    };

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    updateMetrics();
    const ro = new ResizeObserver(updateMetrics);
    ro.observe(el);

    const renderOverlays = () => {
      const viewportCenter = el.scrollLeft + el.clientWidth / 2;
      const maxDist = el.clientWidth * 0.6 || 1;

      for (let i = 0; i < brandStripItemButtonRefs.current.length; i++) {
        const btn = brandStripItemButtonRefs.current[i];
        const overlay = brandStripLogoOverlayRefs.current[i];
        if (!btn || !overlay) continue;

        const itemCenter = btn.offsetLeft + btn.offsetWidth / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        const focus = Math.max(0, 1 - dist / maxDist);
        const scale = 0.88 + focus * 0.14;
        const opacity = 0.72 + focus * 0.28;

        overlay.style.transform = `translateZ(0) scale(${scale})`;
        overlay.style.opacity = `${opacity}`;
      }
    };

    const tick = () => {
      if (singleSetWidth > 0 && !paused && !isBrandStripDraggingRef.current) {
        el.scrollLeft += (pxPerSecond / 60) * gsap.ticker.deltaRatio();
        if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
        if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
      } else if (singleSetWidth > 0) {
        if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
        if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
      }
      renderOverlays();
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [displayBrands.length]);

  const handleBrandStripStart = (clientX: number) => {
    const el = brandStripRef.current;
    if (!el) return;
    setIsBrandStripPointerDown(true);
    setIsBrandStripDragging(false);
    setBrandStripStartX(clientX - el.offsetLeft);
    setBrandStripScrollLeft(el.scrollLeft);
  };

  const handleBrandStripMove = (clientX: number) => {
    const el = brandStripRef.current;
    if (!el || !isBrandStripPointerDown) return;
    const x = clientX - el.offsetLeft;
    const walk = (x - brandStripStartX) * 1.6;
    if (!isBrandStripDragging && Math.abs(walk) > 6) setIsBrandStripDragging(true);
    el.scrollLeft = brandStripScrollLeft - walk;
  };

  const handleBrandStripEnd = () => {
    setIsBrandStripDragging(false);
    setIsBrandStripPointerDown(false);
  };

  const onBrandStripMouseDown = (e: React.MouseEvent<HTMLDivElement>) => handleBrandStripStart(e.pageX);
  const onBrandStripMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isBrandStripPointerDown) return;
    if (isBrandStripDragging) e.preventDefault();
    handleBrandStripMove(e.pageX);
  };
  const onBrandStripTouchStart = (e: React.TouchEvent<HTMLDivElement>) => handleBrandStripStart(e.touches[0].pageX);
  const onBrandStripTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleBrandStripMove(e.touches[0].pageX);

  

  const brandIdForSearch = activeBrandId ? Number(activeBrandId) : Number(activeBrand.id);
  
  const { products: apiProducts } = useProductsSearch({
    brandId: brandIdForSearch,
  });

  const currentBrandIdForFilter = brandIdForSearch;
  const sourceProducts = apiProducts.length > 0 
    ? apiProducts 
    : mockProducts.filter(p => p.brandId === currentBrandIdForFilter);
  const displayProducts = sourceProducts.map(p => ({
    id: String(p.id),
    name: p.name || '',
    subtitle: p.subtitle || '',
    image: p.coverImageUrl || p.image || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
    categoryId: String(p.categoryId || p.typeId),
    categoryName: p.categoryName || p.typeName || '',
    seriesId: String(p.seriesId),
    seriesName: p.seriesName || '',
    typeId: String(p.typeId),
    typeName: p.typeName || '',
    tag: p.tag || undefined,
    weightKg: p.weightKg || undefined,
    weightLb: p.weightLb || undefined,
    priceUsd: p.price || 0,
    attrs: p.parameters || {},
    sceneId: String(p.sceneId)
  }));

  const typeOptions: Option[] = [{ value: 'all', label: '全部产品' }];
  const sceneOptions: Option[] = [{ value: 'all', label: '全部场景' }];
  const seriesOptions: Option[] = [{ value: 'all', label: '全部系列' }];
  const paramOptionsMap: Record<string, Option[]> = {};

  const categoriesData = apiProducts.length > 0 
    ? [] 
    : mockCategories;

  const categoryOptions: { value: string; label: string; level: number; parentId: number | null }[] = [
    { value: 'all', label: '全部分类', level: 0, parentId: null }
  ];

  if (categoriesData.length > 0) {
    const level1Categories = categoriesData.filter(c => c.level === 1);
    level1Categories.forEach(parent => {
      categoryOptions.push({
        value: String(parent.id),
        label: parent.name,
        level: parent.level,
        parentId: parent.parentId
      });
      
      const children = categoriesData.filter(c => c.parentId === parent.id);
      children.forEach(child => {
        categoryOptions.push({
          value: String(child.id),
          label: child.name,
          level: child.level,
          parentId: child.parentId
        });
      });
    });
  } else {
    const seenCategoryIds = new Set<string>();
    sourceProducts.forEach(p => {
      if (p.categoryId && !seenCategoryIds.has(String(p.categoryId))) {
        seenCategoryIds.add(String(p.categoryId));
        categoryOptions.push({
          value: String(p.categoryId),
          label: p.categoryName || String(p.categoryId),
          level: 1,
          parentId: null
        });
      }
    });
  }

  if (sourceProducts.length > 0) {
    sourceProducts.forEach(p => {
      if (p.typeId && !typeOptions.some(o => o.value === String(p.typeId))) {
        typeOptions.push({ value: String(p.typeId), label: p.typeName || String(p.typeId) });
      }
      if (p.sceneId && !sceneOptions.some(o => o.value === String(p.sceneId))) {
        sceneOptions.push({ value: String(p.sceneId), label: p.sceneName || String(p.sceneId) });
      }
      if (p.seriesId && !seriesOptions.some(o => o.value === String(p.seriesId))) {
        seriesOptions.push({ value: String(p.seriesId), label: p.seriesName || String(p.seriesId) });
      }
      if (p.parameters) {
        Object.entries(p.parameters).forEach(([k, v]) => {
          if (!paramOptionsMap[k]) paramOptionsMap[k] = [{ value: 'all', label: k }];
          if (!paramOptionsMap[k].some(o => o.value === String(v))) {
            paramOptionsMap[k].push({ value: String(v), label: String(v) });
          }
        });
      }
    });
  }

  const activeCategoryId = productFilters.category ?? 'all';
  
  const filterDefs: FilterDef[] = [
    { key: 'category', label: '产品类型', options: typeOptions },
    ...(categoryOptions.length > 1 ? [{ key: 'productCategory', label: '分类', options: categoryOptions }] : []),
    ...(seriesOptions.length > 1 ? [{ key: 'series', label: '系列', options: seriesOptions }] : []),
    ...(sceneOptions.length > 1 ? [{ key: 'scene', label: '场景', options: sceneOptions }] : []),
    ...Object.entries(paramOptionsMap).map(([k, opts]) => ({ key: `param_${k}`, label: k, options: opts }))
  ];

  useEffect(() => {
    const next: Record<string, string> = { category: activeCategoryId };
    for (const def of filterDefs) {
      next[def.key] = productFilters[def.key] ?? 'all';
    }
    setProductFilters(next);
    setProductFilterOpenKey(null);
    setProductPage(1);
  }, [activeCategoryId, activeBrandId]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const el = productFilterBarRef.current;
      if (!(e.target instanceof Node)) return;
      const brandEl = brandSwitcherRef.current;
      if (el && el.contains(e.target)) return;
      if (brandEl && brandEl.contains(e.target)) return;
      setProductFilterOpenKey(null);
      setIsBrandListOpen(false);
    };
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, []);

  const filteredProducts = displayProducts.filter((p) => {
    if (activeCategoryId !== 'all' && p.typeId !== activeCategoryId) return false;
    
    if (productFilters.productCategory && productFilters.productCategory !== 'all' && p.categoryId !== productFilters.productCategory) return false;
    
    if (productFilters.series && productFilters.series !== 'all' && p.seriesId !== productFilters.series) return false;
    
    if (productFilters.scene && productFilters.scene !== 'all' && p.sceneId !== productFilters.scene) return false;
    for (const k of Object.keys(paramOptionsMap)) {
      const sel = productFilters[`param_${k}`] ?? 'all';
      if (sel === 'all') continue;
      if ((p.attrs?.[k] ?? '') !== sel) return false;
    }
    return true;
  });

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(Math.max(productPage, 1), totalPages);
  const pagedProducts = filteredProducts.slice((safePage - 1) * pageSize, safePage * pageSize);

  const getPageItems = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const items: Array<number | '...'> = [];
    const add = (v: number | '...') => items.push(v);
    const start = Math.max(2, safePage - 1);
    const end = Math.min(totalPages - 1, safePage + 1);
    add(1);
    if (start > 2) add('...');
    for (let p = start; p <= end; p += 1) add(p);
    if (end < totalPages - 1) add('...');
    add(totalPages);
    return items;
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 overflow-hidden z-0">
          <video
            src={activeBrandVideoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#c8ff00]/35 via-black/20 to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,255,0,0.15),transparent_45%)]" />
        </div>

        <div className="content-container relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center p-4 md:p-5 mb-6 shadow-xl">
                <img
                  src={activeBrand.logo}
                  alt={activeBrand.name}
                  className="w-full h-full object-contain"
                  draggable="false"
                />
              </div>
              <div className="mt-8 md:mt-6 text-4xl md:text-4xl font-black tracking-tight">
                {activeBrand.title || '提供多元、个性、潮流的训练方式'}
              </div>
              <div className="mt-8 text-white/70 text-base md:text-base leading-relaxed max-w-2xl">
                <div className="text-white/80 font-medium mb-3 md:mb-0 md:font-normal text-lg md:text-base">{activeBrand.subtitle || '根据不同品牌与品类展示对应的产品清单'}</div>
                
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-4xl md:text-4xl font-black text-[#c8ff00] mb-2 md:mb-1">{stat.value}</div>
                  <div className="text-white/60 text-base md:text-sm tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 z-20">
          <div className="h-28 md:h-36 bg-gradient-to-t from-[#c8ff00]/30 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-14">
            <div className="content-container">
              <div
                ref={brandStripRef}
                onMouseDown={onBrandStripMouseDown}
                onMouseMove={onBrandStripMouseMove}
                onMouseLeave={handleBrandStripEnd}
                onMouseUp={handleBrandStripEnd}
                onTouchStart={onBrandStripTouchStart}
                onTouchMove={onBrandStripTouchMove}
                onTouchEnd={handleBrandStripEnd}
                onTouchCancel={handleBrandStripEnd}
                className={`flex gap-4 md:gap-6 overflow-x-auto pb-2 select-none [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isBrandStripDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              >
                {brandStripItems.map((brand, i) => {
                  const isActive = brand.id === activeBrand.id;
                  const isHovered = hoveredBrandIndex === i;
                  return (
                    <button
                      key={`${brand.id}-${i}`}
                      ref={(el) => {
                        if (el) brandStripItemButtonRefs.current[i] = el;
                      }}
                      type="button"
                      onClick={() => {
                        if (isBrandStripDragging) return;
                        selectBrand(i);
                      }}
                      onMouseEnter={() => setHoveredBrandIndex(i)}
                      onMouseLeave={() => setHoveredBrandIndex(null)}
                      className={`group relative flex-none w-[calc(25%-12px)] md:w-28 lg:w-36 xl:w-40 aspect-square rounded-full bg-gray-200 transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                        isActive
                          ? ''
                          : ''
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute -inset-[2px] rounded-full ${
                          isActive
                            ? 'animate-breath-glow'
                            : 'shadow-[0_0_0_1px_rgba(0,0,0,0.10),0_0_18px_rgba(0,0,0,0.10)] blur-[0.4px] group-hover:shadow-[0_0_0_1px_rgba(0,0,0,0.16),0_0_22px_rgba(0,0,0,0.14)]'
                        }`}
                      />
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-100">
                        {isHovered && brand.video ? (
                          <video
                            src={isMdUp ? (brand.videoPc || brand.video) : (brand.videoMobile || brand.video)}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                              isActive ? 'scale-150' : 'group-hover:scale-125'
                            }`}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className={`w-2/3 h-2/3 object-contain transition-transform duration-700 ease-out ${
                                isActive ? 'scale-110' : 'group-hover:scale-105'
                              }`}
                              draggable="false"
                            />
                          </div>
                        )}
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            isActive
                              ? 'bg-black/10 backdrop-blur-[2px]'
                              : 'bg-transparent group-hover:bg-black/20'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Brand Philosophy Section */}
      <section ref={brandPhilosophyRef} className="py-16 md:py-24 bg-[#111]">
        <div className="content-container">
          <div className="bg-white rounded-[28px] md:rounded-[36px] px-6 md:px-12 py-10 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-2 flex items-center justify-between lg:flex-col lg:items-start lg:justify-start gap-4">
                <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                  {lang === 'zh' ? '了解品牌' : 'About the Brand'}
                </div>
                <div className="hidden lg:flex items-center gap-2 text-xs text-black/60 tracking-widest">
                  
                  
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-y-10 gap-x-8 md:gap-x-16 max-w-xl">
                  {activeBrand.metrics.map((m: any) => (
                    <div key={m.label}>
                      <div className="text-4xl md:text-5xl font-black text-black leading-none">
                        {m.value}
                      </div>
                      <div className="mt-3 text-xs md:text-sm text-black/70 font-semibold tracking-wide">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="rounded-2xl overflow-hidden border border-black/10 bg-white">
                  <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-4">
                    <div className="text-xs text-black/60">
                      <div className="font-semibold tracking-wide">Product Design</div>
                      <div className="mt-1 font-bold text-black">{activeBrand.name}</div>
                    </div>
                    <div className="text-xs text-black/50 font-semibold">24 Feb</div>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-16">
              <h2 className="text-2xl md:text-4xl font-black text-black tracking-tight text-center">
                {lang === 'zh'
                  ? `${activeBrand.title}`
                  : `Since ${activeBrand.foundedYear}, empowering fitness with products and innovation.`}
              </h2>
              <div 
                className="mt-6 md:mt-8 text-sm md:text-base text-black/60 leading-relaxed max-w-4xl mx-auto text-center"
                dangerouslySetInnerHTML={{ __html: activeBrand.overview }}
              />
            </div>

            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {activeBrand.highlights.map((h: any) => (
                <div key={h.title} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#c8ff00] flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-black" />
                  </div>
                  <div className="mt-5 text-sm md:text-base font-black text-black tracking-wide">
                    {h.title}
                  </div>
                  <div className="mt-2 text-xs md:text-sm text-black/60 leading-relaxed max-w-xs">
                    {h.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* Feature Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10 mb-10 md:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-6">
                {lang === 'zh' ? '产品精选' : 'Featured Products'}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {lang === 'zh' ? '用心突破，创造价值' : 'Break through. Create value.'}
              </h2>
            </div>
            <div className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl md:text-right">
              <div className="font-semibold text-white/70">
                {lang === 'zh' ? `${activeBrand.name} 产品矩阵` : `${activeBrand.name} portfolio`}
              </div>
              <div className="mt-2">
                {lang === 'zh'
                  ? '围绕场景化需求，覆盖从有氧、力量到功能训练的关键品类。'
                  : 'Built around real scenarios, covering key categories from cardio and strength to functional training.'}
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              ref={productTypesStripRef}
              onMouseDown={(e) => handleProductTypesStart(e.pageX)}
              onMouseMove={(e) => {
                if (!isProductTypesDragging) return;
                e.preventDefault();
                handleProductTypesMove(e.pageX);
              }}
              onMouseLeave={handleProductTypesEnd}
              onMouseUp={handleProductTypesEnd}
              onTouchStart={(e) => handleProductTypesStart(e.touches[0].pageX)}
              onTouchMove={(e) => handleProductTypesMove(e.touches[0].pageX)}
              onTouchEnd={handleProductTypesEnd}
              onTouchCancel={handleProductTypesEnd}
              className={`flex gap-5 md:gap-7 overflow-x-auto pb-2 select-none [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isProductTypesDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ scrollBehavior: 'auto', touchAction: 'pan-y' }}
            >
              {productTypeItems.map((t, i) => {
                const realIndex = productTypes.length === 0 ? 0 : i % productTypes.length;
                const isActive = realIndex === activeProductTypeIndex;
                const isFocusCard = !!t.focusTitle && isActive;
                return (
                  <div key={`${t.id}-${i}`} data-ptype={i} className="flex-none w-[260px] sm:w-[300px] md:w-[340px]">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setProductTypeVirtualIndex(i, 1500);
                        scrollToProducts(t.id);
                      }}
                      className={`rounded-2xl overflow-hidden bg-[#111] border transition-all outline-none ${
                        isActive
                          ? 'border-[#c8ff00] shadow-[0_0_0_1px_rgba(200,255,0,0.35)]'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="relative aspect-[9/16] md:aspect-[3/4]">
                        <img
                          src={t.image}
                          alt={t.zh}
                          className="absolute inset-0 w-full h-full object-cover"
                          draggable="false"
                        />
                        <div className={`absolute inset-0 transition-colors ${isActive ? 'bg-black/25' : 'bg-black/55'}`} />
                        {isFocusCard ? (
                          <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                              {t.focusTitle}
                            </div>
                            <div className="mt-2 text-xl md:text-2xl font-black text-white/95 tracking-tight">
                              {t.focusSubtitle}
                            </div>
                            <div className="mt-4 text-white/70 text-sm leading-relaxed max-w-[22rem]">
                              {t.focusDesc}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-white font-bold tracking-wide">{t.zh}</div>
                      <div className="text-white/50 text-sm mt-1">{t.en}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setProductTypeVirtualIndex(activeProductTypeVirtualIndex - 1, 1500)
                }
                className="w-12 h-12 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setProductTypeVirtualIndex(activeProductTypeVirtualIndex + 1, 1500)
                }
                className="w-12 h-12 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

<section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                {lang === 'zh' ? '品牌视频' : 'Brand Video'}
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">
                {lang === 'zh' ? '提升健身体验，赋能于人' : 'Elevate fitness experiences'}
              </h2>
            </div>
            <div className="text-black/60 text-sm md:text-base leading-relaxed max-w-xl md:text-right">
              <div className="font-semibold text-black/70">
                {lang === 'zh' ? `“${activeBrand.name}”品牌介绍` : `${activeBrand.name} introduction`}
              </div>
              <div className="mt-2">{activeBrand.subtitle || '探索我们如何帮助您建立长远的健身生态。'}</div>
            </div>
          </div>

          <div className="mt-10 md:mt-12">
            <div className="relative w-full rounded-[32px] overflow-hidden border border-black/10 bg-black/5">
              <div className="relative aspect-[9/16] md:aspect-[16/9]">
                <video
                  ref={brandInlineVideoRef}
                  key={activeBrand.id}
                  src={activeBrandVideoSrc}
                  poster={activeBrandHeroImageSrc}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsBrandInlineVideoPlaying(true)}
                  onPause={() => setIsBrandInlineVideoPlaying(false)}
                  onEnded={() => setIsBrandInlineVideoPlaying(false)}
                />
                {!isBrandInlineVideoPlaying ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => brandInlineVideoRef.current?.play()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') brandInlineVideoRef.current?.play();
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/35 via-black/10 to-transparent cursor-pointer"
                  >
                    <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#c8ff00] text-black flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
                      <Play className="w-6 h-6 md:w-7 md:h-7 translate-x-[1px]" />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section className="py-16 md:py-24 bg-[#111]">
        <div className="content-container">
          <div
            ref={productsBoxRef}
            className="bg-white rounded-[28px] md:rounded-[36px] px-6 md:px-12 py-10 md:py-14 scroll-mt-24 md:scroll-mt-32"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                  {lang === 'zh' ? '产品清单' : 'Product List'}
                </div>
                <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">
                  {activeBrand.title || '提供多元、个性、潮流的训练方式'}
                </h2>
              </div>
              <div className="text-black/60 text-sm md:text-base leading-relaxed max-w-xl md:text-right">
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div className="font-semibold text-black/70">
                    {lang === 'zh' ? `${activeBrand.name} · 产品矩阵` : `${activeBrand.name} · Portfolio`}
                  </div>
                  <div className="flex items-center gap-2">
                    <div ref={brandSwitcherRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsBrandListOpen((v) => !v)}
                        className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-full text-xs md:text-sm font-semibold text-black hover:border-gray-300 transition-colors"
                        aria-label={lang === 'zh' ? '展开品牌列表' : 'Open brand list'}
                      >
                        <img src={activeBrand.logo} alt={activeBrand.name} className="h-4 md:h-5 w-auto" draggable="false" />
                        <span className="max-w-[8rem] truncate">{activeBrand.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isBrandListOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isBrandListOpen ? (
                        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-1 z-30">
                          <div className="max-h-80 overflow-auto">
                            {displayBrands.map((b, idx) => {
                              const active = b.id === activeBrand.id;
                              return (
                                <button
                                  key={b.id}
                                  type="button"
                                  onClick={() => selectBrand(idx)}
                                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                                    active ? 'bg-[#c8ff00]/30' : 'hover:bg-black/5'
                                  }`}
                                >
                                  <img src={b.logo} alt={b.name} className="h-5 w-auto" draggable="false" />
                                  <div className="min-w-0">
                                    <div className="text-sm font-bold text-black truncate">{b.name}</div>
                                    <div className="text-xs text-black/50 truncate">{b.slogan}</div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 p-1">
                      <button
                        type="button"
                        onClick={() => switchBrand(-1)}
                        className="w-9 h-9 rounded-full text-black/70 hover:bg-[#c8ff00] hover:text-black transition-colors flex items-center justify-center"
                        aria-label={lang === 'zh' ? '上一品牌' : 'Previous brand'}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => switchBrand(1)}
                        className="w-9 h-9 rounded-full text-black/70 hover:bg-[#c8ff00] hover:text-black transition-colors flex items-center justify-center"
                        aria-label={lang === 'zh' ? '下一品牌' : 'Next brand'}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2">{activeBrand.title || '根据不同品牌与品类展示对应的产品清单。'}</div>
              </div>
            </div>

            <div ref={productFilterBarRef} className="mt-8 flex flex-wrap items-center gap-3">
              {filterDefs.map((def) => {
                const selectedValue = productFilters[def.key] ?? 'all';
                const selectedLabel =
                  def.options.find((o) => o.value === selectedValue)?.label ?? def.label;
                const isOpen = productFilterOpenKey === def.key;
                return (
                  <div key={def.key} className="relative">
                    <button
                      type="button"
                      onClick={() => setProductFilterOpenKey((prev) => (prev === def.key ? null : def.key))}
                      className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-black hover:border-gray-300 transition-colors"
                    >
                      <span>{selectedLabel}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen ? (
                      <div className="absolute left-0 top-full mt-2 w-52 rounded-2xl bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-1 z-30">
                        {def.options.map((opt) => {
                          const active = opt.value === selectedValue;
                          const level = (opt as { level?: number }).level ?? 0;
                          const paddingLeft = level > 1 ? `${(level - 1) * 16}px` : '0';
                          const fontWeight = level === 1 ? 'font-bold' : 'font-normal';
                          const color = level === 1 ? 'text-black' : 'text-black/70';
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setProductFilters((prev) => ({ ...prev, [def.key]: opt.value }));
                                setProductFilterOpenKey(null);
                                setProductPage(1);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                                active ? 'bg-[#c8ff00] text-black font-bold' : `${color} ${fontWeight} hover:bg-black/5`
                              }`}
                              style={{ paddingLeft }}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {pagedProducts.length === 0 ? (
                <div className="col-span-full rounded-2xl border border-black/10 bg-black/5 p-10 text-center text-black/60">
                  {lang === 'zh' ? '暂无符合筛选条件的产品' : 'No products match the current filters.'}
                </div>
              ) : (
                pagedProducts.map((p) => {
                  const categoryLabel =
                    categoryOptions.find((o) => o.value === p.categoryId)?.label ?? '';
                  const variantGroups = filterDefs
                    .filter((d) => d.key !== 'category')
                    .slice(0, 2)
                    .map((d) => ({
                      key: d.key,
                      label: d.label,
                      options: d.options.filter((o) => o.value !== 'all'),
                      selectedValue: p.attrs?.[d.key],
                    }))
                    .filter((g) => g.options.length > 0);
                  const images = [p.image, activeBrandHeroImageSrc, activeBrand.cardImage].filter(Boolean);
                  const functionValue = p.attrs?.function ?? null;
                  const getCategoryLabel = (id: string) =>
                    categoryOptions.find((o) => o.value === id)?.label ?? '';
                  const baseRecommended = displayProducts.filter((x) => x.id !== p.id);
                  const sameCategory = baseRecommended.filter((x) => x.categoryId === p.categoryId);
                  const sameFunctionOtherCategory =
                    functionValue == null
                      ? []
                      : baseRecommended.filter(
                          (x) => x.categoryId !== p.categoryId && (x.attrs?.function ?? null) === functionValue
                        );
                  const otherProducts =
                    functionValue == null
                      ? baseRecommended.filter((x) => x.categoryId !== p.categoryId)
                      : baseRecommended.filter(
                          (x) => x.categoryId !== p.categoryId && (x.attrs?.function ?? null) !== functionValue
                        );
                  const recommendedProducts = [...sameCategory, ...sameFunctionOtherCategory, ...otherProducts]
                    .slice(0, 12)
                    .map((x) => ({
                      id: x.id,
                      name: x.name,
                      image: x.image,
                      tag: x.tag,
                      weightKg: x.weightKg,
                      weightLb: x.weightLb,
                      priceUsd: x.priceUsd,
                      categoryId: x.categoryId,
                      categoryLabel: getCategoryLabel(x.categoryId),
                    }));
                  const payload = {
                    productId: p.id,
                    brandId: activeBrand.id,
                    brandName: activeBrand.name,
                    title: p.name,
                    description: (activeBrand.description || '根据不同品牌与品类展示对应的产品清单。'),
                    images,
                    tag: p.tag,
                    weightKg: p.weightKg,
                    weightLb: p.weightLb,
                    priceUsd: p.priceUsd,
                    categoryId: p.categoryId,
                    categoryLabel,
                    variantGroups,
                    recommendedProducts,
                  };
                  return (
                    <Link
                      key={p.id}
                      to={`/hot-stores/product/${encodeURIComponent(p.id)}`}
                      state={payload}
                      onClick={() => {
                        sessionStorage.setItem(`product-detail:${p.id}`, JSON.stringify(payload));
                      }}
                      className="group block"
                    >
                      <div className="relative rounded-2xl overflow-hidden">
                        <div className="aspect-square">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500"
                            draggable="false"
                          />
                        </div>
                        {p.tag ? (
                          <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#c8ff00] text-black px-3 py-1 rounded-full text-xs font-bold">
                            {p.tag}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-black/50 font-semibold">{categoryLabel}</div>
                        <div className="mt-1 text-lg font-black text-black tracking-tight">{p.name}</div>
                        {p.subtitle ? (
                          <div className="mt-1 text-sm text-black/60">{p.subtitle}</div>
                        ) : null}
                        {typeof p.weightKg === 'number' && typeof p.weightLb === 'number' ? (
                          <div className="mt-2 text-sm text-black/50">
                            {p.weightKg}kg / {p.weightLb}lbs
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                className="w-11 h-11 rounded-full bg-white border border-gray-200 text-black/70 hover:border-gray-300 hover:text-black transition-colors flex items-center justify-center disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-black/70"
                disabled={safePage <= 1}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              {getPageItems().map((it, idx) =>
                it === '...' ? (
                  <span key={`e-${idx}`} className="w-11 h-11 flex items-center justify-center text-black/40">
                    ···
                  </span>
                ) : (
                  <button
                    key={it}
                    type="button"
                    onClick={() => setProductPage(it)}
                    className={`w-11 h-11 rounded-full border transition-colors flex items-center justify-center text-sm font-semibold ${
                      it === safePage
                        ? 'bg-[#c8ff00] border-[#c8ff00] text-black'
                        : 'bg-white border-gray-200 text-black/70 hover:border-gray-300 hover:text-black'
                    }`}
                  >
                    {it}
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                className="w-11 h-11 rounded-full bg-[#c8ff00] border border-[#c8ff00] text-black hover:bg-[#d7ff4a] transition-colors flex items-center justify-center disabled:opacity-40 disabled:hover:bg-[#c8ff00]"
                disabled={safePage >= totalPages}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {partnersLogos.length > 0 && (
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="content-container">
          <div className="text-center mb-16">
            <h3 className="text-sm md:text-base font-bold text-gray-800 tracking-wider">
              ABLAZING的合作伙伴遍布全球
            </h3>
          </div>

          <div className="relative">
            <div
              ref={partnersLogoWallRef}
              onPointerDown={(e) => {
                e.preventDefault();
                e.currentTarget.setPointerCapture(e.pointerId);
                handlePartnersLogoWallStart(e.clientX);
              }}
              onPointerMove={(e) => handlePartnersLogoWallMove(e.clientX)}
              onPointerUp={handlePartnersLogoWallEnd}
              onPointerCancel={handlePartnersLogoWallEnd}
              onPointerLeave={handlePartnersLogoWallEnd}
              onScroll={normalizePartnersLogoWallScroll}
              className={`flex items-center gap-16 md:gap-24 overflow-x-auto select-none px-4 [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isPartnersLogoWallDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ scrollBehavior: 'auto', touchAction: 'pan-y' }}
            >
              {[1, 2, 3].map((setIndex) => (
                <div key={`partners-brand-set-${setIndex}`} className="flex items-center gap-16 md:gap-24 shrink-0">
                  {partnersLogos.map((l) => (
                    <div
                      key={`${setIndex}-${l.id}`}
                      className="h-8 md:h-9 flex items-center justify-center shrink-0"
                    >
                      <img
                        src={l.logoUrl}
                        alt={l.name}
                        className="h-full w-auto object-contain opacity-80 pointer-events-none"
                        draggable="false"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
      )}
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">
                {t('home.cta.titleLeft')} <span className="text-[#c8ff00]">·</span> {t('home.cta.titleRight')}
              </h2>
              <div className="flex items-center justify-center md:justify-end">
                <Link to="/contact" className="bg-[#c8ff00] text-black px-10 py-5 font-semibold hover:bg-white transition-colors duration-300">
                  {t('cta.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotStores;
