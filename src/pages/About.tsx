import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { useImageConfig } from '../hooks/useImageConfig';
import { useI18n } from '../i18n/I18nProvider';
import { useBrands } from '../hooks/useBrands';
import { useTeamMembers } from '../hooks/useTeamMembers';
import { useDynamicNews } from '../hooks/useDynamicNews';

const About = () => {
  const { config, loading } = useImageConfig();
  const { lang, t } = useI18n();
  const { brands: partnersLogos } = useBrands();
  const { members: apiMembers } = useTeamMembers();
  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const { news: apiNews, totalPages } = useDynamicNews(currentPage, pageSize);

  const businessContent = useMemo(
    () => ({
      intro: {
        title: lang === 'zh' ? '我们交付的，远不止设备' : 'We deliver far more than equipment',
        paragraphs: [
          lang === 'zh'
            ? '醒动ABLAZING，是一家专注于国际顶尖健身器材与康复抗衰设备的经销代理公司。但我们交付的，远不止设备本身。'
            : 'ABLAZING is a distributor of internationally top-tier fitness equipment and rehabilitation/anti-aging solutions. But what we deliver goes far beyond the equipment itself.',
          lang === 'zh'
            ? '我们更核心的能力，是帮助健身俱乐部完成品牌升级——从空间体验、产品矩阵到服务内容，让每一家俱乐部都具备更强的竞争力与更良性的盈利能力。'
            : 'Our core capability is helping fitness clubs complete brand upgrades—from spatial experience and product portfolio to service content—giving every club stronger competitiveness and healthier profitability.',
        ],
      },
      drivers: {
        title: lang === 'zh' ? '如何驱动增长？我们有一套可量化的逻辑' : 'How do we drive growth? We have a quantifiable logic',
        items: [
          {
            title: lang === 'zh' ? '品牌溢价提升' : 'Brand premium growth',
            description:
              lang === 'zh'
                ? '通过引入国际一线设备与康复抗衰科技，帮助俱乐部实现单店坪效提升，客户续费率同比提高15%-20%。'
                : 'By introducing internationally top-tier equipment and rehabilitation/anti-aging technology, we help clubs improve per-square-meter efficiency and increase member renewal rates by 15%-20% year-over-year.',
          },
          {
            title: lang === 'zh' ? '差异化内容赋能' : 'Differentiated content empowerment',
            description:
              lang === 'zh'
                ? '我们提供的不仅是器械，更是可落地的训练与恢复课程体系，让俱乐部从“同质化竞争”中跳脱，客户到店频次提升30%。'
                : 'We provide not only equipment but also actionable training and recovery course systems, helping clubs break away from homogeneous competition and increasing customer visit frequency by 30%.',
          },
          {
            title: lang === 'zh' ? '全生命周期服务' : 'Full-lifecycle service',
            description:
              lang === 'zh'
                ? '从空间规划、设备选型到售后运维，减少客户运营痛点，设备故障率降低30%，延长设备使用周期，降低长期运营成本。'
                : 'From spatial planning and equipment selection to after-sales operation and maintenance, we reduce operational pain points, lower equipment failure rates by 30%, extend equipment lifespan, and reduce long-term operating costs.',
          },
          {
            title: lang === 'zh' ? '数据驱动的迭代建议' : 'Data-driven iteration recommendations',
            description:
              lang === 'zh'
                ? '基于我们服务超过200+高端物业与俱乐部运营经验，反向输出设备配置优化方案，帮助俱乐部精准匹配会员需求，单客年均消费提升25%。'
                : 'Based on our experience serving 200+ premium properties and clubs, we reverse-engineer equipment configuration optimization plans to help clubs precisely match member needs and increase annual consumption per customer by 25%.',
          },
        ],
      },
      conclusion: {
        title: lang === 'zh' ? '不止懂器材，更懂俱乐部的生意' : 'We understand not just equipment, but the club business',
        paragraphs: [
          lang === 'zh'
            ? '醒动ABLAZING的差异化壁垒在于：我们不止懂器材，更懂俱乐部的生意。'
            : 'ABLAZING\'s differentiation lies in this: we understand not just equipment, but the club business.',
          lang === 'zh'
            ? '过去，代理商只关心“卖出去”；今天，我们关心“用得好、赚得到、持续增长”。从高端酒店、顶级住宅会所，到专业健身俱乐部与企业总部，醒动ABLAZING已经帮助超过200家机构完成品牌升级，实现了从“普通场馆”到“区域标杆”的跃迁。'
            : 'In the past, distributors only cared about “selling”; today, we care about “using well, earning well, and sustaining growth.” From luxury hotels and premium residential clubs to professional fitness clubs and corporate headquarters, ABLAZING has helped over 200 institutions complete brand upgrades, leaping from “ordinary venues” to “regional benchmarks.”',
          lang === 'zh'
            ? '让设备为增长服务，让每一处运动空间真正“醒”过来。'
            : 'Let equipment serve growth, and let every movement space truly “wake up.”',
        ],
      },
    }),
    [lang],
  );

  const mockTeamMembers = [
    {
      name: 'Star Liu',
      title: 'Founder',
      position: '创始人',
      desc: 'ABLAZING Company Founder',
      avatar: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/team/team1.jpg?w=600&h=600&fit=crop',
    },
    {
      name: 'Alan',
      title: 'Senior Vice President',
      position: '高级副总裁',
      desc: 'Hardware Technologies',
      avatar: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/team/team2.jpg?w=600&h=600&fit=crop',
    },
    {
      name: 'John Ternus',
      title: 'Senior Vice President',
      position: '高级副总裁',
      desc: 'Hardware Engineering',
      avatar: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/team/team3.jpg?w=600&h=600&fit=crop',
    },
    {
      name: 'Lisa Maestri',
      title: 'Vice President',
      position: '副总裁',
      desc: 'Corporate Services',
      avatar: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/team/team4.png?w=600&h=600&fit=crop',
    },
  ];

  // 将接口数据映射到组件使用的格式
  const teamMembers = apiMembers.length > 0
    ? apiMembers.map((m: any) => ({
        name: m.name || '',
        title: m.title || '', // 使用接口返回的title字段
        position: m.position || '', // 使用接口返回的position字段
        desc: m.description || '',
        avatar: m.photoUrl ? `${m.photoUrl}${m.photoUrl.includes('?') ? '&' : '?'}w=600&h=600&fit=crop` : '',
      }))
    : mockTeamMembers;

  // 使用接口返回的团队成员数据，description作为简介内容
  const teamPrinciples = teamMembers.map((m) => ({
    ...m,
    content: m.desc || '', // desc是从description映射来的
  }));

  const teamPrinciplesEn = teamMembers.map((m) => m.desc || '');

  const [activePrinciple, setActivePrinciple] = useState(0);

  const handlePrincipleChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActivePrinciple((prev) => (prev > 0 ? prev - 1 : teamPrinciples.length - 1));
    } else {
      setActivePrinciple((prev) => (prev < teamPrinciples.length - 1 ? prev + 1 : 0));
    }
  };

  const mockUpdates = [
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
      date: '2026-04-12',
      tag: '行业观察',
      title: '训练体验从"器械"走向"系统"',
      excerpt: '我们整理了近期场馆运营反馈，沉淀出适配不同客群的产品矩阵与组合方法。',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400&h=900&fit=crop',
    },
    {
      id: 4,
      date: '2026-04-05',
      tag: '交付案例',
      title: '酒店健身房空间方案上线',
      excerpt: '针对高频与高净值客群优化器械组合与动线，强调噪音控制与安全冗余。',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&h=900&fit=crop',
    },
  ];

  // 将接口数据映射到组件使用的格式
  const updates = apiNews.length > 0
    ? apiNews.map((n) => ({
        id: n.id,
        date: n.publishDate ? new Date(n.publishDate).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-') : '',
        tag: n.dynamicTypeName || '',
        title: n.title || '',
        excerpt: n.description || '',
        image: n.imageUrl || '',
      }))
    : mockUpdates;

  const partnersLogoWallRef = useRef<HTMLDivElement>(null);
  const [isPartnersLogoWallDragging, setIsPartnersLogoWallDragging] = useState(false);
  const [partnersLogoWallStartX, setPartnersLogoWallStartX] = useState(0);
  const [partnersLogoWallScrollLeft, setPartnersLogoWallScrollLeft] = useState(0);
  const [isPartnersLogoWallHovered, setIsPartnersLogoWallHovered] = useState(false);

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
          <div className="absolute inset-0 bg-[url('https://ablazing.oss-cn-shanghai.aliyuncs.com/uploads/0589af163f4747fe93ea2967e2ba200c.png')] bg-cover bg-center" />
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
                ? <div dangerouslySetInnerHTML={{ __html: '醒动ABLAZING，做为专业高品质运动生活方式的先锋探索构建者。用专业的运动健身商业洞见与系统践行，为更多前沿的美学与专业运动场景打造，提供全方位的运动商业场景功能设计、咨询、与全球顶尖运动设备产品的定制化选品供应服务。<br /><br />同时深入持续协同运营，构建场馆差异化C端运动训练者特色服务。提供从运动装备、营养、恢复、运动表现提升、抗衰、专项运动赛事活动等，全维度、全场景的运动生活方式与运动成长的专业需求服务。' }} />
                : 'Ablazing puts products and scenarios at the center. Starting from core categories like treadmills, ellipticals, stair climbers and cycling, we deliver actionable curation and solutions for gyms, hotels, enterprises, and schools.'}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-black tracking-wider">
                {lang === 'zh' ? '业绩里程碑' : 'Milestones'}
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-black text-black tracking-tight">
                {lang === 'zh' ? '醒动ABLAZING' : 'ABLAZING'}
                <span className="block text-black text-2xl md:text-4xl mt-1">
                  {lang === 'zh' ? '数据化呈现' : 'Data-driven results'}
                </span>
              </h2>
              <p className="mt-4 text-black/70 text-sm md:text-base leading-relaxed">
                {lang === 'zh'
                  ? '用数据说话，用结果证明。每一组数字，都是品牌升级带来的真实回报。'
                  : 'Let data speak, let results prove. Every number represents real returns from brand upgrades.'}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { k: '200+', v: lang === 'zh' ? '高端服务客户' : 'High-end clients' },
                  { k: '50+', v: lang === 'zh' ? '国际一线品牌' : 'Top brands' },
                  { k: '+25%', v: lang === 'zh' ? '单客年均消费提升' : 'Consumption growth' },
                  { k: '15年+', v: lang === 'zh' ? '行业深耕经验' : 'Industry expertise' },
                ].map((item) => (
                  <div key={item.k} className="rounded-xl border-2 border-black/10 bg-white p-4 hover:border-black/30 transition-colors duration-300">
                    <div className="text-2xl md:text-3xl font-black text-black">{item.k}</div>
                    <div className="mt-1 text-xs md:text-sm text-black/70 font-bold">{item.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[24px] md:rounded-[32px] overflow-hidden border-2 border-black/10 bg-white">
                <div className="aspect-square md:aspect-[16/11]">
                  {config?.company?.office ? (
                    <img
                      src={config.company.office}
                      alt={lang === 'zh' ? '公司办公环境' : 'Office'}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                  ) : (
                    <div className="w-full h-full bg-black/5" />
                  )}
                </div>
              </div>
              <div className="mt-4 rounded-[24px] md:rounded-[32px] overflow-hidden bg-black border-2 border-black/10">
                <div className="p-5 md:p-6">
                  <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-black tracking-wider">
                    {lang === 'zh' ? '业绩亮点' : 'Key Results'}
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      { title: lang === 'zh' ? '服务体量' : 'Service Scale', desc: lang === 'zh' ? '200+ 高端酒店、会所、俱乐部及企业总部' : '200+ high-end hotels, clubs & enterprises' },
                      { title: lang === 'zh' ? '品牌资源' : 'Brand Resources', desc: lang === 'zh' ? '50+ 国际一线运动健康品牌直连' : '50+ top international sports brands' },
                      { title: lang === 'zh' ? '运营赋能' : 'Operational Empowerment', desc: lang === 'zh' ? '单客年均消费提升25%，续费率提高15%-20%' : '25% consumption growth, 15-20% renewal increase' },
                      { title: lang === 'zh' ? '服务保障' : 'Service Assurance', desc: lang === 'zh' ? '设备故障率降低30%，交付周期缩短20%' : '30% failure reduction, 20% faster delivery' },
                      { title: lang === 'zh' ? '行业深耕' : 'Industry Expertise', desc: lang === 'zh' ? '核心团队15年+经验，50+标杆项目全案落地' : '15+ years expertise, 50+ benchmark projects' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="flex-none w-6 h-6 rounded-full bg-white text-black font-black text-sm flex items-center justify-center">{idx + 1}</span>
                        <div className="min-w-0">
                          <div className="text-white font-black text-sm">{item.title}</div>
                          <div className="text-white/70 text-xs font-medium mt-0.5">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="text-white/90 text-sm font-black">
                      {lang === 'zh' ? '醒动ABLAZING。用数据说话，用结果证明。' : 'ABLAZING. Let data speak, let results prove.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="content-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-black tracking-wider">
                {lang === 'zh' ? '业务类型' : 'Business'}
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-black text-black tracking-tight">
                {lang === 'zh' ? '我们提供什么' : 'What we provide'}
              </h2>
              <div className="mt-6 rounded-[24px] border-2 border-black/10 bg-black p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-black text-white">{businessContent.intro.title}</h3>
                <div className="mt-4 space-y-3 text-white/80 text-sm md:text-base leading-relaxed">
                  {businessContent.intro.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="text-xl md:text-2xl font-black text-black">{businessContent.drivers.title}</h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessContent.drivers.items.map((item, idx) => (
                  <div key={idx} className="rounded-xl border-2 border-black/10 bg-white p-5 hover:border-black/30 transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <span className="flex-none w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center">{idx + 1}</span>
                      <span className="text-base md:text-lg font-black text-black">{item.title}</span>
                    </div>
                    <p className="mt-3 text-sm text-black/70 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border-2 border-black/10 bg-white p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-black text-black">{businessContent.conclusion.title}</h3>
                <div className="mt-4 space-y-3 text-black/70 text-sm md:text-base leading-relaxed">
                  {businessContent.conclusion.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
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
                ? '团队覆盖选品、供应链、产品运营与交付服务，让产品从"看起来很强"到"用起来很稳"，并能持续迭代。'
                : 'Our team covers curation, supply chain, product operations, and delivery—so products go from "great on paper" to "stable in real use", and keep improving over time.'}
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
                  <div className="mt-2 text-xs text-black/50 leading-relaxed">{m.position}</div>
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
                  ? '每一条理念，都来自团队日常工作中对"专业、稳定与长期价值"的坚持。'
                  : 'Each principle comes from our daily commitment to professionalism, stability, and long-term value.'}
              </div>
            </div>

            <div className="relative py-8 md:py-12">
              <div className="absolute top-0 left-0 text-black/5 pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>

              <div className="relative z-10 min-h-[300px] flex flex-col justify-center">
                {teamPrinciples.length > 0 && (
                  <>
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
                          {teamPrinciples[activePrinciple].title} · {teamPrinciples[activePrinciple].position}
                        </p>
                      </div>
                    </div>
                  </>
                )}
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
                  : 'Project delivery, new arrivals, service upgrades and insights—so you can quickly catch up on what s happening.'}
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((update, index) => (
              <div key={update.id} className="rounded-[28px] md:rounded-[36px] overflow-hidden border border-gray-200 bg-white">
                <div className="aspect-[16/10] bg-black/5">
                  <img
                    key={`update-img-${index}`}
                    src={update.image}
                    alt={update.title}
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex items-center bg-black/5 border border-black/10 px-3 py-1 rounded-full text-xs font-bold text-black">
                      {update.tag}
                    </div>
                    <div className="text-xs text-black/40 font-semibold">{update.date}</div>
                  </div>
                  <div className="mt-4 text-lg md:text-xl font-black text-black tracking-tight line-clamp-2">
                    {update.title}
                  </div>
                  <div className="mt-3 text-sm text-black/60 leading-relaxed line-clamp-3">
                    {update.excerpt}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full bg-black/5 border border-black/10 text-black/70 hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={lang === 'zh' ? '上一页' : 'Previous page'}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentPage ? 'bg-[#c8ff00] w-6' : 'bg-black/20 hover:bg-black/40'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className="w-10 h-10 rounded-full bg-black/5 border border-black/10 text-black/70 hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={lang === 'zh' ? '下一页' : 'Next page'}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {partnersLogos.length > 0 && (
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
                      key={`${setIndex}-${l.id}`}
                      className="h-8 md:h-9 flex items-center justify-center shrink-0"
                    >
                      <img
                        src={l.logoUrl}
                        alt={l.name}
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
      )}
    </div>
  );
};

export default About;