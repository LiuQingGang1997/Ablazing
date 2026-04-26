import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Award, Globe, Quote, Target, TrendingUp, Users } from 'lucide-react';
import { useImageConfig } from '../hooks/useImageConfig';

const About = () => {
  const { config, loading } = useImageConfig();

  const businessTypes = [
    {
      icon: Globe,
      title: '全球选品与品牌引入',
      description: '围绕跑步机、椭圆机、爬楼机、动感单车等核心品类，提供趋势洞察、品牌筛选与对接落地。',
    },
    {
      icon: Target,
      title: '场景化解决方案',
      description: '针对健身房、酒店、企业、学校等不同场景，输出从选型到陈列动线与交付的整体方案。',
    },
    {
      icon: Award,
      title: '品质与合规把控',
      description: '从供应链源头到交付验收，建立可追溯标准体系，确保性能稳定、体验一致与服务可持续。',
    },
    {
      icon: TrendingUp,
      title: '产品矩阵与增长策略',
      description: '结合用户画像与训练需求，构建分层产品矩阵，协助伙伴打造可复购的“训练体验”。',
    },
    {
      icon: Users,
      title: '服务与培训支持',
      description: '提供售前咨询、产品培训、内容运营素材与售后协同，提升落地效率与长期口碑。',
    },
  ];

  const teamMembers = [
    {
      name: 'Kevin Park',
      title: 'Vice President',
      desc: 'Chief Financial Officer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop',
    },
    {
      name: 'Johnny Srouji',
      title: 'Senior Vice President',
      desc: 'Hardware Technologies',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop',
    },
    {
      name: 'John Ternus',
      title: 'Senior Vice President',
      desc: 'Hardware Engineering',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=600&h=600&fit=crop',
    },
    {
      name: 'Lisa Maestri',
      title: 'Vice President',
      desc: 'Corporate Services',
      avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&h=600&fit=crop',
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

  const testimonials = [
    {
      id: 1,
      content:
        '醒动团队为我们提供了极其专业的选品建议。他们不仅懂产品，更懂市场趋势。在他们的帮助下，我们的健身房器械采购成本降低了20%，但会员满意度却大幅提升。',
      author: '张总',
      role: '某高端连锁健身房 创始人',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    },
    {
      id: 2,
      content:
        '作为一家初创的运动科技品牌，我们非常感谢醒动的供应链资源整合能力。他们帮助我们快速找到了符合严苛质量标准的代工厂，让我们的智能跳绳得以提前3个月量产上市。',
      author: '李明',
      role: '智能运动硬件公司 CEO',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    },
    {
      id: 3,
      content:
        '与醒动的合作是一次非常愉快的体验。他们对于全球运动健身产业的洞察令人印象深刻。从最初的概念规划到最终的产品落地，他们始终是我们最可靠的战略伙伴。',
      author: 'Sarah',
      role: '国际运动服饰品牌 亚太区总监',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleTestimonialChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setActiveTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
    } else {
      setActiveTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
    }
  };

  const partnersLogoWallRef = useRef<HTMLDivElement>(null);
  const [isPartnersLogoWallDragging, setIsPartnersLogoWallDragging] = useState(false);
  const [partnersLogoWallStartX, setPartnersLogoWallStartX] = useState(0);
  const [partnersLogoWallScrollLeft, setPartnersLogoWallScrollLeft] = useState(0);
  const [isPartnersLogoWallHovered, setIsPartnersLogoWallHovered] = useState(false);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          {config.company.hero ? <img src={config.company.hero} alt="" className="w-full h-full object-cover" draggable="false" /> : null}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-white/80" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
              公司介绍
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-black tracking-tight text-white">关于醒动</h1>
            <div className="mt-4 text-white/75 text-sm md:text-base">
              全球运动健身 <span className="text-[#c8ff00]">·</span> 专业选品服务商
            </div>
            <div className="mt-8 max-w-3xl text-white/70 text-sm md:text-base leading-relaxed">
              醒动以“产品与场景”为核心：从跑步机、椭圆机、爬楼机、动感单车等主力品类出发，
              为健身房、酒店、企业与学校等多场景提供可落地的选品与方案服务。
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight">用全球选品，服务每一次增长</h2>
              <div className="mt-8 space-y-4 text-black/70 text-sm md:text-base leading-relaxed">
                <p>
                  我们聚焦运动健身产业链的“选品—交付—运营”全流程：围绕有氧、力量、恢复与数字化训练等方向，
                  帮助合作伙伴快速搭建可持续的产品矩阵。
                </p>
                <p>
                  在产品层面，我们强调体验一致性与长期稳定性；在方案层面，我们强调场景适配与增长结果，
                  让产品真正服务于训练体验与商业回报。
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { k: '200+', v: '合作工厂与品牌' },
                  { k: '10年+', v: '深耕产业链经验' },
                  { k: '多品类', v: '覆盖训练场景' },
                  { k: '高标准', v: '交付与售后体系' },
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
                <div className="aspect-[16/11]">
                  {config.company.office ? (
                    <img src={config.company.office} alt="公司办公环境" className="w-full h-full object-cover" draggable="false" />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              </div>
              <div className="mt-6 rounded-[28px] md:rounded-[36px] overflow-hidden bg-black text-white border border-white/10">
                <div className="p-8 md:p-10">
                  <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                    业务定位
                  </div>
                  <div className="mt-6 text-lg md:text-xl font-bold leading-relaxed">
                    从“单品采购”升级为“体验系统”，让每一次选品都指向更好的训练结果与更高的运营效率。
                  </div>
                  <div className="mt-4 text-sm text-white/70">
                    适配健身房/酒店/企业/学校等多场景，覆盖有氧、力量、恢复与数字化训练解决方案。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                业务类型
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">我们提供什么</h2>
              <div className="mt-4 text-black/60 text-sm md:text-base max-w-2xl leading-relaxed">
                以产品信息为输入，以场景与用户需求为约束，输出可落地、可复制、可持续优化的选品与交付体系。
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
        <div className="container-custom">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
              团队成员
            </div>
            <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">专业团队，长期主义</h2>
            <div className="mt-4 text-black/60 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              团队覆盖选品、供应链、产品运营与交付服务，让产品从“看起来很强”到“用起来很稳”，并能持续迭代。
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

      <section className="py-16 md:py-24 bg-white border-y border-gray-100 overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(200,255,0,0.3)]">
                <Quote className="w-4 h-4 text-black" />
                <span className="text-black text-sm tracking-wide font-bold">客户评价</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-black mb-4 tracking-tight">听听他们怎么说</h2>
            </div>

            <div className="relative py-8 md:py-12">
              <div className="absolute top-0 left-0 text-black/5 pointer-events-none">
                <Quote className="w-24 h-24 rotate-180" />
              </div>

              <div className="relative z-10 min-h-[300px] flex flex-col justify-center">
                <p
                  key={activeTestimonial}
                  className="text-xl md:text-3xl text-gray-800 leading-[1.8] text-center font-medium mb-16 animate-fade-in"
                >
                  "{testimonials[activeTestimonial].content}"
                </p>

                <div className="flex flex-col items-center gap-5 mt-auto">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                    <img
                      key={`avatar-${activeTestimonial}`}
                      src={testimonials[activeTestimonial].avatar}
                      alt={testimonials[activeTestimonial].author}
                      className="w-full h-full object-cover animate-fade-in"
                      draggable="false"
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="text-black font-bold text-xl mb-1">{testimonials[activeTestimonial].author}</h4>
                    <p className="text-gray-500 text-sm tracking-wide font-medium">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 mt-12 md:absolute md:top-1/2 md:-left-12 md:-right-12 md:-translate-y-1/2 md:mt-0 md:justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() => handleTestimonialChange('prev')}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-[#c8ff00] hover:text-black hover:border-transparent transition-all duration-300 pointer-events-auto shadow-sm"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
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

      <section className="py-16 md:py-24 bg-white border-y border-gray-100 overflow-hidden">
        <div className="container-custom max-w-[1400px]">
          <div className="text-center mb-16">
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
                    <div
                      key={`${setIndex}-${l.alt}`}
                      className={`${l.h} opacity-40 hover:opacity-100 transition-opacity duration-300 pointer-events-none grayscale flex items-center justify-center shrink-0`}
                    >
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
    </div>
  );
};

export default About;
