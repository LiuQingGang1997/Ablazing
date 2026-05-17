import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronUp, ChevronDown, ArrowRight, ArrowLeft, TrendingUp, Users, Target, Quote } from 'lucide-react';
import useImageConfig from '../hooks/useImageConfig';
import { useI18n } from '../i18n/I18nProvider';

const Home = () => {
  const { config } = useImageConfig();
  const heroBanners = config.banners || [];
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    if (!heroBanners.length) return;
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroBanners.length]);

  const caseStudyVideoUrl = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
  const { t, lang } = useI18n();
  // 分类卡片数据
  const categoryCards = [
    {
      id: 1,
      title: '全球专业运动器材',
      subtitle: 'Global Professional Sports Equipment',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 2,
      title: '潮流与运动潮物',
      subtitle: 'Global Trendy And Sporty Items',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 3,
      title: '运动营养与心灵疗愈',
      subtitle: 'Sports Nutrition And Mental Healing',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 4,
      title: '全球健康恢复科技',
      subtitle: 'Global Health Recovery Technology',
      image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=800&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 5,
      title: '数字健身解决方案',
      subtitle: 'Global Digital Fitness Solutions',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
  ];

  // 场所卡片数据，整合案例详情
  const venueCards = [
    {
      id: 1,
      image: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/case/case1.jpg?w=400&h=300&fit=crop',
      location: '深圳福田区',
      name: 'FUSION FITNESS(星河湾店)',
      date: '2025-08-25',
      caseStudy: {
        title: "深圳第13店| 星河中心店 正式启幕",
        location: "中国-深圳",
        date: "25th Oct",
       
        images: [
          "https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/case/FUSION%20FITNESS%20case2.jpg",
          "https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/case/FUSION%20FITNESS%20case1.jpg",
          "https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/case/FUSION%20FITNESS%20case3.jpg",
          "https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/case/FUSION%20FITNESS%20case4.jpg"
        ],
        accordions: [
          {
            id: 0,
            title: "Background",
            content: "🏠 FUSION FITNESS 星河中心店\n📍 福田区星河发展中心L3层\n🚇 1号线｜会展中心D出口"
          },
          {
            id: 1,
            title: "Particularity",
            content: "该门店的最大特色在于其💰年卡4开头\n可按月支付中途\n🉑 灵活解约，年卡可停卡"
          },
          {
            id: 2,
            title: "Strategy",
            content: "✅ HYROX赛事级配置\n12台CENTR-HYROX专业设备\n全域覆盖深蹲架/雪橇车/风阻划船机实时联动\n✅ 器械党的狂欢\n从力量举到功能性训练\n设备多到选择恐惧症发作"
          },
          {
            id: 3,
            title: "Conclusion",
            content: "🏋️ 门店环境1200㎡ 健身空间\n层高开阔多元化运动分区\n力量、有氧、拳击、HYROX、功能性训练\n私密性好，社恐也能自在运动"
          }
        ]
      }
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=300&fit=crop',
      location: '北京市朝阳区',
      name: 'SPACE 动感单车 (国贸店)',
      date: '2023-10-26',
      caseStudy: {
        title: "Case Study: SPACE 动感单车的视听盛宴",
        location: "中国-北京",
        date: "26th Oct",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&h=900&fit=crop",
        accordions: [
          {
            id: 0,
            title: "Background",
            content: "SPACE 位于北京繁华的国贸商圈，目标客群是高净值白领。他们需要一个能够在下班后迅速释放压力、享受纯粹运动乐趣的夜店风单车空间。"
          },
          {
            id: 1,
            title: "Particularity",
            content: "有别于传统健身房，SPACE 将音乐、灯光与单车运动深度结合，打造出类似 Livehouse 的体验。这种独特的定位要求其硬件设施必须达到专业演出级别。"
          },
          {
            id: 2,
            title: "Strategy",
            content: "我们为其定制了环绕式 LED 矩阵屏幕，并与骑行踏频数据进行实时联动。当全场学员的踩踏频率达到峰值时，灯光和视觉效果也会进入高潮，极大地增强了团队运动的凝聚力。"
          },
          {
            id: 3,
            title: "Conclusion",
            content: "SPACE 国贸店开业即爆满，凭借其独特的视听体验，迅速在小红书等平台积累了大量口碑，成为都市白领下班后首选的运动社交场所。"
          }
        ]
      }
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
      location: '广州市天河区',
      name: 'PURE Fitness (太古汇店)',
      date: '2023-10-27',
      caseStudy: {
        title: "Case Study: PURE Fitness 顶奢健身空间的重塑",
        location: "中国-广州",
        date: "27th Oct",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=900&fit=crop",
        accordions: [
          {
            id: 0,
            title: "Background",
            content: "作为亚洲顶级的健身品牌，PURE Fitness 在广州太古汇的旗舰店旨在为大湾区的高端客户提供世界一流的健身设施和私教服务。"
          },
          {
            id: 1,
            title: "Particularity",
            content: "高端客群对器械的专业度、环境的私密性以及服务的个性化有着极高的要求。空间内不仅要有顶级的力量区，还需配备专业的瑜伽馆和恢复中心。"
          },
          {
            id: 2,
            title: "Strategy",
            content: "我们协助 PURE 引入了全球最先进的生物力学健身器械，并对空间进行了科学动线规划，确保力量区、有氧区与休息区互不干扰。此外，还特别设计了具有高级质感的更衣及淋浴空间。"
          },
          {
            id: 3,
            title: "Conclusion",
            content: "PURE 太古汇店成功树立了华南地区高端健身房的新标杆，不仅保持了极高的会员续费率，其私教课程的转化率也稳居品牌内前列。"
          }
        ]
      }
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400&h=300&fit=crop',
      location: '深圳市南山区',
      name: 'F45 Training (万象天地店)',
      date: '2023-10-28',
      caseStudy: {
        title: "Case Study: F45 澳洲硬核训练的本土化落地",
        location: "中国-深圳",
        date: "28th Oct",
        image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&h=900&fit=crop",
        accordions: [
          {
            id: 0,
            title: "Background",
            content: "来自澳洲的 F45 以其 45 分钟高强度间歇训练（HIIT）闻名全球。深圳万象天地店是其在华南地区的重要布局，面临着如何向本地市场普及这种高强度训练模式的任务。"
          },
          {
            id: 1,
            title: "Particularity",
            content: "F45 的核心在于其每天不重样的全球统一课程和标志性的屏幕指导系统。场馆内不需要大型机械，而是以各类功能性训练小器械为主，对场地的灵活性要求极高。"
          },
          {
            id: 2,
            title: "Strategy",
            content: "我们为其打造了极具工业风的开阔无柱空间，并完美集成了 F45 的专利多屏显示系统。为了适应深圳高强度的工作节奏，我们特别强化了课后恢复区域的设施配置。"
          },
          {
            id: 3,
            title: "Conclusion",
            content: "该店迅速在深圳科技圈和海归群体中风靡，其“团队作战”的运动氛围极大地增强了会员黏性，成为了社区运动的新范本。"
          }
        ]
      }
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop',
      location: '杭州市上城区',
      name: '乐刻运动 (湖滨银泰店)',
      date: '2023-10-29',
      caseStudy: {
        title: "Case Study: 乐刻运动 24 小时智能健身房的进化",
        location: "中国-杭州",
        date: "29th Oct",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop",
        accordions: [
          {
            id: 0,
            title: "Background",
            content: "乐刻运动作为国内最大的 24 小时智能健身连锁品牌，其湖滨银泰店需要打造成为一个展示其最新智能化成果的旗舰体验店。"
          },
          {
            id: 1,
            title: "Particularity",
            content: "“无人值守”与“24 小时营业”是其核心标签。因此，门禁系统、智能储物柜、器械物联网以及安全监控系统必须做到无缝衔接且极度稳定。"
          },
          {
            id: 2,
            title: "Strategy",
            content: "我们协助其部署了基于人脸识别和扫码的无感通行系统，并将所有有氧器械接入云端，用户可以通过 App 实时查看设备空闲状态和个人运动数据，实现了真正的数字化健身管理。"
          },
          {
            id: 3,
            title: "Conclusion",
            content: "该门店实现了极低的人力运营成本，同时用户满意度大幅提升。其智能化的健身体验成为了乐刻向全国推广新门店的标准模板。"
          }
        ]
      }
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
      location: '成都市锦江区',
      name: '威尔仕健身 (太古里店)',
      date: '2023-10-30',
      caseStudy: {
        title: "Case Study: 威尔仕 VIP 会所的奢华升级",
        location: "中国-成都",
        date: "30th Oct",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=900&fit=crop",
        accordions: [
          {
            id: 0,
            title: "Background",
            content: "位于成都太古里商圈的威尔仕健身，定位为高端 VIP 会所。除了提供基础的健身服务，更注重为会员提供集休闲、社交、运动于一体的第三空间。"
          },
          {
            id: 1,
            title: "Particularity",
            content: "项目不仅包含传统的器械区，还设有恒温泳池、高端 SPA、健康轻食吧等多元化业态。设计风格需与太古里的整体商业氛围相契合，体现出低调的奢华感。"
          },
          {
            id: 2,
            title: "Strategy",
            content: "我们在空间设计中大量运用了木质、石材与金属的碰撞，营造出温暖而高级的氛围。特别定制的空气净化系统和水处理系统，确保了全天候的舒适体验。器械采购则全部选用国际一线品牌的旗舰型号。"
          },
          {
            id: 3,
            title: "Conclusion",
            content: "威尔仕太古里店重塑了成都传统商业健身房的形象，成功吸引了大量高端客群，成为了成都商业健身领域标杆性的豪华会所。"
          }
        ]
      }
    }
  ];

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

  // 客户评价数据
  const testimonials = [
    {
      id: 1,
      content: "醒动团队为我们提供了极其专业的选品建议。他们不仅懂产品，更懂市场趋势。在他们的帮助下，我们的健身房器械采购成本降低了20%，但会员满意度却大幅提升。",
      author: "张总",
      role: "某高端连锁健身房 创始人",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      content: "作为一家初创的运动科技品牌，我们非常感谢醒动的供应链资源整合能力。他们帮助我们快速找到了符合严苛质量标准的代工厂，让我们的智能跳绳得以提前3个月量产上市。",
      author: "李明",
      role: "智能运动硬件公司 CEO",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      content: "与醒动的合作是一次非常愉快的体验。他们对于全球运动健身产业的洞察令人印象深刻。从最初的概念规划到最终的产品落地，他们始终是我们最可靠的战略伙伴。",
      author: "Sarah",
      role: "国际运动服饰品牌 亚太区总监",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleTestimonialChange = (direction: 'prev' | 'next') => {
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

  // 切换案例的函数
  const handleCaseChange = (direction: 'prev' | 'next') => {
    setActiveAccordion(0); // 切换案例时重置折叠面板
    if (direction === 'prev') {
      setActiveCaseIndex((prev) => (prev > 0 ? prev - 1 : venueCards.length - 1));
    } else {
      setActiveCaseIndex((prev) => (prev < venueCards.length - 1 ? prev + 1 : 0));
    }
  };

  const currentCaseStudy = venueCards[activeCaseIndex].caseStudy;
  const caseStudyImages = currentCaseStudy.images && currentCaseStudy.images.length > 0 
    ? currentCaseStudy.images 
    : [
        currentCaseStudy.image,
        venueCards[activeCaseIndex].image.replace(/w=\d+&h=\d+/, 'w=1400&h=1000'),
        'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=1400&h=1000&fit=crop',
      ];
  const displayedCaseStudyImage = caseStudyImages[caseStudyImageIndex] ?? currentCaseStudy.image;
  const caseStudyVideos = [
    caseStudyVideoUrl,
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://www.w3schools.com/html/movie.mp4',
  ];
  const displayedCaseStudyVideo = caseStudyVideos[caseStudyImageIndex] ?? caseStudyVideoUrl;

  // 自动轮播 - 热点场所
  useEffect(() => {
    const container = venueScrollRef.current;
    if (!container) return;

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
    if (!container) return;

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
    if (!venueScrollRef.current) return;
    setIsVenueDragging(true);
    setVenueStartX(clientX - venueScrollRef.current.offsetLeft);
    setVenueScrollLeft(venueScrollRef.current.scrollLeft);
  };

  const handleVenueDragMove = (clientX: number) => {
    if (!isVenueDragging || !venueScrollRef.current) return;
    const x = clientX - venueScrollRef.current.offsetLeft;
    const walk = (x - venueStartX) * 2;
    venueScrollRef.current.scrollLeft = venueScrollLeft - walk;
  };

  const handleVenueDragEnd = () => {
    setIsVenueDragging(false);
  };

  // 拖拽事件处理 - 品牌墙
  const handleBrandDragStart = (clientX: number) => {
    if (!brandScrollRef.current) return;
    setIsBrandDragging(true);
    setBrandStartX(clientX - brandScrollRef.current.offsetLeft);
    setBrandScrollLeft(brandScrollRef.current.scrollLeft);
  };

  const handleBrandDragMove = (clientX: number) => {
    if (!isBrandDragging || !brandScrollRef.current) return;
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

  // 为了实现无缝轮播，复制一份数据
  const displayCards = [...venueCards, ...venueCards, ...venueCards];
  const [hoveredCategoryCardId, setHoveredCategoryCardId] = useState<number | null>(null);
  const [isCaseStudyHovered, setIsCaseStudyHovered] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] pt-20 pb-0 md:pt-32 md:pb-0">
        <div className="absolute inset-0 overflow-hidden">
          {heroBanners.map((banner, idx) => (
            <img
              key={banner.id || idx}
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
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,255,0,0.15),transparent_45%)]" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/60" />
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

            {/* Centered Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHeroIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeHeroIndex ? 'w-8 bg-[#c8ff00]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="content-container relative z-10 py-12 md:py-20 flex flex-col justify-center h-full min-h-[calc(100svh-160px)]">
         
         

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            {t('home.hero.titleLeft')} <span className="text-[#c8ff00]">·</span> {t('home.hero.titleRight')}
          </h1>

          {/* Description */}
          <p className="text-white/70 text-lg mb-12 max-w-2xl pr-2" style={{fontSize: '1rem'}}>
            {t('home.hero.descLine1')}
            <br />
            {t('home.hero.descLine2')}
          </p>

          {/* CTA Button */}
          
            <Link to="/contact" className="relative z-10 inline-flex items-center gap-3 bg-[#c8ff00] text-black pl-5 pr-1.5 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform w-fit">
                    <span>{t('cta.getStarted')}</span>
                    <span className="bg-white rounded-full p-1.5 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
           
        </div>
        {/* Venue Cards Slider Section */}
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
              onMouseDown={handleVenueMouseDown}
              onMouseLeave={handleVenueDragEnd}
              onMouseUp={handleVenueDragEnd}
              onMouseMove={handleVenueMouseMove}
              onTouchStart={handleVenueTouchStart}
              onTouchEnd={handleVenueDragEnd}
              onTouchCancel={handleVenueDragEnd}
              onTouchMove={handleVenueTouchMove}
              className={`flex overflow-x-hidden gap-4 pb-8 select-none ${isVenueDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
          </div>
          </div>
        </section>
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
                  {currentCaseStudy.accordions.map((item, index) => {
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
                onMouseEnter={() => setIsCaseStudyHovered(true)}
                onMouseLeave={() => setIsCaseStudyHovered(false)}
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
            </div>
          </div>
        </div>
      </section>
 {/* Brands Logo Wall Section */}
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
                  {/* BORGWARNER */}
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/borgwarner-1.svg"
                      alt="BORGWARNER"
                      className="h-full w-auto object-contain opacity-80 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                  {/* LENNAR */}
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/lennar.svg"
                      alt="LENNAR"
                      className="h-full w-auto object-contain opacity-80 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                  {/* NORWEGIAN CRUISE LINE */}
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/norwegian-cruise-line.svg"
                      alt="NORWEGIAN CRUISE LINE"
                      className="h-full w-auto object-contain opacity-80 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                  {/* adidas */}
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/adidas-4.svg"
                      alt="adidas"
                      className="h-full w-auto object-contain opacity-80 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                  {/* FILA */}
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/fila-9.svg"
                      alt="FILA"
                      className="h-full w-auto object-contain opacity-80 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                  {/* Nike */}
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/nike-11.svg"
                      alt="Nike"
                      className="h-full w-auto object-contain opacity-80 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                  {/* PUMA */}
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/puma-logo.svg"
                      alt="PUMA"
                      className="h-full w-auto object-contain opacity-80 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                  {/* Reebok */}
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img
                      src="https://cdn.worldvectorlogo.com/logos/reebok-1.svg"
                      alt="Reebok"
                      className="h-full w-auto object-contain opacity-80 pointer-events-none"
                      draggable="false"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Edge fade effects */}
            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
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
