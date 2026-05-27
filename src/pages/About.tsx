import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Globe, Quote, Target, TrendingUp, Users } from 'lucide-react';
import { useImageConfig } from '../hooks/useImageConfig';
import { useI18n } from '../i18n/I18nProvider';

const About = () => {
  const { config, loading } = useImageConfig();
  const { lang, t } = useI18n();

  const businessTypes = useMemo(
    () => [
      {
        icon: Globe,
        title: lang === 'zh' ? '全球选品与品牌引入' : 'Global Curation & Brand Sourcing',
        description:
          lang === 'zh'
            ? '围绕跑步机、椭圆机、爬楼机、动感单车等核心品类，提供趋势洞察、品牌筛选与对接落地。'
            : 'Across treadmills, ellipticals, stair climbers, cycling and more, we deliver trend insights, brand screening, and end-to-end onboarding.',
      },
      {
        icon: Target,
        title: lang === 'zh' ? '场景化解决方案' : 'Scenario-based Solutions',
        description:
          lang === 'zh'
            ? '针对健身房、酒店、企业、学校等不同场景，输出从选型到陈列动线与交付的整体方案。'
            : 'For gyms, hotels, enterprises, and schools, we provide full solutions from selection to layout planning and delivery.',
      },
      {
        icon: Award,
        title: lang === 'zh' ? '品质与合规把控' : 'Quality & Compliance',
        description:
          lang === 'zh'
            ? '从供应链源头到交付验收，建立可追溯标准体系，确保性能稳定、体验一致与服务可持续。'
            : 'From source to acceptance, traceable standards ensure stable performance, consistent experience, and sustainable service.',
      },
      {
        icon: TrendingUp,
        title: lang === 'zh' ? '产品矩阵与增长策略' : 'Portfolio & Growth Strategy',
        description:
          lang === 'zh'
            ? '结合用户画像与训练需求，构建分层产品矩阵，协助伙伴打造可复购的“训练体验”。'
            : 'We build tiered portfolios based on personas and training needs to help partners create repeatable training experiences.',
      },
      {
        icon: Users,
        title: lang === 'zh' ? '服务与培训支持' : 'Service & Training',
        description:
          lang === 'zh'
            ? '提供售前咨询、产品培训、内容运营素材与售后协同，提升落地效率与长期口碑。'
            : 'We support pre-sales, product training, content assets, and after-sales collaboration to improve rollout efficiency and long-term trust.',
      },
    ],
    [lang],
  );

  const teamMembers = [
    {
      name: 'Star Liu',
      title: 'Founder',
      desc: 'ABLAZING Company Founder',
      avatar: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/team/team1.jpg?w=600&h=600&fit=crop',
    },
    {
      name: 'Alan',
      title: 'Senior Vice President',
      desc: 'Hardware Technologies',
      avatar: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/team/team2.jpg?w=600&h=600&fit=crop',
    },
    {
      name: 'John Ternus',
      title: 'Senior Vice President',
      desc: 'Hardware Engineering',
      avatar: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/team/team3.jpg?w=600&h=600&fit=crop',
    },
    {
      name: 'Lisa Maestri',
      title: 'Vice President',
      desc: 'Corporate Services',
      avatar: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/team/team4.png?w=600&h=600&fit=crop',
    },
    {
      name: 'Molly Anderson',
      title: 'Vice President',
      desc: 'Industrial Design',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop',
    },
    {
      name: 'Mike Fenger',
      title: 'Vice President',
      desc: 'Worldwide Sales',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=600&fit=crop',
    },
    {
      name: 'Steve Lemay',
      title: 'Vice President',
      desc: 'Human Interface Design',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=600&fit=crop',
    },
    {
      name: 'Tor Myhren',
      title: 'Vice President',
      desc: 'Marketing Communications',
      avatar: 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=600&h=600&fit=crop',
    },
  ];

  const teamPrinciples = [
    {
      ...teamMembers[0],
      content: '深耕中国健身运动产业的优质化之路，坚守长期主义，让健康运动成为生活常态，让更多人拥有美好的运动生活——这是我们的使命。',
    },
    {
      ...teamMembers[1],
      content: '以“稳定交付”为底线，把复杂供应链变成可复制的流程，保证质量、节奏与体验一致。',
    },
    {
      ...teamMembers[2],
      content: '从用户训练路径出发做产品工程，让器械不只“参数漂亮”，更要“用起来顺”。',
    },
    {
      ...teamMembers[3],
      content: '把服务做成体系：售前有方法、交付有标准、售后可追踪，让合作伙伴持续省心。',
    },
    {
      ...teamMembers[4],
      content: '用设计语言统一空间体验，兼顾安全与美感，让训练空间更有品牌记忆点。',
    },
    {
      ...teamMembers[5],
      content: '以增长为目标做选品策略：覆盖关键品类、建立梯度结构，提升转化与复购。',
    },
    {
      ...teamMembers[6],
      content: '尊重真实使用场景，把人机工学与交互细节做到位，降低学习成本与维护成本。',
    },
    {
      ...teamMembers[7],
      content: '用清晰表达与内容资产链接市场，让好产品被看见、被理解、被选择。',
    },
  ];
  const teamPrinciplesEn = [
    'Make decisions with verifiable data and cost models, so every selection compounds long-term certainty.',
    'Treat stable delivery as the baseline—turn complex supply chains into repeatable processes with consistent quality, pace, and experience.',
    'Engineer products from real training journeys: not just great specs, but smooth and intuitive use.',
    'Systemize service: methods for pre-sales, standards for delivery, and traceable after-sales—so partners stay worry-free.',
    'Unify spatial experience with design language, balancing safety and aesthetics to create strong brand memory.',
    'Build selection strategies for growth: cover key categories, create tiered structures, and improve conversion and repeat purchases.',
    'Respect real-world scenarios: refine ergonomics and interaction details to reduce learning and maintenance costs.',
    'Connect products to the market with clear communication and content assets—so great products get seen, understood, and chosen.',
  ];

  const [activePrinciple, setActivePrinciple] = useState(0);

  const handlePrincipleChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActivePrinciple((prev) => (prev > 0 ? prev - 1 : teamPrinciples.length - 1));
    } else {
      setActivePrinciple((prev) => (prev < teamPrinciples.length - 1 ? prev + 1 : 0));
    }
  };

  const updates = [
    {
      id: 1,
      date: '2026-05-08',
      tag: '项目进展',
      title: '华东区域 3 家门店训练区升级完成',
      excerpt: '完成器械分区与动线优化，引入更稳定的力量区组合，并同步更新维护与培训手册。',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&h=900&fit=crop',
    },
    {
      id: 2,
      date: '2026-05-02',
      tag: '新品入库',
      title: '有氧与恢复品类新增 12 个 SKU',
      excerpt: '围绕跑步、椭圆与恢复场景补齐关键规格，提升空间适配与选型效率。',
      image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1400&h=900&fit=crop',
    },
    {
      id: 3,
      date: '2026-04-24',
      tag: '服务升级',
      title: '交付验收标准与备件体系更新',
      excerpt: '从安装、调试到验收全流程统一标准，降低返工率并提升长期稳定运行能力。',
      image: 'https://images.unsplash.com/photo-1526401485004-2aa6b5f6c2e5?w=1400&h=900&fit=crop',
    },
    {
      id: 4,
      date: '2026-04-12',
      tag: '行业观察',
      title: '训练体验从“器械”走向“系统”',
      excerpt: '我们整理了近期场馆运营反馈，沉淀出适配不同客群的产品矩阵与组合方法。',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400&h=900&fit=crop',
    },
    {
      id: 5,
      date: '2026-04-05',
      tag: '交付案例',
      title: '酒店健身房空间方案上线',
      excerpt: '针对高频与高净值客群优化器械组合与动线，强调噪音控制与安全冗余。',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=900&fit=crop',
    },
    {
      id: 6,
      date: '2026-03-28',
      tag: '培训支持',
      title: '门店教练产品培训第 6 期完成',
      excerpt: '围绕有氧、力量与恢复区的教学与维护要点，形成可复用的上手资料包。',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&h=900&fit=crop',
    },
    {
      id: 7,
      date: '2026-03-18',
      tag: '体验优化',
      title: '器械标识与引导系统升级',
      excerpt: '统一信息层级与视觉规范，降低用户学习成本，提升训练路径连贯性。',
      image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1400&h=900&fit=crop',
    },
    {
      id: 8,
      date: '2026-03-06',
      tag: '行业观察',
      title: '从“单点爆品”到“矩阵组合”',
      excerpt: '不同场馆的增长逻辑不一样，我们把品类组合策略拆成了可执行的清单。',
      image: 'https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=1400&h=900&fit=crop',
    },
  ];

  const [activeUpdate, setActiveUpdate] = useState(0);
  const [isUpdatesHovered, setIsUpdatesHovered] = useState(false);

  const handleUpdateChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveUpdate((prev) => (prev > 0 ? prev - 1 : updates.length - 1));
    } else {
      setActiveUpdate((prev) => (prev < updates.length - 1 ? prev + 1 : 0));
    }
  };

  useEffect(() => {
    if (updates.length <= 1) return;
    if (isUpdatesHovered) return;
    const id = window.setInterval(() => {
      setActiveUpdate((prev) => (prev < updates.length - 1 ? prev + 1 : 0));
    }, 4500);
    return () => window.clearInterval(id);
  }, [isUpdatesHovered, updates.length]);

  const partnersLogoWallRef = useRef<HTMLDivElement>(null);
  const [isPartnersLogoWallDragging, setIsPartnersLogoWallDragging] = useState(false);
  const [partnersLogoWallStartX, setPartnersLogoWallStartX] = useState(0);
  const [partnersLogoWallScrollLeft, setPartnersLogoWallScrollLeft] = useState(0);
  const [isPartnersLogoWallHovered, setIsPartnersLogoWallHovered] = useState(false);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <section className="relative min-h-[100svh] pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          {config.company.hero ? <img src={config.company.hero} alt="" className="w-full h-full object-cover object-center" draggable="false" /> : null}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-white/80" />
        </div>
        <div className="content-container relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
              {t('about.title')}
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-white">
              {lang === 'zh' ? '关于醒动' : 'About Ablazing'}
            </h1>
            <div className="mt-4 text-white/75 text-sm md:text-base">
              {t('home.hero.titleLeft')} <span className="text-[#c8ff00]">·</span> {t('home.hero.titleRight')}
            </div>
            <div className="mt-8 max-w-3xl text-white/70 text-sm md:text-base leading-relaxed">
              {lang === 'zh'
                ? '醒动以“产品与场景”为核心：从跑步机、椭圆机、爬楼机、动感单车等主力品类出发，为健身房、酒店、企业与学校等多场景提供可落地的选品与方案服务。'
                : 'Ablazing puts products and scenarios at the center. Starting from core categories like treadmills, ellipticals, stair climbers and cycling, we deliver actionable curation and solutions for gyms, hotels, enterprises, and schools.'}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">
                {lang === 'zh' ? '用全球选品，服务每一次增长' : 'Global curation for every growth moment'}
              </h2>
              <div className="mt-8 space-y-4 text-black/70 text-sm md:text-base leading-relaxed">
                <p>
                  {lang === 'zh'
                    ? '我们聚焦运动健身产业链的“选品—交付—运营”全流程：围绕有氧、力量、恢复与数字化训练等方向，帮助合作伙伴快速搭建可持续的产品矩阵。'
                    : 'We focus on the full cycle of curation, delivery, and operations—across cardio, strength, recovery, and digital training—helping partners build sustainable product portfolios faster.'}
                </p>
                <p>
                  {lang === 'zh'
                    ? '在产品层面，我们强调体验一致性与长期稳定性；在方案层面，我们强调场景适配与增长结果，让产品真正服务于训练体验与商业回报。'
                    : 'On products, we prioritize consistent experience and long-term reliability. On solutions, we prioritize scenario fit and growth outcomes—so products truly serve training results and business returns.'}
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { k: '200+', v: lang === 'zh' ? '合作工厂与品牌' : 'Factories & brands' },
                  { k: '10Y+', v: lang === 'zh' ? '深耕产业链经验' : 'Supply-chain experience' },
                  { k: lang === 'zh' ? '多品类' : 'Multi-category', v: lang === 'zh' ? '覆盖训练场景' : 'Scenario coverage' },
                  { k: lang === 'zh' ? '高标准' : 'Standards', v: lang === 'zh' ? '交付与售后体系' : 'Delivery & after-sales' },
                ].map((item) => (
                  <div key={item.k} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="text-2xl md:text-3xl font-black text-black">{item.k}</div>
                    <div className="mt-2 text-sm text-black/60 font-semibold">{item.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[28px] md:rounded-[36px] overflow-hidden bg-black/5 border border-black/10">
                <div className="aspect-square md:aspect-[16/11]">
                  {config.company.office ? (
                    <img
                      src={config.company.office}
                      alt={lang === 'zh' ? '公司办公环境' : 'Office'}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              </div>
              <div className="mt-6 rounded-[28px] md:rounded-[36px] overflow-hidden bg-black text-white border border-white/10">
                <div className="aspect-square md:aspect-auto">
                  <div className="h-full md:h-auto p-8 md:p-10 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                      {lang === 'zh' ? '业务定位' : 'Positioning'}
                    </div>
                    <div className="mt-6 text-lg md:text-xl font-bold leading-relaxed">
                      {lang === 'zh'
                        ? '从“单品采购”升级为“体验系统”，让每一次选品都指向更好的训练结果与更高的运营效率。'
                        : 'Upgrade from one-off purchasing to an experience system—so every selection drives better training outcomes and higher operational efficiency.'}
                    </div>
                    <div className="mt-4 text-sm text-white/70">
                      {lang === 'zh'
                        ? '适配健身房/酒店/企业/学校等多场景，覆盖有氧、力量、恢复与数字化训练解决方案。'
                        : 'Built for gyms, hotels, enterprises, and schools, covering cardio, strength, recovery, and digital training solutions.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                {lang === 'zh' ? '业务类型' : 'Business'}
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">
                {lang === 'zh' ? '我们提供什么' : 'What we provide'}
              </h2>
              <div className="mt-4 text-black/60 text-sm md:text-base max-w-2xl leading-relaxed">
                {lang === 'zh'
                  ? '以产品信息为输入，以场景与用户需求为约束，输出可落地、可复制、可持续优化的选品与交付体系。'
                  : 'We take product information as input and scenario/user needs as constraints, delivering an actionable, repeatable, and continuously optimizable curation and delivery system.'}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {businessTypes.map((b) => (
              <div key={b.title} className="rounded-[24px] border border-gray-200 bg-white p-7 md:p-8">
                <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-black" />
                </div>
                <div className="mt-6 text-xl font-black text-black">{b.title}</div>
                <div className="mt-3 text-sm md:text-base text-black/65 leading-relaxed">{b.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
              {lang === 'zh' ? '团队成员' : 'Team'}
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">
              {lang === 'zh' ? '专业团队，长期主义' : 'Professional team, long-term mindset'}
            </h2>
            <div className="mt-4 text-black/60 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              {lang === 'zh'
                ? '团队覆盖选品、供应链、产品运营与交付服务，让产品从“看起来很强”到“用起来很稳”，并能持续迭代。'
                : 'Our team covers curation, supply chain, product operations, and delivery—so products go from “great on paper” to “stable in real use”, and keep improving over time.'}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {teamMembers.map((m) => (
              <div key={m.name} className="rounded-[24px] border border-gray-200 bg-white overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100">
                  <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" draggable="false" />
                </div>
                <div className="p-5">
                  <div className="text-sm font-black text-black">{m.name}</div>
                  <div className="mt-1 text-xs text-black/60 font-semibold">{m.title}</div>
                  <div className="mt-2 text-xs text-black/50 leading-relaxed">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white overflow-hidden relative">
        <div className="content-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(200,255,0,0.3)]">
                <Quote className="w-4 h-4 text-black" />
                <span className="text-black text-sm tracking-wide font-bold">{lang === 'zh' ? '团队理念' : 'Principles'}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-black mb-4 tracking-tight">
                {lang === 'zh' ? '把标准做成习惯' : 'Make standards a habit'}
              </h2>
              <div className="mt-4 text-black/60 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                {lang === 'zh'
                  ? '每一条理念，都来自团队日常工作中对“专业、稳定与长期价值”的坚持。'
                  : 'Each principle comes from our daily commitment to professionalism, stability, and long-term value.'}
              </div>
            </div>

            <div className="relative py-8 md:py-12">
              <div className="absolute top-0 left-0 text-black/5 pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>

              <div className="relative z-10 min-h-[300px] flex flex-col justify-center">
                <p
                  key={activePrinciple}
                  className="text-xl md:text-3xl text-gray-800 leading-[1.8] text-center font-medium mb-16 animate-fade-in"
                >
                  "{lang === 'zh' ? teamPrinciples[activePrinciple].content : teamPrinciplesEn[activePrinciple]}"
                </p>

                <div className="flex flex-col items-center gap-5 mt-auto">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <img
                      key={`avatar-${activePrinciple}`}
                      src={teamPrinciples[activePrinciple].avatar}
                      alt={teamPrinciples[activePrinciple].name}
                      className="w-full h-full object-cover animate-fade-in"
                      draggable="false"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-black font-bold text-xl mb-1">{teamPrinciples[activePrinciple].name}</h4>
                    <p className="text-gray-500 text-sm tracking-wide font-medium">
                      {teamPrinciples[activePrinciple].title} · {teamPrinciples[activePrinciple].desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 mt-12 md:absolute md:top-1/2 md:-left-12 md:-right-12 md:-translate-y-1/2 md:mt-0 md:justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() => handlePrincipleChange('prev')}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-all duration-300 pointer-events-auto shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePrincipleChange('next')}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-all duration-300 pointer-events-auto shadow-sm"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                {lang === 'zh' ? '醒动动态' : 'Updates'}
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">
                {lang === 'zh' ? '最近发生的事' : "What's new"}
              </h2>
              <div className="mt-4 text-black/60 text-sm md:text-base max-w-2xl leading-relaxed">
                {lang === 'zh'
                  ? '记录项目交付、新品引入、服务升级与行业观察，让你更快了解醒动的最新进展。'
                  : 'Project delivery, new arrivals, service upgrades and insights—so you can quickly catch up on what’s happening.'}
              </div>
            </div>
          </div>

          <div
            className="mt-12 relative"
            onMouseEnter={() => setIsUpdatesHovered(true)}
            onMouseLeave={() => setIsUpdatesHovered(false)}
          >
            <div className="rounded-[28px] md:rounded-[36px] overflow-hidden border border-gray-200 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-5 bg-black/5">
                  <div className="aspect-[16/10]">
                    <img
                      key={`update-img-${activeUpdate}`}
                      src={updates[activeUpdate]?.image}
                      alt={updates[activeUpdate]?.title}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  </div>
                </div>
                <div className="md:col-span-7 p-7 md:p-10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center bg-black/5 border border-black/10 px-3 py-1 rounded-full text-xs font-bold text-black">
                      {updates[activeUpdate]?.tag}
                    </div>
                    <div className="text-xs text-black/40 font-semibold">{updates[activeUpdate]?.date}</div>
                  </div>
                  <div className="mt-6 text-2xl md:text-3xl font-black text-black tracking-tight">
                    {updates[activeUpdate]?.title}
                  </div>
                  <div className="mt-4 text-sm md:text-base text-black/60 leading-relaxed">
                    {updates[activeUpdate]?.excerpt}
                  </div>

                  <div className="mt-10 flex items-center justify-between gap-4">
                    <div className="text-xs text-black/40 font-semibold tracking-[0.2em]">
                      {String(activeUpdate + 1).padStart(2, '0')}/{String(updates.length).padStart(2, '0')}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateChange('prev')}
                        className="w-10 h-10 rounded-full bg-black/5 border border-black/10 text-black/70 hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-colors flex items-center justify-center"
                        aria-label={lang === 'zh' ? '上一条动态' : 'Previous update'}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateChange('next')}
                        className="w-10 h-10 rounded-full bg-black/5 border border-black/10 text-black/70 hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-colors flex items-center justify-center"
                        aria-label={lang === 'zh' ? '下一条动态' : 'Next update'}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="content-container">
          <div className="text-center mb-16">
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
                        className="h-full w-auto object-contain opacity-80"
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
    </div>
  );
};

export default About;
