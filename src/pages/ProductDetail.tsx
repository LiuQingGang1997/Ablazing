import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { useBrands } from '../hooks/useBrands';
import { useProductDetail, useProductsSearch } from '../hooks/useMall';

type VariantOption = { value: string; label: string };
type VariantGroup = { key: string; label: string; options: VariantOption[]; selectedValue?: string };

type RecommendedProduct = {
  id: string;
  name: string;
  nameEn?: string;
  image: string;
  tag?: string;
  model?: string;
  weightKg?: number;
  weightLb?: number;
  priceUsd?: number;
  priceCny?: number;
  categoryId?: string;
  categoryLabel?: string;
};

type ProductDetailPayload = {
  productId: string;
  brandId?: string;
  brandName?: string;
  title: string;
  nameEn?: string;
  summary?: string;
  summaryEn?: string;
  description?: string;
  detailDescription?: string;
  detailDescriptionEn?: string;
  images: string[];
  tag?: string;
  weightKg?: number;
  weightLb?: number;
  priceUsd?: number;
  priceCny?: number;
  categoryId?: string;
  categoryLabel?: string;
  variantGroups?: VariantGroup[];
  recommendedProducts?: RecommendedProduct[];
  model?: string;
  parameters?: Record<string, string>;
};

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { lang, t } = useI18n();
  const { brands: partnersLogos } = useBrands();
  const { product: apiProduct, loading: apiLoading, error: apiError } = useProductDetail(productId || null);

  const brandIdForSearch = useMemo(() => {
    if (apiProduct && apiProduct.brandId != null) return Number(apiProduct.brandId);
    return undefined;
  }, [apiProduct]);

  const { products: brandProducts } = useProductsSearch({ brandId: brandIdForSearch });

  const { product: locationProduct } = useMemo(() => {
    const fromState = (location.state as ProductDetailPayload | null) ?? null;
    if (fromState?.productId) return { product: fromState };
    if (!productId) return { product: null };
    try {
      const raw = sessionStorage.getItem(`product-detail:${productId}`);
      if (!raw) return { product: null };
      return { product: JSON.parse(raw) as ProductDetailPayload };
    } catch {
      return { product: null };
    }
  }, [location.state, productId]);

  const recommendedProducts = useMemo<RecommendedProduct[]>(() => {
    if (!apiProduct || !brandProducts || brandProducts.length === 0) return [];
    const currentId = String(apiProduct.id);
    const seen = new Set<string>();
    const result: RecommendedProduct[] = [];
    for (const p of brandProducts) {
      const pid = String(p.id);
      if (pid === currentId) continue;
      if (seen.has(pid)) continue;
      seen.add(pid);
      result.push({
        id: pid,
        name: p.name || '',
        nameEn: p.nameEn || undefined,
        image: p.coverImageUrl || p.image || '',
        tag: p.tag || undefined,
        model: p.model || undefined,
        weightKg: p.weightKg || undefined,
        weightLb: p.weightLb || undefined,
        priceUsd: p.usdPrice,
        priceCny: p.price,
        categoryId: String(p.typeId),
        categoryLabel: p.typeName || ''
      });
    }
    return result;
  }, [apiProduct, brandProducts]);

  const payload = useMemo<ProductDetailPayload | null>(() => {
    if (apiProduct && !apiError) {
      const params = apiProduct.parameters || {};
      const variantGroups: VariantGroup[] = Object.entries(params).map(([key, value]) => ({
        key,
        label: key,
        options: [{ value: String(value), label: String(value) }],
        selectedValue: String(value)
      }));

      const detailImages = apiProduct.detailImages || [];
      const images = [apiProduct.coverImageUrl, ...detailImages].filter(Boolean);

      return {
        productId: String(apiProduct.id),
        brandId: String(apiProduct.brandId),
        brandName: apiProduct.brandName || '',
        title: apiProduct.name || '',
        nameEn: apiProduct.nameEn || '',
        summary: apiProduct.summary || '',
        summaryEn: apiProduct.summaryEn || '',
        description: apiProduct.detailDescription || apiProduct.description || '',
        detailDescription: apiProduct.detailDescription,
        detailDescriptionEn: apiProduct.detailDescriptionEn || '',
        images,
        tag: apiProduct.tag,
        weightKg: apiProduct.weightKg,
        weightLb: apiProduct.weightLb,
        priceUsd: apiProduct.usdPrice,
        priceCny: apiProduct.price,
        categoryId: String(apiProduct.typeId),
        categoryLabel: apiProduct.typeName || '',
        variantGroups,
        recommendedProducts,
        model: apiProduct.model,
        detailImages,
        parameters: apiProduct.parameters
      };
    }
    return locationProduct;
  }, [apiProduct, apiError, locationProduct, recommendedProducts]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [detailTab, setDetailTab] = useState<'overview' | 'specs'>('overview');
  const [priceCurrency, setPriceCurrency] = useState<'USD' | 'CNY'>('USD');
  const partnersLogoWallRef = useRef<HTMLDivElement>(null);
  const [isPartnersLogoWallDragging, setIsPartnersLogoWallDragging] = useState(false);
  const [partnersLogoWallStartX, setPartnersLogoWallStartX] = useState(0);
  const [partnersLogoWallScrollLeft, setPartnersLogoWallScrollLeft] = useState(0);
  const [isPartnersLogoWallHovered, setIsPartnersLogoWallHovered] = useState(false);

  const productsStripRef = useRef<HTMLDivElement>(null);
  const [isProductsStripDragging, setIsProductsStripDragging] = useState(false);
  const [isProductsStripHovered, setIsProductsStripHovered] = useState(false);
  const [activeRecommendedId, setActiveRecommendedId] = useState<string | null>(null);
  const productsStripPointerDownRef = useRef(false);
  const productsStripDidDragRef = useRef(false);
  const productsStripStartXRef = useRef(0);
  const productsStripScrollLeftRef = useRef(0);
  const productsStripStartClientXRef = useRef(0);

  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  const thumbnailStripPointerDownRef = useRef(false);
  const thumbnailStripDidDragRef = useRef(false);
  const thumbnailStripStartXRef = useRef(0);
  const thumbnailStripScrollLeftRef = useRef(0);
  const thumbnailStripStartClientXRef = useRef(0);
  const [isThumbnailStripHovered, setIsThumbnailStripHovered] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [payload?.productId]);
  useEffect(() => {
    const first = payload?.recommendedProducts?.[0]?.id ?? null;
    setActiveRecommendedId(first);
  }, [payload?.productId, payload?.recommendedProducts]);

  const images = payload?.images ?? [];
  const activeImage = images[activeImageIndex] ?? images[0];
  const heroBg = images[1] ?? images[0] ?? '';
  const displayedPriceText = useMemo(() => {
    if (priceCurrency === 'USD') {
      const usd = payload?.priceUsd;
      if (typeof usd !== 'number' || Number.isNaN(usd)) return null;
      return `$${usd}`;
    }
    const cny = payload?.priceCny;
    if (typeof cny !== 'number' || Number.isNaN(cny)) return null;
    return `¥${cny}`;
  }, [payload?.priceUsd, payload?.priceCny, priceCurrency]);
  const withUnsplashSize = (url: string, w: number, h: number) => {
    if (!url || !url.includes('images.unsplash.com')) return url;
    try {
      const u = new URL(url);
      u.searchParams.set('w', String(w));
      u.searchParams.set('h', String(h));
      return u.toString();
    } catch {
      return url;
    }
  };
  const activeMainImage = activeImage ? withUnsplashSize(activeImage, 800, 800) : activeImage;

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
      const singleSetWidth = el.scrollWidth / 3;
      if (tries >= 30 || (singleSetWidth > 0 && el.scrollLeft !== 0)) window.clearInterval(intervalId);
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
    const tick = () => {
      if (!isPartnersLogoWallDragging && !isPartnersLogoWallHovered) {
        el.scrollLeft += 0.45;
        normalizePartnersLogoWallScroll();
      }
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isPartnersLogoWallDragging, isPartnersLogoWallHovered]);

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
    normalizePartnersLogoWallScroll();
  };

  const handlePartnersLogoWallEnd = () => setIsPartnersLogoWallDragging(false);

  useEffect(() => {
    const onUp = () => setIsPartnersLogoWallDragging(false);
    window.addEventListener('mouseup', onUp);
    return () => window.removeEventListener('mouseup', onUp);
  }, []);

  const productsStripShouldLoop = (payload?.recommendedProducts?.length ?? 0) >= 5;

  const productsStripItems = useMemo(() => {
    const rec = payload?.recommendedProducts ?? [];
    if (rec.length >= 5) return [...rec, ...rec, ...rec];
    if (rec.length > 0) return rec;
    const base = (images.length ? images : [heroBg]).filter(Boolean);
    const fill = [
      ...base,
      'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1599058917765-4f2f0a40b0a9?w=1200&h=800&fit=crop',
    ].filter(Boolean);
    const uniq = Array.from(new Set(fill));
    const list = uniq.length >= 6 ? uniq.slice(0, 6) : [...uniq, ...uniq, ...uniq].slice(0, 6);
    return [...list, ...list, ...list].map((src, idx) => ({
      id: `fallback-${idx}`,
      name: payload?.brandName ? `${payload.brandName} · ${t('productDetail.selected')}` : t('productDetail.selected'),
      nameEn: undefined,
      image: src,
      tag: undefined,
      model: undefined,
      weightKg: undefined,
      weightLb: undefined,
      priceUsd: undefined,
      priceCny: undefined,
    }));
  }, [heroBg, images, payload?.brandName, payload?.recommendedProducts, t]);

  const buildPayloadForRecommended = (item: RecommendedProduct) => {
    const imagesForItem = [item.image, heroBg, item.image].filter(Boolean);
    const recBase = payload?.recommendedProducts ?? [];
    const nextRecs = recBase.filter((x) => x.id !== item.id).slice(0, 12);
    return {
      productId: item.id,
      brandId: payload?.brandId,
      brandName: payload?.brandName,
      title: item.name,
      nameEn: item.nameEn,
      description: payload?.description,
      images: imagesForItem,
      tag: item.tag,
      model: item.model,
      weightKg: item.weightKg,
      weightLb: item.weightLb,
      priceUsd: item.priceUsd,
      priceCny: item.priceCny,
      categoryId: item.categoryId ?? payload?.categoryId,
      categoryLabel: item.categoryLabel ?? payload?.categoryLabel,
      variantGroups: payload?.variantGroups,
      recommendedProducts: nextRecs,
    } satisfies ProductDetailPayload;
  };

  const normalizeProductsStripScroll = () => {
    if (!productsStripShouldLoop) return;
    const el = productsStripRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;
    if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
    if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
  };

  useEffect(() => {
    if (!productsStripShouldLoop) return;
    const el = productsStripRef.current;
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
      normalizeProductsStripScroll();
      tries += 1;
      const singleSetWidth = el.scrollWidth / 3;
      if (tries >= 30 || (singleSetWidth > 0 && el.scrollLeft !== 0)) window.clearInterval(intervalId);
    }, 100);
    return () => window.clearInterval(intervalId);
  }, [productsStripItems, productsStripShouldLoop]);

  useEffect(() => {
    if (!productsStripShouldLoop) return;
    const el = productsStripRef.current;
    if (!el) return;
    let rafId = 0;
    const tick = () => {
      if (!isProductsStripDragging && !isProductsStripHovered) {
        el.scrollLeft += 0.6;
        normalizeProductsStripScroll();
      }
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isProductsStripDragging, isProductsStripHovered, productsStripShouldLoop]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!productsStripPointerDownRef.current) return;
      const el = productsStripRef.current;
      if (!el) return;
      const delta = e.clientX - productsStripStartClientXRef.current;
      if (!productsStripDidDragRef.current && Math.abs(delta) < 6) return;
      productsStripDidDragRef.current = true;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = (x - productsStripStartXRef.current) * 1.6;
      el.scrollLeft = productsStripScrollLeftRef.current - walk;
      if (productsStripShouldLoop) {
        const singleSetWidth = el.scrollWidth / 3;
        if (singleSetWidth > 0) {
          if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
          if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
        }
      }
    };
    const onUp = () => {
      if (!productsStripPointerDownRef.current) return;
      productsStripPointerDownRef.current = false;
      setIsProductsStripDragging(false);
      window.setTimeout(() => {
        productsStripDidDragRef.current = false;
      }, 0);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const handleProductsStripStart = (clientX: number) => {
    const el = productsStripRef.current;
    if (!el) return;
    productsStripPointerDownRef.current = true;
    productsStripDidDragRef.current = false;
    setIsProductsStripDragging(true);
    const rect = el.getBoundingClientRect();
    productsStripStartXRef.current = clientX - rect.left;
    productsStripScrollLeftRef.current = el.scrollLeft;
    productsStripStartClientXRef.current = clientX;
  };

  const handleProductsStripEnd = () => {
    if (!productsStripPointerDownRef.current) return;
    productsStripPointerDownRef.current = false;
    setIsProductsStripDragging(false);
    window.setTimeout(() => {
      productsStripDidDragRef.current = false;
    }, 0);
  };

  const nudgeProductsStrip = (dir: -1 | 1) => {
    const el = productsStripRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLDivElement>('[data-products-strip-card="1"]');
    const step = (card?.getBoundingClientRect().width ?? 320) + 24;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!thumbnailStripPointerDownRef.current) return;
      const el = thumbnailStripRef.current;
      if (!el) return;
      const delta = e.clientX - thumbnailStripStartClientXRef.current;
      if (!thumbnailStripDidDragRef.current && Math.abs(delta) < 6) return;
      thumbnailStripDidDragRef.current = true;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = (x - thumbnailStripStartXRef.current) * 1.6;
      el.scrollLeft = thumbnailStripScrollLeftRef.current - walk;
    };
    const onUp = () => {
      if (!thumbnailStripPointerDownRef.current) return;
      thumbnailStripPointerDownRef.current = false;
      window.setTimeout(() => {
        thumbnailStripDidDragRef.current = false;
      }, 0);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const thumbnailStripItems = images.length > 1 ? [...images, ...images] : images;

  useEffect(() => {
    const el = thumbnailStripRef.current;
    if (!el || images.length <= 1) return;
    let rafId = 0;
    const tick = () => {
      if (!thumbnailStripPointerDownRef.current && !isThumbnailStripHovered) {
        el.scrollLeft += 0.6;
        const singleSetWidth = el.scrollWidth / 2;
        if (singleSetWidth > 0 && el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };
    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [images.length, isThumbnailStripHovered]);

  const handleThumbnailStripStart = (clientX: number) => {
    const el = thumbnailStripRef.current;
    if (!el) return;
    thumbnailStripPointerDownRef.current = true;
    thumbnailStripDidDragRef.current = false;
    const rect = el.getBoundingClientRect();
    thumbnailStripStartXRef.current = clientX - rect.left;
    thumbnailStripScrollLeftRef.current = el.scrollLeft;
    thumbnailStripStartClientXRef.current = clientX;
  };

  if (apiLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#c8ff00] border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="mt-4 text-sm text-black/60">{t('productDetail.loading') || '加载中...'}</div>
        </div>
      </div>
    );
  }

  if (apiError || (!payload && !locationProduct)) {
    return (
      <div className="bg-white min-h-screen">
        <section className="py-16 md:py-24">
          <div className="content-container">
            <div className="max-w-2xl">
              <div className="text-sm text-black/60">{t('productDetail.title')}</div>
              <h1 className="mt-4 text-2xl md:text-3xl font-black text-black">{apiError ? apiError : t('productDetail.notFound')}</h1>
              <div className="mt-6">
                <Link
                  to="/hot-stores"
                  className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-sm font-bold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('productDetail.backToHotStores')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const safePayload = (payload ?? locationProduct)!;
  const displayTitle = lang === 'zh' ? safePayload.title : (safePayload.nameEn || safePayload.title);

  return (
    <div className="bg-white min-h-screen">
      <section className="relative min-h-[25svh] pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          {heroBg ? <img src={heroBg} alt="" className="w-full h-full object-cover object-center" draggable="false" /> : null}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/75" />
        </div>
        <div className="content-container relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
              {t('productDetail.title')}
            </div>
            <div className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-white">
              {displayTitle}
            </div>
            <div className="mt-4 text-white/70 text-sm md:text-base">
              {safePayload.brandName
                ? `${safePayload.brandName} · ${safePayload.categoryLabel ?? t('productDetail.categoryFallback')}`
                : safePayload.categoryLabel ?? t('productDetail.categoryFallback')}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="content-container">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-2 text-xs md:text-sm text-black/60">
              <span className="font-semibold text-black/70">{t('productDetail.breadcrumb.curated')}</span>
              <span className="opacity-50">•</span>
              <Link to="/hot-stores" className="hover:text-black transition-colors">
                {safePayload.brandName ?? t('productDetail.brandFallback')}
              </Link>
              <span className="opacity-50">•</span>
              <span className="text-black/60">{t('productDetail.breadcrumb.productDetail')}</span>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-8">
                <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                  <div className="aspect-square">
                    {activeImage ? (
                      <img src={activeMainImage} alt={displayTitle} className="w-full h-full object-contain" draggable="false" />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                </div>

                {images.length > 1 ? (
                  <div
                    ref={thumbnailStripRef}
                    onPointerDown={(e) => {
                      handleThumbnailStripStart(e.clientX);
                    }}
                    onPointerUp={() => {
                      thumbnailStripPointerDownRef.current = false;
                      window.setTimeout(() => {
                        thumbnailStripDidDragRef.current = false;
                      }, 0);
                    }}
                    onPointerCancel={() => {
                      thumbnailStripPointerDownRef.current = false;
                      thumbnailStripDidDragRef.current = false;
                    }}
                    onPointerLeave={() => {
                      thumbnailStripPointerDownRef.current = false;
                      thumbnailStripDidDragRef.current = false;
                    }}
                    onMouseEnter={() => setIsThumbnailStripHovered(true)}
                    onMouseLeave={() => setIsThumbnailStripHovered(false)}
                    className="mt-6 flex gap-4 overflow-x-auto pb-2 select-none [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing"
                    style={{ scrollBehavior: 'auto', touchAction: 'pan-y' }}
                  >
                    {thumbnailStripItems.map((img, idx) => {
                      const realIndex = idx % images.length;
                      const isActive = realIndex === activeImageIndex;
                      return (
                        <button
                          key={`${img}-${idx}`}
                          type="button"
                          onClick={() => {
                            if (thumbnailStripDidDragRef.current) return;
                            setActiveImageIndex(realIndex);
                          }}
                          className={`flex-none w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border transition-colors ${
                            isActive ? 'border-[#c8ff00]' : 'border-black/10 hover:border-black/20'
                          }`}
                        >
                          <img src={img} alt={`${displayTitle} ${realIndex + 1}`} className="w-full h-full object-contain" draggable="false" />
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-4">
                <div className="text-3xl md:text-4xl font-black tracking-tight text-black">
                  {safePayload.model ? (
                    <>
                      {safePayload.model}
                      <br />
                      {displayTitle}
                    </>
                  ) : displayTitle}
                </div>

              {displayedPriceText ? (
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-sm font-semibold text-black/60">{t('productDetail.priceLabel')}</div>
                    <div className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 p-1">
                      <button
                        type="button"
                        onClick={() => setPriceCurrency('USD')}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          priceCurrency === 'USD' ? 'bg-[#c8ff00] text-black' : 'text-black/60 hover:text-black'
                        }`}
                      >
                        {t('price.usd')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriceCurrency('CNY')}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          priceCurrency === 'CNY' ? 'bg-[#c8ff00] text-black' : 'text-black/60 hover:text-black'
                        }`}
                      >
                        {t('price.cny')}
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-3xl md:text-4xl font-black tracking-tight text-black">
                    {displayedPriceText}
                  </div>
                </div>
              ) : null}

                {(safePayload.summary || safePayload.summaryEn || safePayload.description) ? (
                  <div className="mt-6 text-sm md:text-base text-black/70 leading-relaxed whitespace-pre-line">
                    {lang === 'zh'
                      ? (safePayload.summary || safePayload.description)
                      : (safePayload.summaryEn || safePayload.summary || safePayload.description)}
                  </div>
                ) : (
                  <div className="mt-6 text-sm md:text-base text-black/70 leading-relaxed">
                    {safePayload.categoryLabel
                      ? lang === 'zh'
                        ? `${safePayload.categoryLabel}产品，${t('productDetail.overview.fallbackShort')}`
                        : `${safePayload.categoryLabel} product. ${t('productDetail.overview.fallbackShort')}`
                      : t('productDetail.overview.fallbackShort')}
                  </div>
                )}

                {typeof safePayload.weightKg === 'number' && typeof safePayload.weightLb === 'number' ? (
                  <div className="mt-6 text-sm text-black/50 font-semibold">
                    {safePayload.weightKg}kg / {safePayload.weightLb}lbs
                  </div>
                ) : null}

                {safePayload.variantGroups?.length ? (
                  <div className="mt-10 space-y-6">
                    {safePayload.variantGroups.slice(0, 2).map((g) => (
                      <div key={g.key} className="flex flex-wrap items-center gap-3">
                        <div className="text-sm font-semibold text-black/70 w-14">{g.label}：</div>
                        <div className="flex flex-wrap items-center gap-2">
                          {g.options.map((opt) => {
                            const active = opt.value === (g.selectedValue ?? g.options[0]?.value);
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-colors ${
                                  active
                                    ? 'bg-[#c8ff00] border-[#c8ff00] text-black'
                                    : 'bg-white border-gray-200 text-black/60 hover:border-gray-300 hover:text-black/80'
                                }`}
                              >
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-12">
                  <Link
                    to="/hot-stores"
                    className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-black hover:bg-[#c8ff00] hover:border-transparent transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('productDetail.backToList')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          <div className="border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDetailTab('overview')}
                className={`relative flex-1 py-5 text-center text-sm md:text-base font-semibold transition-colors ${
                  detailTab === 'overview' ? 'text-black' : 'text-black/50 hover:text-black/70'
                }`}
              >
                {t('productDetail.tab.overview')}
                {detailTab === 'overview' ? (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-14 bg-[#c8ff00] rounded-full" />
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => setDetailTab('specs')}
                className={`relative flex-1 py-5 text-center text-sm md:text-base font-semibold transition-colors ${
                  detailTab === 'specs' ? 'text-black' : 'text-black/50 hover:text-black/70'
                }`}
              >
                {t('productDetail.tab.specs')}
                {detailTab === 'specs' ? (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-14 bg-[#c8ff00] rounded-full" />
                ) : null}
              </button>
            </div>
          </div>

          {detailTab === 'overview' ? (
            <div className="pt-10">
              {(safePayload.detailDescription || safePayload.detailDescriptionEn || safePayload.description) ? (
                <div 
                  className="text-sm md:text-base text-black/70 leading-relaxed rich-text-content"
                  dangerouslySetInnerHTML={{
                    __html: lang === 'zh'
                      ? (safePayload.detailDescription || safePayload.description || '')
                      : (safePayload.detailDescriptionEn || safePayload.detailDescription || safePayload.description || '')
                  }}
                />
              ) : (
                <div className="text-sm md:text-base text-black/70 leading-relaxed">
                  {lang === 'zh'
                    ? `${displayTitle} ${t('productDetail.overview.fallbackLong')}`
                    : `${displayTitle} — ${t('productDetail.overview.fallbackLong')}`}
                </div>
              )}
            </div>
          ) : (
            <div className="pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                    <div className="aspect-square">
                      {safePayload.images?.[0] ? (
                        <img src={safePayload.images[0]} alt={`${displayTitle} cover`} className="w-full h-full object-cover" draggable="false" />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="text-xl md:text-2xl font-black text-black tracking-tight">{t('productDetail.specs.title')}</div>
                  <div className="mt-6 space-y-3">
                    {[
                      { k: t('productDetail.specs.brand'), v: safePayload.brandName ?? '-' },
                      { k: t('productDetail.specs.category'), v: safePayload.categoryLabel ?? '-' },
                      { k: t('productDetail.specs.model'), v: safePayload.model || displayTitle },
                      ...(safePayload.parameters ? Object.entries(safePayload.parameters).map(([key, value]) => ({
                        k: key,
                        v: String(value)
                      })) : []),
                    ].map((row) => (
                      <div key={row.k} className="flex items-center justify-between gap-6 border-b border-gray-100 pb-3">
                        <div className="text-sm text-black/60 font-semibold">{row.k}</div>
                        <div className="text-sm text-black font-semibold text-right">{row.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {partnersLogos.length > 0 && (
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="content-container">
          <div className="flex items-center justify-center">
            <h3 className="text-sm md:text-base font-bold text-gray-800 tracking-wider">{t('home.brands.title')}</h3>
          </div>

          <div className="mt-10 relative" onMouseEnter={() => setIsPartnersLogoWallHovered(true)} onMouseLeave={() => setIsPartnersLogoWallHovered(false)}>
            <div
              ref={partnersLogoWallRef}
              onPointerDown={(e) => {
                e.preventDefault();
                handlePartnersLogoWallStart(e.clientX);
              }}
              onPointerMove={(e) => handlePartnersLogoWallMove(e.clientX)}
              onPointerUp={handlePartnersLogoWallEnd}
              onPointerCancel={handlePartnersLogoWallEnd}
              onPointerLeave={handlePartnersLogoWallEnd}
              onScroll={normalizePartnersLogoWallScroll}
              className={`flex items-center gap-16 md:gap-24 overflow-x-auto select-none px-4 [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                isPartnersLogoWallDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
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

      <section className="py-16 md:py-24 bg-black">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                {t('productDetail.recommended.badge')}
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-white tracking-tight">
                {safePayload.brandName ? `${safePayload.brandName} · ` : ''}
                {safePayload.categoryLabel ? `${safePayload.categoryLabel} · ` : ''}
                {t('productDetail.recommended.more')}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => nudgeProductsStrip(-1)}
                className="w-10 h-10 rounded-full border border-white/15 text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => nudgeProductsStrip(1)}
                className="w-10 h-10 rounded-full border border-white/15 text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-10 relative" onMouseEnter={() => setIsProductsStripHovered(true)} onMouseLeave={() => setIsProductsStripHovered(false)}>
            <div
              ref={productsStripRef}
              onPointerDown={(e) => {
                handleProductsStripStart(e.clientX);
              }}
              onPointerUp={handleProductsStripEnd}
              onPointerCancel={handleProductsStripEnd}
              onPointerLeave={handleProductsStripEnd}
              onScroll={normalizeProductsStripScroll}
              className={`flex items-stretch gap-6 overflow-x-auto select-none [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                isProductsStripDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ scrollBehavior: 'auto', touchAction: 'pan-y' }}
            >
              {productsStripItems.map((item, idx) => {
                const isActive = !!activeRecommendedId && item.id === activeRecommendedId;
                const nextPayload = buildPayloadForRecommended(item);
                return (
                <Link
                  key={`${item.id}-${idx}`}
                  to={`/hot-stores/product/${encodeURIComponent(item.id)}`}
                  state={nextPayload}
                  onMouseEnter={() => setActiveRecommendedId(item.id)}
                  onClick={(e) => {
                    if (productsStripDidDragRef.current) {
                      e.preventDefault();
                      return;
                    }
                    sessionStorage.setItem(`product-detail:${item.id}`, JSON.stringify(nextPayload));
                  }}
                  className="shrink-0 w-[280px] sm:w-[340px] md:w-[400px] block"
                >
                  <div
                    data-products-strip-card="1"
                    className={`rounded-[24px] overflow-hidden bg-white/5 border transition-colors ${
                      isActive ? 'border-[#c8ff00] shadow-[0_0_0_1px_rgba(200,255,0,0.35)]' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="relative aspect-square bg-white/10 overflow-hidden">
                      {item.model ? (
                        <div className="absolute top-3 left-3 z-10 inline-flex items-center bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">
                          {item.model}
                        </div>
                      ) : null}
                      <img src={item.image} alt={lang === 'zh' ? item.name : (item.nameEn || item.name)} className="w-full h-full object-cover" draggable="false" />
                    </div>
                    <div className="p-4">
                      <div className="text-white text-sm font-bold line-clamp-1">{lang === 'zh' ? item.name : (item.nameEn || item.name)}</div>
                      {typeof item.weightKg === 'number' && typeof item.weightLb === 'number' ? (
                        <div className="mt-1 text-white/60 text-xs">
                          {item.weightKg}kg / {item.weightLb}lbs
                        </div>
                      ) : (
                        <div className="mt-1 text-white/60 text-xs">{safePayload.categoryLabel ?? t('productDetail.recommended.sameCategory')}</div>
                      )}
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-5 py-2 rounded-full text-sm font-bold"
            >
              {t('productDetail.contactUs')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
