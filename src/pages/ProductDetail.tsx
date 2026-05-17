import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

type VariantOption = { value: string; label: string };
type VariantGroup = { key: string; label: string; options: VariantOption[]; selectedValue?: string };

type RecommendedProduct = {
  id: string;
  name: string;
  image: string;
  tag?: string;
  weightKg?: number;
  weightLb?: number;
  priceUsd?: number;
  categoryId?: string;
  categoryLabel?: string;
};

type ProductDetailPayload = {
  productId: string;
  brandId?: string;
  brandName?: string;
  title: string;
  description?: string;
  images: string[];
  tag?: string;
  weightKg?: number;
  weightLb?: number;
  priceUsd?: number;
  categoryId?: string;
  categoryLabel?: string;
  variantGroups?: VariantGroup[];
  recommendedProducts?: RecommendedProduct[];
};

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { lang, t } = useI18n();

  const payload = useMemo(() => {
    const fromState = (location.state as ProductDetailPayload | null) ?? null;
    if (fromState?.productId) return fromState;
    if (!productId) return null;
    try {
      const raw = sessionStorage.getItem(`product-detail:${productId}`);
      if (!raw) return null;
      return JSON.parse(raw) as ProductDetailPayload;
    } catch {
      return null;
    }
  }, [location.state, productId]);

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
  const overviewImage = images[0] ?? heroBg;
  const usdToCnyRate = 7.2;
  const displayedPriceText = useMemo(() => {
    const usd = payload?.priceUsd;
    if (typeof usd !== 'number' || Number.isNaN(usd)) return null;
    const locale = lang === 'zh' ? 'zh-CN' : 'en-US';
    if (priceCurrency === 'USD') {
      return new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(usd);
    }
    const cny = usd * usdToCnyRate;
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'CNY', maximumFractionDigits: 0 }).format(cny);
  }, [lang, payload?.priceUsd, priceCurrency]);
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

  const partnersLogos = useMemo(
    () => [
      { src: 'https://cdn.worldvectorlogo.com/logos/borgwarner-1.svg', alt: 'BORGWARNER' },
      { src: 'https://cdn.worldvectorlogo.com/logos/lennar.svg', alt: 'LENNAR' },
      { src: 'https://cdn.worldvectorlogo.com/logos/norwegian-cruise-line.svg', alt: 'NORWEGIAN CRUISE LINE' },
      { src: 'https://cdn.worldvectorlogo.com/logos/adidas-4.svg', alt: 'adidas' },
      { src: 'https://cdn.worldvectorlogo.com/logos/fila-9.svg', alt: 'FILA' },
      { src: 'https://cdn.worldvectorlogo.com/logos/nike-11.svg', alt: 'Nike' },
      { src: 'https://cdn.worldvectorlogo.com/logos/puma-logo.svg', alt: 'PUMA' },
      { src: 'https://cdn.worldvectorlogo.com/logos/reebok-1.svg', alt: 'Reebok' },
    ],
    []
  );

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

  const productsStripItems = useMemo(() => {
    const rec = payload?.recommendedProducts ?? [];
    if (rec.length > 0) return [...rec, ...rec, ...rec];
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
      image: src,
      tag: undefined,
      weightKg: undefined,
      weightLb: undefined,
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
      description: payload?.description,
      images: imagesForItem,
      tag: item.tag,
      weightKg: item.weightKg,
      weightLb: item.weightLb,
      priceUsd: item.priceUsd,
      categoryId: item.categoryId ?? payload?.categoryId,
      categoryLabel: item.categoryLabel ?? payload?.categoryLabel,
      variantGroups: payload?.variantGroups,
      recommendedProducts: nextRecs,
    } satisfies ProductDetailPayload;
  };

  const normalizeProductsStripScroll = () => {
    const el = productsStripRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth <= 0) return;
    if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
    if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
  };

  useEffect(() => {
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
  }, [productsStripItems]);

  useEffect(() => {
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
  }, [isProductsStripDragging, isProductsStripHovered]);

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
      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0) {
        if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
        if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
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

  if (!payload || !productId) {
    return (
      <div className="bg-white min-h-screen">
        <section className="py-16 md:py-24">
          <div className="content-container">
            <div className="max-w-2xl">
              <div className="text-sm text-black/60">{t('productDetail.title')}</div>
              <h1 className="mt-4 text-2xl md:text-3xl font-black text-black">{t('productDetail.notFound')}</h1>
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
              {payload.title}
            </div>
            <div className="mt-4 text-white/70 text-sm md:text-base">
              {payload.brandName
                ? `${payload.brandName} · ${payload.categoryLabel ?? t('productDetail.categoryFallback')}`
                : payload.categoryLabel ?? t('productDetail.categoryFallback')}
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
                {payload.brandName ?? t('productDetail.brandFallback')}
              </Link>
              <span className="opacity-50">•</span>
              <span className="text-black/60">{t('productDetail.breadcrumb.productDetail')}</span>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-8">
                <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                  <div className="aspect-square">
                    {activeImage ? (
                      <img src={activeMainImage} alt={payload.title} className="w-full h-full object-cover" draggable="false" />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                </div>

                {images.length > 1 ? (
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    {images.slice(0, 3).map((img, idx) => {
                      const isActive = idx === activeImageIndex;
                      return (
                        <button
                          key={`${img}-${idx}`}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`rounded-2xl overflow-hidden border bg-black/5 transition-colors ${
                            isActive ? 'border-[#c8ff00]' : 'border-black/10 hover:border-black/20'
                          }`}
                        >
                          <div className="aspect-[4/3]">
                            <img src={img} alt={`${payload.title} ${idx + 1}`} className="w-full h-full object-cover" draggable="false" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <div className="lg:col-span-4">
                <div className="text-3xl md:text-4xl font-black tracking-tight text-black">
                  {payload.title}
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

                {payload.description ? (
                  <div className="mt-6 text-sm md:text-base text-black/70 leading-relaxed whitespace-pre-line">
                    {payload.description}
                  </div>
                ) : (
                  <div className="mt-6 text-sm md:text-base text-black/70 leading-relaxed">
                    {payload.categoryLabel
                      ? lang === 'zh'
                        ? `${payload.categoryLabel}产品，${t('productDetail.overview.fallbackShort')}`
                        : `${payload.categoryLabel} product. ${t('productDetail.overview.fallbackShort')}`
                      : t('productDetail.overview.fallbackShort')}
                  </div>
                )}

                {typeof payload.weightKg === 'number' && typeof payload.weightLb === 'number' ? (
                  <div className="mt-6 text-sm text-black/50 font-semibold">
                    {payload.weightKg}kg / {payload.weightLb}lbs
                  </div>
                ) : null}

                {payload.variantGroups?.length ? (
                  <div className="mt-10 space-y-6">
                    {payload.variantGroups.slice(0, 2).map((g) => (
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
              <div className="text-sm md:text-base text-black/70 leading-relaxed">
                {payload.description ??
                  (lang === 'zh'
                    ? `${payload.title} ${t('productDetail.overview.fallbackLong')}`
                    : `${payload.title} — ${t('productDetail.overview.fallbackLong')}`)}
              </div>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                    <div className="aspect-square">
                      {overviewImage ? (
                        <img src={overviewImage} alt={`${payload.title} overview`} className="w-full h-full object-cover" draggable="false" />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-10">
                  <div>
                    <div className="text-xl md:text-2xl font-black text-black tracking-tight">{t('productDetail.overview.feature1.title')}</div>
                    <div className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">
                      {t('productDetail.overview.feature1.desc')}
                    </div>
                  </div>

                  <div>
                    <div className="text-xl md:text-2xl font-black text-black tracking-tight">{t('productDetail.overview.feature2.title')}</div>
                    <div className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">
                      {t('productDetail.overview.feature2.desc')}
                    </div>
                  </div>

                  <div>
                    <div className="text-xl md:text-2xl font-black text-black tracking-tight">{t('productDetail.overview.feature3.title')}</div>
                    <div className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">
                      {t('productDetail.overview.feature3.desc')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-sm md:text-base text-black/70 leading-relaxed">
                {payload.categoryLabel
                  ? `${t('productDetail.overview.coverPrefix')}${payload.categoryLabel}${t('productDetail.overview.coverSuffix')}`
                  : t('productDetail.overview.coverFallback')}
              </div>
            </div>
          ) : (
            <div className="pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                    <div className="aspect-square">
                      {overviewImage ? (
                        <img src={overviewImage} alt={`${payload.title} specs`} className="w-full h-full object-cover" draggable="false" />
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
                      { k: t('productDetail.specs.brand'), v: payload.brandName ?? '-' },
                      { k: t('productDetail.specs.category'), v: payload.categoryLabel ?? '-' },
                      { k: t('productDetail.specs.model'), v: payload.title },
                      {
                        k: t('productDetail.specs.weight'),
                        v:
                          typeof payload.weightKg === 'number' && typeof payload.weightLb === 'number'
                            ? `${payload.weightKg} kg / ${payload.weightLb} lbs`
                            : '-',
                      },
                      {
                        k: t('productDetail.specs.version'),
                        v:
                          payload.variantGroups?.[0]?.options?.find((o) => o.value === payload.variantGroups?.[0]?.selectedValue)?.label ??
                          t('productDetail.specs.standard'),
                      },
                      {
                        k: t('productDetail.specs.color'),
                        v:
                          payload.variantGroups?.[1]?.options?.find((o) => o.value === payload.variantGroups?.[1]?.selectedValue)?.label ??
                          t('productDetail.specs.default'),
                      },
                    ].map((row) => (
                      <div key={row.k} className="flex items-center justify-between gap-6 border-b border-gray-100 pb-3">
                        <div className="text-sm text-black/60 font-semibold">{row.k}</div>
                        <div className="text-sm text-black font-semibold text-right">{row.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl bg-black/5 border border-black/10 p-5">
                    <div className="text-sm font-bold text-black">{t('productDetail.specs.sizeNoteTitle')}</div>
                    <div className="mt-2 text-xs md:text-sm text-black/60 leading-relaxed">
                      {t('productDetail.specs.sizeNoteBody')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

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
                e.currentTarget.setPointerCapture(e.pointerId);
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
                      key={`${setIndex}-${l.alt}`}
                      className="h-8 md:h-9 flex items-center justify-center shrink-0"
                    >
                      <img
                        src={l.src}
                        alt={l.alt}
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

      <section className="py-16 md:py-24 bg-black">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                {t('productDetail.recommended.badge')}
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-white tracking-tight">
                {payload.brandName ? `${payload.brandName} · ` : ''}
                {payload.categoryLabel ? `${payload.categoryLabel} · ` : ''}
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
                  className="shrink-0 w-[240px] sm:w-[280px] md:w-[320px] block"
                >
                  <div
                    data-products-strip-card="1"
                    className={`rounded-[24px] overflow-hidden bg-white/5 border transition-colors ${
                      isActive ? 'border-[#c8ff00] shadow-[0_0_0_1px_rgba(200,255,0,0.35)]' : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="aspect-[4/3]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" draggable="false" />
                    </div>
                    <div className="p-4">
                      <div className="text-white text-sm font-bold line-clamp-1">{item.name}</div>
                      {typeof item.weightKg === 'number' && typeof item.weightLb === 'number' ? (
                        <div className="mt-1 text-white/60 text-xs">
                          {item.weightKg}kg / {item.weightLb}lbs
                        </div>
                      ) : (
                        <div className="mt-1 text-white/60 text-xs">{payload.categoryLabel ?? t('productDetail.recommended.sameCategory')}</div>
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
