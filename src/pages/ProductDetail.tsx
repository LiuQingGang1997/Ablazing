import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type VariantOption = { value: string; label: string };
type VariantGroup = { key: string; label: string; options: VariantOption[]; selectedValue?: string };

type RecommendedProduct = {
  id: string;
  name: string;
  image: string;
  tag?: string;
  weightKg?: number;
  weightLb?: number;
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
  categoryId?: string;
  categoryLabel?: string;
  variantGroups?: VariantGroup[];
  recommendedProducts?: RecommendedProduct[];
};

const ProductDetail = () => {
  const { productId } = useParams();
  const location = useLocation();

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

  const partnersLogos = useMemo(
    () => [
      { src: 'https://cdn.worldvectorlogo.com/logos/borgwarner-1.svg', alt: 'BORGWARNER', h: 'h-6 md:h-8' },
      { src: 'https://cdn.worldvectorlogo.com/logos/lennar.svg', alt: 'LENNAR', h: 'h-5 md:h-6' },
      { src: 'https://cdn.worldvectorlogo.com/logos/norwegian-cruise-line.svg', alt: 'NORWEGIAN CRUISE LINE', h: 'h-8 md:h-10' },
      { src: 'https://cdn.worldvectorlogo.com/logos/adidas-4.svg', alt: 'adidas', h: 'h-8 md:h-10' },
      { src: 'https://cdn.worldvectorlogo.com/logos/fila-9.svg', alt: 'FILA', h: 'h-6 md:h-8' },
      { src: 'https://cdn.worldvectorlogo.com/logos/nike-11.svg', alt: 'Nike', h: 'h-6 md:h-8' },
      { src: 'https://cdn.worldvectorlogo.com/logos/puma-logo.svg', alt: 'PUMA', h: 'h-6 md:h-8' },
      { src: 'https://cdn.worldvectorlogo.com/logos/reebok-1.svg', alt: 'Reebok', h: 'h-6 md:h-8' },
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
      name: payload?.brandName ? `${payload.brandName} · 精选` : '精选',
      image: src,
      tag: undefined,
      weightKg: undefined,
      weightLb: undefined,
    }));
  }, [images, heroBg, payload?.brandName, payload?.recommendedProducts]);

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
      categoryId: payload?.categoryId,
      categoryLabel: payload?.categoryLabel,
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
          <div className="container-custom">
            <div className="max-w-2xl">
              <div className="text-sm text-black/60">商品详情</div>
              <h1 className="mt-4 text-2xl md:text-3xl font-black text-black">未找到该商品</h1>
              <div className="mt-6">
                <Link
                  to="/hot-stores"
                  className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-sm font-bold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  返回醒动热店
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
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          {heroBg ? <img src={heroBg} alt="" className="w-full h-full object-cover" draggable="false" /> : null}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/75" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
              商品详情
            </div>
            <div className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-white">
              {payload.title}
            </div>
            <div className="mt-4 text-white/70 text-sm md:text-base">
              {payload.brandName ? `${payload.brandName} · ${payload.categoryLabel ?? '产品'}` : payload.categoryLabel ?? '产品'}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-xs md:text-sm text-black/60">
            <span className="font-semibold text-black/70">酷动严选</span>
            <span className="opacity-50">•</span>
            <Link to="/hot-stores" className="hover:text-black transition-colors">
              {payload.brandName ?? '品牌'}
            </Link>
            <span className="opacity-50">•</span>
            <span className="text-black/60">商品详情</span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                <div className="aspect-[16/10] md:aspect-[21/12]">
                  {activeImage ? (
                    <img src={activeImage} alt={payload.title} className="w-full h-full object-cover" draggable="false" />
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

            <div className="lg:col-span-5">
              <div className="text-3xl md:text-4xl font-black tracking-tight text-black">
                {payload.title}
              </div>

              {payload.description ? (
                <div className="mt-6 text-sm md:text-base text-black/70 leading-relaxed whitespace-pre-line">
                  {payload.description}
                </div>
              ) : (
                <div className="mt-6 text-sm md:text-base text-black/70 leading-relaxed">
                  {payload.categoryLabel ? `${payload.categoryLabel}产品，面向多场景训练需求，兼顾稳定性与体验。` : '面向多场景训练需求，兼顾稳定性与体验。'}
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
                  返回列表
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDetailTab('overview')}
                className={`relative flex-1 py-5 text-center text-sm md:text-base font-semibold transition-colors ${
                  detailTab === 'overview' ? 'text-black' : 'text-black/50 hover:text-black/70'
                }`}
              >
                产品概述
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
                规格尺寸
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
                  `${payload.title} 面向多场景训练需求，兼顾稳定性与体验。通过模块化结构与人机工学细节设计，为商业与家庭场景提供更顺滑的训练感受。`}
              </div>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                    <div className="aspect-[16/10]">
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
                    <div className="text-xl md:text-2xl font-black text-black tracking-tight">释放最佳性能</div>
                    <div className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">
                      以稳定结构与顺滑传动为核心，兼顾低噪表现与一致阻力输出；在训练强度变化时依然保持良好反馈。
                    </div>
                  </div>

                  <div>
                    <div className="text-xl md:text-2xl font-black text-black tracking-tight">攀登无忧 循序渐进</div>
                    <div className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">
                      针对不同训练阶段提供更友好的节奏控制与安全细节，帮助用户循序提升训练容量与心肺耐力。
                    </div>
                  </div>

                  <div>
                    <div className="text-xl md:text-2xl font-black text-black tracking-tight">更易维护 更耐久</div>
                    <div className="mt-3 text-sm md:text-base text-black/70 leading-relaxed">
                      关键部件与外壳材质强调耐久与可维护性，降低长期使用成本，适配高频使用的商业场景。
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 text-sm md:text-base text-black/70 leading-relaxed">
                {payload.categoryLabel ? `该产品覆盖 ${payload.categoryLabel} 场景需求，支持多样化训练方案与空间适配。` : '支持多样化训练方案与空间适配。'}
              </div>
            </div>
          ) : (
            <div className="pt-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
                <div className="lg:col-span-7">
                  <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                    <div className="aspect-[16/10]">
                      {overviewImage ? (
                        <img src={overviewImage} alt={`${payload.title} specs`} className="w-full h-full object-cover" draggable="false" />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="text-xl md:text-2xl font-black text-black tracking-tight">规格尺寸</div>
                  <div className="mt-6 space-y-3">
                    {[
                      { k: '品牌', v: payload.brandName ?? '-' },
                      { k: '品类', v: payload.categoryLabel ?? '-' },
                      { k: '型号', v: payload.title },
                      {
                        k: '重量',
                        v:
                          typeof payload.weightKg === 'number' && typeof payload.weightLb === 'number'
                            ? `${payload.weightKg} kg / ${payload.weightLb} lbs`
                            : '-',
                      },
                      {
                        k: '版本',
                        v: payload.variantGroups?.[0]?.options?.find((o) => o.value === payload.variantGroups?.[0]?.selectedValue)?.label ?? '标准版',
                      },
                      {
                        k: '颜色',
                        v: payload.variantGroups?.[1]?.options?.find((o) => o.value === payload.variantGroups?.[1]?.selectedValue)?.label ?? '默认',
                      },
                    ].map((row) => (
                      <div key={row.k} className="flex items-center justify-between gap-6 border-b border-gray-100 pb-3">
                        <div className="text-sm text-black/60 font-semibold">{row.k}</div>
                        <div className="text-sm text-black font-semibold text-right">{row.v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl bg-black/5 border border-black/10 p-5">
                    <div className="text-sm font-bold text-black">尺寸说明</div>
                    <div className="mt-2 text-xs md:text-sm text-black/60 leading-relaxed">
                      具体尺寸与安装间距会随配置与版本略有差异；如需获取精确 CAD/安装图，请联系顾问获取对应型号的规格文件。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <h3 className="text-sm md:text-base font-bold text-gray-800 tracking-wider">ABLAZING的合作伙伴遍布全球</h3>
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
                    <div key={`${setIndex}-${l.alt}`} className={`${l.h} opacity-40 hover:opacity-100 transition-opacity duration-300 pointer-events-none grayscale flex items-center justify-center shrink-0`}>
                      <img src={l.src} alt={l.alt} className="h-full w-auto object-contain pointer-events-none" draggable="false" />
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
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                产品精选
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-white tracking-tight">
                {payload.brandName ? `${payload.brandName} · ` : ''}{payload.categoryLabel ? `${payload.categoryLabel} · ` : ''}更多推荐
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
                        <div className="mt-1 text-white/60 text-xs">{payload.categoryLabel ?? '同类推荐'}</div>
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
              to="/hot-stores"
              className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-5 py-2 rounded-full text-sm font-bold"
            >
              返回醒动热店
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
