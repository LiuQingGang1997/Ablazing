import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronUp, ChevronDown, ArrowRight, ArrowLeft, TrendingUp, Users, Target, Quote } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';
import { useBrands } from '../hooks/useBrands';
import { useReviews } from '../hooks/useReviews';

const Home = () => {
  const [heroBanners, setHeroBanners] = useState<any[]>([]);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [venueCards, setVenueCards] = useState<any[]>([]);
  const { brands: brandLogos } = useBrands();

  useEffect(() => {
    // Fetch banners from API
    axios.get('/api/banners?enabled=true', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false 
    })
      .then((res) => {
        const data = res.data?.data || res.data; 
        if (data && Array.isArray(data) && data.length > 0) {
          const formattedBanners = data.map((item: any) => ({
            id: item.id,
            image: item.imageUrl,
            linkUrl: item.linkUrl,
            mobilePosition: 'center',
            desktopPosition: 'center',
          }));
          setHeroBanners(formattedBanners);
        } else {
          setHeroBanners([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch banners:', err);
        setHeroBanners([]);
      });
  }, []);

  useEffect(() => {
    // Fetch cases from API
    axios.get('/api/cases/home', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    })
      .then((res) => {
        const data = res.data?.data || res.data;
        if (data && Array.isArray(data) && data.length > 0) {
          const formattedCases = data.map((item: any) => ({
            id: item.id,
            image: item.coverImage,
            location: item.address,
            name: item.name,
            date: item.completionTime,
            caseStudy: {
              title: item.name,
              location: item.address,
              date: item.completionTime,
              images: [item.coverImage],
              accordions: [] // Fallback since the home API only returns basic info
            }
          }));
          setVenueCards(formattedCases);
        } else {
          setVenueCards([]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch cases:', err);
        setVenueCards([]);
      });
  }, []);

  useEffect(() => {
    if (!heroBanners.length) return;
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroBanners.length]);

  const { t, lang } = useI18n();
  const { reviews: testimonials } = useReviews();
  // 分类卡片数据
  const categoryCards = [
    {
      id: 1,
      title: '全球专业运动器材',
      subtitle: 'Global Professional Sports Equipment',
      image: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Care/care1.jpg?w=800&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 2,
      title: '潮流与运动潮物',
      subtitle: 'Global Trendy And Sporty Items',
      image: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Care/care2.jpg?w=800&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 3,
      title: '运动营养与心灵疗愈',
      subtitle: 'Sports Nutrition And Mental Healing',
      image: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Care/care3.jpg?w=1200&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 4,
      title: '全球健康恢复科技',
      subtitle: 'Global Health Recovery Technology',
      image: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Care/care4.jpg?w=800&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 5,
      title: '数字健身解决方案',
      subtitle: 'Global Digital Fitness Solutions',
      image: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Care/care5.jpg?w=800&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  ];

  // 场所卡片数据不再使用静态配置，通过 API 获取

  // 轮播控制 - 热点场所
  const venueScrollRef = useRef<HTMLDivElement>(null);
  const [isVenueDragging, setIsVenueDragging] = useState(false);
  const [venueStartX, setVenueStartX] = useState(0);
  const [venueScrollLeft, setVenueScrollLeft] = useState(0);

  // 轮播控制 - 品牌墙
  const brandScrollRef = useRef<HTMLDivElement>(null);
  const [isBrandDragging, setIsBrandDragging] = useState(false);
  const [brandStartX, setBrandStartX] = useState(0);
  const [brandScrollLeft, setBrandScrollLeft] = useState(0);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleTestimonialChange = (direction: 'prev' | 'next') => {
    if (!testimonials || testimonials.length === 0) return;
    if (direction === 'prev') {
      setActiveTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
    } else {
      setActiveTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
    }
  };
  
  // 案例状态管理
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [caseStudyImageIndex, setCaseStudyImageIndex] = useState(0);

  useEffect(() => {
    setCaseStudyImageIndex(0);
  }, [activeCaseIndex]);

  useEffect(() => {
    if (!venueCards.length) return;
    const currentCase = venueCards[activeCaseIndex];
    if (currentCase && !currentCase.detailsLoaded) {
      axios.get(`/api/cases/${currentCase.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: false
      })
      .then(res => {
        const data = res.data?.data || res.data;
        if (!data) return;
        const accordions = data.features ? Object.values(data.features).map((f: any, idx: number) => ({
          id: idx,
          title: f.label,
          content: f.value
        })) : [];
        
        setVenueCards(prev => {
          const newCards = [...prev];
          newCards[activeCaseIndex] = {
            ...newCards[activeCaseIndex],
            detailsLoaded: true,
            caseStudy: {
              ...newCards[activeCaseIndex].caseStudy,
              images: data.detailImages && data.detailImages.length > 0 ? data.detailImages : [data.coverImage],
              accordions: accordions,
              description: data.titleDescription
            }
          };
          return newCards;
        });
      })
      .catch(err => {
        console.error(`Failed to fetch case details for id ${currentCase.id}:`, err);
      });
    }
  }, [activeCaseIndex, venueCards.length]);

  // 切换案例的函数
  const handleCaseChange = (direction: 'prev' | 'next') => {
    setActiveAccordion(0); // 切换案例时重置折叠面板
    if (direction === 'prev') {
      setActiveCaseIndex((prev) => (prev > 0 ? prev - 1 : venueCards.length - 1));
    } else {
      setActiveCaseIndex((prev) => (prev < venueCards.length - 1 ? prev + 1 : 0));
    }
  };

  const currentCaseStudy = venueCards[activeCaseIndex]?.caseStudy || {
    title: '', location: '', date: '', images: [], accordions: [], image: '', description: ''
  };
  const caseStudyImages = currentCaseStudy.images && currentCaseStudy.images.length > 0 
    ? currentCaseStudy.images 
    : [
        currentCaseStudy.image || '',
        venueCards[activeCaseIndex]?.image?.replace(/w=\d+&h=\d+/, 'w=1400&h=1000') || '',
        'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=1400&h=1000&fit=crop',
      ];
  const displayedCaseStudyImage = caseStudyImages[caseStudyImageIndex] ?? currentCaseStudy.image;

  // 自动轮播 - 热点场所
  useEffect(() => {
    const container = venueScrollRef.current;
    if (!container || venueCards.length < 7) return;

    let animationId: number;
    let isPaused = false;

    const autoScroll = () => {
      if (!isPaused && !isVenueDragging) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
           container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVenueDragging]);

  // 自动轮播 - 品牌墙
  useEffect(() => {
    const container = brandScrollRef.current;
    if (!container || brandLogos.length === 0) return;

    let animationId: number;
    let isPaused = false;

    // 为了实现无缝循环，我们需要知道单组 Logo 的实际宽度
    // container.scrollWidth / 3 是因为我们渲染了 3 组完全一样的 Logo
    const autoScroll = () => {
      if (!isPaused && !isBrandDragging) {
        container.scrollLeft += 1; // 调整速度
        
        // 当滚动超过了"第一组Logo的完整宽度"时，瞬间跳回到 0，实现无缝循环
        const singleSetWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleSetWidth) {
           container.scrollLeft -= singleSetWidth;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isBrandDragging]);

  // 拖拽事件处理 - 热点场所
  const handleVenueDragStart = (clientX: number) => {
    if (!venueScrollRef.current || venueCards.length < 7) return;
    setIsVenueDragging(true);
    setVenueStartX(clientX - venueScrollRef.current.offsetLeft);
    setVenueScrollLeft(venueScrollRef.current.scrollLeft);
  };

  const handleVenueDragMove = (clientX: number) => {
    if (!isVenueDragging || !venueScrollRef.current || venueCards.length < 7) return;
    const x = clientX - venueScrollRef.current.offsetLeft;
    const walk = (x - venueStartX) * 2;
    venueScrollRef.current.scrollLeft = venueScrollLeft - walk;
  };

  const handleVenueDragEnd = () => {
    setIsVenueDragging(false);
  };

  // 拖拽事件处理 - 品牌墙
  const handleBrandDragStart = (clientX: number) => {
    if (!brandScrollRef.current || brandLogos.length === 0) return;
    setIsBrandDragging(true);
    setBrandStartX(clientX - brandScrollRef.current.offsetLeft);
    setBrandScrollLeft(brandScrollRef.current.scrollLeft);
  };

  const handleBrandDragMove = (clientX: number) => {
    if (!isBrandDragging || !brandScrollRef.current || brandLogos.length === 0) return;
    const x = clientX - brandScrollRef.current.offsetLeft;
    const walk = (x - brandStartX) * 2;
    brandScrollRef.current.scrollLeft = brandScrollLeft - walk;
  };

  const handleBrandDragEnd = () => {
    setIsBrandDragging(false);
  };

  // 鼠标事件 - 热点场所
  const handleVenueMouseDown = (e: React.MouseEvent<HTMLDivElement>) => handleVenueDragStart(e.pageX);
  const handleVenueMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isVenueDragging) {
      e.preventDefault();
      handleVenueDragMove(e.pageX);
    }
  };

  // 鼠标事件 - 品牌墙
  const handleBrandMouseDown = (e: React.MouseEvent<HTMLDivElement>) => handleBrandDragStart(e.pageX);
  const handleBrandMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isBrandDragging) {
      e.preventDefault();
      handleBrandDragMove(e.pageX);
    }
  };

  // 触摸事件 (移动端) - 热点场所
  const handleVenueTouchStart = (e: React.TouchEvent<HTMLDivElement>) => handleVenueDragStart(e.touches[0].pageX);
  const handleVenueTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleVenueDragMove(e.touches[0].pageX);

  // 触摸事件 (移动端) - 品牌墙
  const handleBrandTouchStart = (e: React.TouchEvent<HTMLDivElement>) => handleBrandDragStart(e.touches[0].pageX);
  const handleBrandTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleBrandDragMove(e.touches[0].pageX);

  // 为了实现无缝轮播，如果数量大于等于7，复制一份数据；否则使用原数据
  const displayCards = venueCards.length >= 7 ? [...venueCards, ...venueCards, ...venueCards] : venueCards;
  const [hoveredCategoryCardId, setHoveredCategoryCardId] = useState<number | null>(null);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100svh-5rem)] pt-20 pb-0 md:min-h-[calc(100svh-8rem)] md:pt-32 md:pb-0">
        <div className="absolute inset-0 overflow-hidden">
          {heroBanners.map((banner, idx) => {
            const imgEl = (
              <img
                src={banner.image}
                alt=""
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 [object-position:var(--m-pos)] md:[object-position:var(--pc-pos)] ${
                  idx === activeHeroIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  '--m-pos': banner.mobilePosition || 'center',
                  '--pc-pos': banner.desktopPosition || 'center',
                } as React.CSSProperties}
                draggable="false"
              />
            );
            return banner.linkUrl ? (
              <a
                key={banner.id || idx}
                href={banner.linkUrl}
                target={banner.linkUrl.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                className={`absolute inset-0 z-0 block ${idx === activeHeroIndex ? 'pointer-events-auto' : 'pointer-events-none'}`}
              >
                {imgEl}
              </a>
            ) : (
              <div key={banner.id || idx} className="contents">
                {imgEl}
              </div>
            );
          })}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,255,0,0.15),transparent_45%)] pointer-events-none" />
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/60 pointer-events-none" />
        </div>

        {/* Navigation Arrows */}
        {heroBanners.length > 1 && (
          <>
            <button
              onClick={() => setActiveHeroIndex((prev) => (prev - 1 + heroBanners.length) % heroBanners.length)}
              className="absolute left-4 md:left-8 top-[calc(50svh)] -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10 hover:scale-105"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setActiveHeroIndex((prev) => (prev + 1) % heroBanners.length)}
              className="absolute right-4 md:right-8 top-[calc(50svh)] -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all border border-white/10 hover:scale-105"
              aria-label="Next slide"
            >
              <ArrowRight className="w-6 h-6" />
            </button>

          </>
        )}

        <div className="content-container relative z-10 py-10 md:py-16 flex flex-col justify-center pointer-events-none">
         
         

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight pointer-events-auto">
            {t('home.hero.titleLeft')} <span className="text-[#c8ff00]">·</span> {t('home.hero.titleRight')}
          </h1>

          {/* Description */}
          <p className="text-white/70 text-lg mb-12 max-w-2xl pr-2 pointer-events-auto" style={{fontSize: '1rem'}}>
            {t('home.hero.descLine1')}
            <br />
            {t('home.hero.descLine2')}
          </p>

          {/* CTA Button */}
          
            <Link to="/contact" className="relative z-10 inline-flex items-center gap-3 bg-[#c8ff00] text-black pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform w-fit pointer-events-auto">
                    <span>{t('cta.getStarted')}</span>
                    <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
           
        </div>
        {/* Venue Cards Slider Section */}
        {venueCards.length > 0 && (
        <section className="mt-16 md:mt-24 pb-16 overflow-hidden relative group z-10">
          <div className="content-container">
          {/* Header & Controls */}
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t('home.venues.title')}
            </h2>
          </div>

          {/* Scrollable Container */}
          <div className="relative">
            <div 
              ref={venueScrollRef}
              onMouseDown={venueCards.length >= 7 ? handleVenueMouseDown : undefined}
              onMouseLeave={venueCards.length >= 7 ? handleVenueDragEnd : undefined}
              onMouseUp={venueCards.length >= 7 ? handleVenueDragEnd : undefined}
              onMouseMove={venueCards.length >= 7 ? handleVenueMouseMove : undefined}
              onTouchStart={venueCards.length >= 7 ? handleVenueTouchStart : undefined}
              onTouchEnd={venueCards.length >= 7 ? handleVenueDragEnd : undefined}
              onTouchCancel={venueCards.length >= 7 ? handleVenueDragEnd : undefined}
              onTouchMove={venueCards.length >= 7 ? handleVenueTouchMove : undefined}
              className={`flex overflow-x-hidden gap-4 pb-8 select-none ${venueCards.length >= 7 ? (isVenueDragging ? 'cursor-grabbing' : 'cursor-grab') : 'justify-center'}`}
              style={{ scrollBehavior: 'auto' }} // 拖拽和自动轮播时不需要 smooth 行为
            >
              {displayCards.map((venue, index) => (
                <div 
                  key={`${venue.id}-${index}`} 
                  onClick={() => {
                    // 更新案例索引 (使用原数组长度取余，因为 displayCards 是原数组的三倍长)
                    setActiveCaseIndex(index % venueCards.length);
                    setActiveAccordion(0); // 重置折叠面板
                    
                    const el = document.getElementById('case-study');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-none w-[170px] md:w-[calc(14.285%-0.857rem)] bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
                >
                  <div className="aspect-[3/4] w-full overflow-hidden relative pointer-events-none">
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover pointer-events-none"
                      draggable="false"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] text-[#c8ff00] font-medium pointer-events-none">
                      {venue.date}
                    </div>
                  </div>
                  <div className="p-4 pointer-events-none">
                    <h4 className="text-white font-bold text-base mb-2 truncate" title={venue.name}>{venue.name}</h4>
                    <div className="flex items-center text-white/60 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-[#c8ff00] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{venue.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Edge Fade Effects for better visual when scrolling infinitely */}
            {venueCards.length >= 7 && (
              <>
                <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
              </>
            )}
          </div>
          </div>
        </section>
        )}
      </section>

      {/* Category Cards Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          {/* Section Header */}
          <div className="mb-12">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-1.5 bg-[#c8ff00] text-black px-3 py-1 rounded-full text-xs font-semibold mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.87a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
              </svg>
              {t('home.section.curated.badge')}
            </div>
            
            {/* Main Title with Circles */}
            <h2 className="text-3xl md:text-[40px] font-black text-black flex items-center flex-wrap gap-2 leading-tight tracking-tight mb-2">
              {t('home.hero.titleLeft')}
              <div className="flex -space-x-2">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#c8ff00]"></div>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200"></div>
              </div>
              {t('home.hero.titleRight')}
            </h2>
            
            {/* Subtitle */}
            <p className="text-gray-400 text-sm md:text-base font-light">
              {t('home.section.curated.subtitle')}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col gap-6">
            {/* Row 1: Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div
                className="group relative overflow-hidden rounded-3xl aspect-square md:aspect-square border border-black/10 hover:border-[#c8ff00]/40 hover:shadow-[0_24px_80px_rgba(200,255,0,0.18)] transition-all duration-500"
                onMouseEnter={() => setHoveredCategoryCardId(categoryCards[0].id)}
                onMouseLeave={() => setHoveredCategoryCardId(null)}
              >
                <img
                  src={categoryCards[0].image}
                  alt={categoryCards[0].title}
                  className={`w-full h-full object-cover transition-all duration-700 ${hoveredCategoryCardId === categoryCards[0].id ? 'opacity-0 scale-105' : 'opacity-100'} group-hover:scale-110`}
                />
                {hoveredCategoryCardId === categoryCards[0].id ? (
                  <video
                    src={categoryCards[0].video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/25 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute top-1/2 left-0 right-0 h-24 bg-black/20 -translate-y-1/2 blur-xl pointer-events-none" />
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 relative z-10">{categoryCards[0].title}</h3>
                  <p className="text-white/80 text-xs md:text-sm font-light mb-8 relative z-10">{categoryCards[0].subtitle}</p>
                  <Link to="/contact" className="relative z-10 inline-flex items-center gap-3 bg-[#c8ff00] text-black pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform">
                    <span>{t('cta.getStarted')}</span>
                    <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div
                className="group relative overflow-hidden rounded-3xl aspect-square md:aspect-square border border-black/10 hover:border-[#c8ff00]/40 hover:shadow-[0_24px_80px_rgba(200,255,0,0.18)] transition-all duration-500"
                onMouseEnter={() => setHoveredCategoryCardId(categoryCards[1].id)}
                onMouseLeave={() => setHoveredCategoryCardId(null)}
              >
                <img
                  src={categoryCards[1].image}
                  alt={categoryCards[1].title}
                  className={`w-full h-full object-cover transition-all duration-700 ${hoveredCategoryCardId === categoryCards[1].id ? 'opacity-0 scale-105' : 'opacity-100'} group-hover:scale-110`}
                />
                {hoveredCategoryCardId === categoryCards[1].id ? (
                  <video
                    src={categoryCards[1].video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/25 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute top-1/2 left-0 right-0 h-24 bg-black/20 -translate-y-1/2 blur-xl pointer-events-none" />
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 relative z-10">{categoryCards[1].title}</h3>
                  <p className="text-white/80 text-xs md:text-sm font-light mb-8 relative z-10">{categoryCards[1].subtitle}</p>
                  <Link to="/contact" className="relative z-10 inline-flex items-center gap-3 bg-[#c8ff00] text-black pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform">
                    <span>{t('cta.getStarted')}</span>
                    <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Row 2: Full Width Card */}
            <div
              className="group relative overflow-hidden rounded-3xl aspect-square md:aspect-[16/9] border border-black/10 hover:border-[#c8ff00]/40 hover:shadow-[0_24px_80px_rgba(200,255,0,0.18)] transition-all duration-500"
              onMouseEnter={() => setHoveredCategoryCardId(categoryCards[2].id)}
              onMouseLeave={() => setHoveredCategoryCardId(null)}
            >
              <img
                src={categoryCards[2].image}
                alt={categoryCards[2].title}
                className={`w-full h-full object-cover transition-all duration-700 ${hoveredCategoryCardId === categoryCards[2].id ? 'opacity-0 scale-105' : 'opacity-100'} group-hover:scale-110`}
              />
              {hoveredCategoryCardId === categoryCards[2].id ? (
                <video
                  src={categoryCards[2].video}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/55 group-hover:bg-black/25 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute top-1/2 left-0 right-0 h-32 bg-black/30 -translate-y-1/2 blur-2xl pointer-events-none" />
                <h3 className="text-2xl md:text-5xl font-bold text-white mb-3 relative z-10">{categoryCards[2].title}</h3>
                <p className="text-white/80 text-xs md:text-base font-light mb-10 relative z-10">{categoryCards[2].subtitle}</p>
                <Link to="/contact" className="relative z-10 inline-flex items-center gap-3 bg-[#c8ff00] text-black pl-6 pr-2 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">
                  <span>{t('cta.getStarted')}</span>
                  <span className="bg-white rounded-full p-2 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Row 3: Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 4 */}
              <div
                className="group relative overflow-hidden rounded-3xl aspect-square md:aspect-square border border-black/10 hover:border-[#c8ff00]/40 hover:shadow-[0_24px_80px_rgba(200,255,0,0.18)] transition-all duration-500"
                onMouseEnter={() => setHoveredCategoryCardId(categoryCards[3].id)}
                onMouseLeave={() => setHoveredCategoryCardId(null)}
              >
                <img
                  src={categoryCards[3].image}
                  alt={categoryCards[3].title}
                  className={`w-full h-full object-cover transition-all duration-700 ${hoveredCategoryCardId === categoryCards[3].id ? 'opacity-0 scale-105' : 'opacity-100'} group-hover:scale-110`}
                />
                {hoveredCategoryCardId === categoryCards[3].id ? (
                  <video
                    src={categoryCards[3].video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/25 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute top-1/2 left-0 right-0 h-24 bg-black/20 -translate-y-1/2 blur-xl pointer-events-none" />
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 relative z-10">{categoryCards[3].title}</h3>
                  <p className="text-white/80 text-xs md:text-sm font-light mb-8 relative z-10">{categoryCards[3].subtitle}</p>
                  <Link to="/contact" className="relative z-10 inline-flex items-center gap-3 bg-[#c8ff00] text-black pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform">
                    <span>{t('cta.getStarted')}</span>
                    <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Card 5 */}
              <div
                className="group relative overflow-hidden rounded-3xl aspect-square md:aspect-square border border-black/10 hover:border-[#c8ff00]/40 hover:shadow-[0_24px_80px_rgba(200,255,0,0.18)] transition-all duration-500"
                onMouseEnter={() => setHoveredCategoryCardId(categoryCards[4].id)}
                onMouseLeave={() => setHoveredCategoryCardId(null)}
              >
                <img
                  src={categoryCards[4].image}
                  alt={categoryCards[4].title}
                  className={`w-full h-full object-cover transition-all duration-700 ${hoveredCategoryCardId === categoryCards[4].id ? 'opacity-0 scale-105' : 'opacity-100'} group-hover:scale-110`}
                />
                {hoveredCategoryCardId === categoryCards[4].id ? (
                  <video
                    src={categoryCards[4].video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/25 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="absolute top-1/2 left-0 right-0 h-24 bg-black/20 -translate-y-1/2 blur-xl pointer-events-none" />
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 relative z-10">{categoryCards[4].title}</h3>
                  <p className="text-white/80 text-xs md:text-sm font-light mb-8 relative z-10">{categoryCards[4].subtitle}</p>
                  <Link to="/contact" className="relative z-10 inline-flex items-center gap-3 bg-[#c8ff00] text-black pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform">
                    <span>{t('cta.getStarted')}</span>
                    <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      {/* Case Study Section */}
      {venueCards.length > 0 && (
      <section id="case-study" className="py-16 md:py-24 bg-[#111]">
        <div className="content-container">
          {/* Main Card Container */}
          <div className="bg-[#0B0B0B] rounded-[40px] p-8 md:p-16 border border-white/5 relative overflow-hidden">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6 relative z-10">
              <div className="max-w-4xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 bg-black border border-white/10 px-4 py-2 rounded-full mb-6">
                  <div className="w-4 h-4 bg-[#c8ff00] flex items-center justify-center rounded-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-3 h-3">
                      <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{t('home.caseStudy.badge')}</span>
                </div>
                
                {/* Title */}
                <h2 className="text-4xl md:text-[56px] font-bold text-white leading-[1.1] tracking-tight mb-4 max-w-3xl">
                  {currentCaseStudy.title}
                </h2>
                
                {/* Meta */}
                <div className="flex items-center gap-6 text-gray-400 text-sm">
                  <span>{t('home.caseStudy.locationPrefix')}{currentCaseStudy.location}</span>
                  <span>{currentCaseStudy.date}</span>
                </div>
                {currentCaseStudy.description && (
                  <div 
                    className="mt-6 text-[#a3a3a3] text-sm md:text-base leading-[1.8] font-light max-w-3xl prose prose-invert prose-p:mb-2 prose-a:text-[#c8ff00]" 
                    dangerouslySetInnerHTML={{ __html: currentCaseStudy.description }} 
                  />
                )}
              </div>
              
              {/* Utility Link */}
              <Link to="/hot-stores" className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 uppercase tracking-wider shrink-0 mt-4 md:mt-0">
                {t('home.caseStudy.seeAll')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
              {/* Left Column: Accordion */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div className="space-y-2">
                  {currentCaseStudy.accordions.map((item: any, index: number) => {
                    const isActive = activeAccordion === index;
                    return (
                      <div 
                        key={item.id}
                        className={`border-b border-white/10 transition-all duration-300 ${isActive ? 'pb-8 pt-4' : 'py-6'}`}
                      >
                        <button 
                          onClick={() => setActiveAccordion(isActive ? -1 : index)}
                          className="w-full flex items-center justify-between group"
                        >
                          <h3 className="text-2xl md:text-[28px] font-bold text-white tracking-wide text-left">
                            {item.title}
                          </h3>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${isActive ? 'bg-[#c8ff00] text-black' : 'bg-[#1a1a1a] text-gray-400 group-hover:bg-[#222]'}`}>
                            {isActive ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </button>
                        
                        {/* Accordion Content */}
                        <div 
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[400px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <p className="text-[#bfbfbf] text-base leading-[1.8] font-light whitespace-pre-line">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-4 mt-12">
                  <button 
                    onClick={() => handleCaseChange('prev')}
                    className="w-14 h-14 rounded-full bg-[#E5E5E5] flex items-center justify-center text-black hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleCaseChange('next')}
                    className="w-14 h-14 rounded-full bg-[#c8ff00] flex items-center justify-center text-black hover:bg-[#d4ff33] transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Image */}
              <div
                className="lg:col-span-7 relative aspect-[9/16] md:aspect-auto min-h-[400px] md:min-h-[600px]"
              >
                <div className="absolute inset-0 rounded-[32px] overflow-hidden">
                  <img
                    key={displayedCaseStudyImage}
                    src={displayedCaseStudyImage}
                    alt={`${currentCaseStudy.title} Gym Interior`}
                    className={`w-full h-full object-cover object-center transition-all duration-700 animate-fade-in`}   /* 点击切换视频${isCaseStudyHovered ? 'opacity-0 scale-105' : 'opacity-100'}*/
                    draggable="false"
                  />
                  {/* {isCaseStudyHovered ? (
                    <video
                      key={displayedCaseStudyVideo}
                      src={displayedCaseStudyVideo}
                      className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : null} */}

                  <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                    <button
                      type="button"
                      onClick={() =>
                        setCaseStudyImageIndex((prev) => (prev + caseStudyImages.length - 1) % caseStudyImages.length)
                      }
                      className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-sm"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCaseStudyImageIndex((prev) => (prev + 1) % caseStudyImages.length)}
                      className="pointer-events-auto w-12 h-12 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors flex items-center justify-center"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Services Section / Brand Introduction */}
      <section className="py-20 md:py-32 bg-black">
        <div className="content-container">
          <div className="flex flex-col items-start">
            
            {/* Top Badge */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-[#c8ff00] text-black px-3 py-1 rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(200,255,0,0.3)]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.87a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                </svg>
                {t('home.services.badge')}
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full">
              {/* Heading */}
              <h2 className="text-3xl md:text-[40px] font-black text-white leading-tight tracking-wide mb-8">
                {t('home.services.title')}
              </h2>

              {/* Body Paragraph */}
              <p className="text-[#a3a3a3] text-sm md:text-base leading-[1.8] font-light mb-16 text-justify max-w-5xl">
                {lang === 'zh'
                  ? '在运动健身产业全球化与消费升级的浪潮初起之时，醒动的创始人团队深刻洞察到一个核心矛盾：市场上仍不乏海量产品，但“专业买家与品牌方却难以高效、精准地找到真正符合未来趋势、品质可靠且具有商业潜力的解决方案”。带着“重塑选品逻辑，成为产业连接器”的初心，醒动于2016年正式启航。初期，我们聚焦于全球专业运动器械这一垂直领域，凭借深耕行业的资源网络与专业判断，为第一批合作伙伴成功引入了多款颠覆性产品，奠定了“专业选品”的信任基石。'
                  : "At the dawn of globalization and consumption upgrade in the sports & fitness industry, Ablazing's founding team identified a core contradiction: the market is full of products, yet professional buyers and brands still struggle to efficiently find solutions that truly match future trends, reliable quality, and commercial potential. With the mission to reshape product-selection logic and become the industry's connector, Ablazing officially launched in 2016. Early on, we focused on global professional fitness equipment, leveraging deep industry networks and expertise to introduce disruptive products for our first partners—building trust in professional curation."}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-8 w-full">
                {/* Metric 1 */}
                <div className="flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#c8ff00] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2 leading-snug">
                      {lang === 'zh' ? '300%助力合作伙伴销售增幅' : 'Boosted partner sales by 300%'}
                    </h4>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed font-light">300% helping partners achieve the highest sales growth.</p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#c8ff00] flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2 leading-snug">
                      {lang === 'zh' ? '200+深度合作优质工厂与品牌' : '200+ deeply partnered factories & brands'}
                    </h4>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed font-light">200+ high-quality factories and innovative brands with cooperation.</p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#c8ff00] flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-2 leading-snug">
                      {lang === 'zh' ? '10年+深耕全球运动健身产业链' : '10+ years in the global sports & fitness supply chain'}
                    </h4>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed font-light">10+ years of deep cultivation in the global sports and fitness industry chain.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section / Testimonials */}
      {testimonials.length > 0 && (
      <section className="py-16 md:py-24 bg-white overflow-hidden relative">
        <div className="content-container relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(200,255,0,0.3)]">
                <Quote className="w-4 h-4 text-black" />
                <span className="text-black text-sm tracking-wide font-bold">{t('home.testimonials.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-black mb-4 tracking-tight">
                {t('home.testimonials.title')}
              </h2>
            </div>

            {/* Testimonial Slider */}
            <div className="relative py-8 md:py-12">
              {/* Quote Icon Background */}
              <div className="absolute top-0 left-0 text-black/5 pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>

              {/* Content */}
              <div className="relative z-10 min-h-[300px] flex flex-col justify-center">
                <p 
                  key={activeTestimonial}
                  className="text-xl md:text-3xl text-gray-800 leading-[1.8] text-center font-medium mb-16 animate-fade-in"
                >
                  "{testimonials[activeTestimonial].content}"
                </p>

                {/* Author Info */}
                <div className="flex flex-col items-center gap-5 mt-auto">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <img 
                      key={`avatar-${activeTestimonial}`}
                      src={testimonials[activeTestimonial].avatar} 
                      alt={testimonials[activeTestimonial].author}
                      className="w-full h-full object-cover animate-fade-in"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-black font-bold text-xl mb-1">{testimonials[activeTestimonial].author}</h4>
                    <p className="text-gray-500 text-sm tracking-wide font-medium">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons (Absolute positioned on desktop, relative on mobile) */}
              {testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12 md:absolute md:top-1/2 md:-left-12 md:-right-12 md:-translate-y-1/2 md:mt-0 md:justify-between pointer-events-none">
                <button 
                  onClick={() => handleTestimonialChange('prev')}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-all duration-300 pointer-events-auto shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleTestimonialChange('next')}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-all duration-300 pointer-events-auto shadow-sm"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>
      )}
 {/* Brands Logo Wall Section */}
      {brandLogos.length > 0 && (
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="content-container">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="text-sm md:text-base font-bold text-gray-800 tracking-wider">
              {t('home.brands.title')}
            </h3>
          </div>

          {/* Draggable & Auto-scrolling Logo Wall */}
          <div className="relative">
            <div 
              ref={brandScrollRef}
              onMouseDown={handleBrandMouseDown}
              onMouseLeave={handleBrandDragEnd}
              onMouseUp={handleBrandDragEnd}
              onMouseMove={handleBrandMouseMove}
              onTouchStart={handleBrandTouchStart}
              onTouchEnd={handleBrandDragEnd}
              onTouchCancel={handleBrandDragEnd}
              onTouchMove={handleBrandTouchMove}
              className={`flex items-center gap-16 md:gap-24 overflow-x-hidden select-none px-4 ${isBrandDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ scrollBehavior: 'auto' }}
            >
              {/* To make it infinite, we duplicate the logos list 3 times */}
              {[1, 2, 3].map((setIndex) => (
                <div key={`brand-set-${setIndex}`} className="flex items-center gap-16 md:gap-24 shrink-0">
                  {brandLogos.map((brand) => (
                    <div key={`brand-${brand.id}`} className="h-8 md:h-9 flex items-center justify-center shrink-0">
                      <img
                        src={brand.logoUrl}
                        alt={brand.name}
                        className="h-full w-auto object-contain opacity-80 pointer-events-none"
                        draggable="false"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Edge fade effects */}
            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
      )}
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="content-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {t('home.cta.titleLeft')} <span className="text-[#c8ff00]">·</span> {t('home.cta.titleRight')}
            </h2>
            <Link to="/contact" className="inline-flex bg-[#c8ff00] text-black px-10 py-5 font-semibold hover:bg-white transition-colors duration-300">
              {t('cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
