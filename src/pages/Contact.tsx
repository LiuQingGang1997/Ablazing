import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, AtSign, MapPin, Phone, Quote } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

const Contact = () => {
  const { lang, t } = useI18n();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    type: '家用',
    message: '',
    website: '',
  });
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const contactInfo = useMemo(
    () => [
      { title: lang === 'zh' ? '公众号' : 'Official', value: '@ABLAZING', icon: AtSign },
      { title: lang === 'zh' ? '联系地址' : 'Address', value: lang === 'zh' ? '领巢大厦，上海市' : 'Lingchao Building, Shanghai', icon: MapPin },
      { title: lang === 'zh' ? '联系电话' : 'Phone', value: '+1234 5678978', icon: Phone },
    ],
    [lang],
  );

  const typeOptions = useMemo(
    () =>
      [
        { value: '家用', label: lang === 'zh' ? '家用' : 'Home' },
        { value: '企业', label: lang === 'zh' ? '企业' : 'Business' },
        { value: '酒店', label: lang === 'zh' ? '酒店' : 'Hotel' },
        { value: '健身房', label: lang === 'zh' ? '健身房' : 'Gym' },
        { value: '设计', label: lang === 'zh' ? '设计' : 'Design' },
        { value: '学校', label: lang === 'zh' ? '学校' : 'School' },
        { value: '售后', label: lang === 'zh' ? '售后' : 'After-sales' },
        { value: '其他', label: lang === 'zh' ? '其他' : 'Other' },
      ] as const,
    [lang],
  );

  const testimonials = useMemo(
    () => [
      {
        id: 1,
        content:
          lang === 'zh'
            ? '醒动团队为我们提供了极其专业的选品建议。他们不仅懂产品，更懂市场趋势。在他们的帮助下，我们的健身房器械采购成本降低了20%，但会员满意度却大幅提升。'
            : 'Ablazing gave us highly professional product-selection advice. They understand products and market trends. With their help, our equipment costs dropped by 20% while member satisfaction increased significantly.',
        author: lang === 'zh' ? '张总' : 'Mr. Zhang',
        role: lang === 'zh' ? '某高端连锁健身房 创始人' : 'Founder, Premium Fitness Chain',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      },
      {
        id: 2,
        content:
          lang === 'zh'
            ? '作为一家初创的运动科技品牌，我们非常感谢醒动的供应链资源整合能力。他们帮助我们快速找到了符合严苛质量标准的代工厂，让我们的智能跳绳得以提前3个月量产上市。'
            : 'As a sports-tech startup, we truly appreciate Ablazing’s supply-chain integration. They helped us quickly find factories meeting strict quality standards, accelerating our product launch by three months.',
        author: lang === 'zh' ? '李明' : 'Li Ming',
        role: lang === 'zh' ? '智能运动硬件公司 CEO' : 'CEO, Smart Fitness Hardware',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      },
      {
        id: 3,
        content:
          lang === 'zh'
            ? '与醒动的合作是一次非常愉快的体验。他们对于全球运动健身产业的洞察令人印象深刻。从最初的概念规划到最终的产品落地，他们始终是我们最可靠的战略伙伴。'
            : "Working with Ablazing has been a great experience. Their insight into the global sports and fitness industry is impressive. From concept planning to product delivery, they've been our most reliable strategic partner.",
        author: 'Sarah',
        role: lang === 'zh' ? '国际运动服饰品牌 亚太区总监' : 'APAC Director, Global Sportswear Brand',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      },
    ],
    [lang],
  );

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

  const submit = async () => {
    setSubmitError(null);
    setSubmitSuccess(false);
    if (sending) return;

    if (formData.website.trim()) {
      setSubmitSuccess(true);
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
          type: formData.type,
          message: formData.message,
          website: formData.website,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || (lang === 'zh' ? '发送失败，请稍后再试' : 'Failed to send. Please try again later.'));
      }

      setSubmitSuccess(true);
      setFormData((prev) => ({
        ...prev,
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        phone: '',
        type: '家用',
        message: '',
        website: '',
      }));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : (lang === 'zh' ? '发送失败，请稍后再试' : 'Failed to send. Please try again later.'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex flex-col justify-center pt-20 pb-20 md:pt-32 md:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#6f7e35] to-[#f6f2e8]" />
          <div className="absolute -top-40 left-[-15%] w-[70vw] h-[70vw] rounded-full bg-[#c8ff00]/25 blur-3xl" />
          <div className="absolute top-0 right-[-20%] w-[60vw] h-[60vw] rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="content-container">
          <div className="relative">
            <div className="flex flex-col items-center text-center">
              

              <h1 className="mt-8 text-5xl md:text-7xl font-black tracking-tight text-white">
                {lang === 'zh' ? '联系醒动' : 'Contact Ablazing'}
              </h1>
              <p className="mt-6 text-xl md:text-2xl font-bold text-white/85">
                {t('home.services.title')}
              </p>
              <p className="mt-8 max-w-3xl text-sm md:text-base text-white/75 md:text-black/70 leading-relaxed">
                {t('home.hero.descLine1')}
                <br />
                {t('home.hero.descLine2')}
              </p>

              <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-14">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-[#c8ff00] text-black flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-semibold text-white/70 md:text-black/60">{info.title}</div>
                      <div className="mt-1 text-sm md:text-base font-semibold text-white md:text-black">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white text-black rounded-[28px] md:rounded-[36px] px-6 md:px-12 py-10 md:py-14">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-black">{lang === 'zh' ? '联系醒动' : 'Contact Ablazing'}</h2>
                <div className="mt-4 text-sm text-black/60">
                  {lang === 'zh'
                    ? '立即获得支持 — 随时与我们的团队取得联系，获取快速帮助和专家指导！'
                    : 'Get support now — reach out to our team for fast help and expert guidance.'}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                  void submit();
                }}
                className="mt-10 space-y-7"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-semibold text-black/70">
                      {lang === 'zh' ? '名 First name *' : 'First name *'}
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={lang === 'zh' ? 'First name' : 'First name'}
                      className="mt-3 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-[#c8ff00]"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-semibold text-black/70">
                      {lang === 'zh' ? '姓 Last name *' : 'Last name *'}
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={lang === 'zh' ? 'Last name' : 'Last name'}
                      className="mt-3 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-[#c8ff00]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-black/70">
                    {lang === 'zh' ? '邮箱 Email *' : 'Email *'}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="mt-3 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-[#c8ff00]"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-xs font-semibold text-black/70">
                    {lang === 'zh' ? '地址 Address *' : 'Address *'}
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="mt-3 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-[#c8ff00]"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-black/70">
                    {lang === 'zh' ? '联系电话 Phone Number *' : 'Phone Number *'}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="mt-3 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-[#c8ff00]"
                  />
                </div>

                <div>
                  <div className="text-xs font-semibold text-black/70">{lang === 'zh' ? '需求类型 Type*' : 'Type *'}</div>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-y-4">
                    {typeOptions.map((opt) => (
                      <label key={opt.value} className="inline-flex items-center gap-3 text-sm text-black/70">
                        <input
                          type="radio"
                          name="type"
                          checked={formData.type === opt.value}
                          onChange={() => handleTypeChange(opt.value)}
                          className="w-4 h-4 accent-black"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-black/70">
                    {lang === 'zh' ? '需求信息 Message' : 'Message'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang === 'zh' ? 'Message here...' : 'Write your message...'}
                    className="mt-3 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-[#c8ff00] resize-none"
                  />
                </div>

                <div className="hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-full bg-[#c8ff00] text-black py-4 text-sm font-bold hover:bg-[#d7ff33] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                  >
                    {sending ? (lang === 'zh' ? '发送中...' : 'Sending...') : (lang === 'zh' ? '发送给我们' : 'Send to Us')}
                  </button>

                  {submitError ? <div className="mt-4 text-sm text-red-600 text-center">{submitError}</div> : null}
                  {submitSuccess ? (
                    <div className="mt-4 text-sm text-emerald-600 text-center">
                      {lang === 'zh' ? '已发送，我们会尽快联系你' : 'Sent! We will get back to you soon.'}
                    </div>
                  ) : null}

                  <div className="mt-6 text-center text-xs text-black/50">
                    {lang === 'zh' ? (
                      <>
                        联系我们即表示您同意遵守我们的 <span className="font-semibold text-black/60">服务条款</span> 和{' '}
                        <span className="font-semibold text-black/60">隐私政策</span>。
                      </>
                    ) : (
                      <>
                        By contacting us, you agree to our <span className="font-semibold text-black/60">Terms</span> and{' '}
                        <span className="font-semibold text-black/60">Privacy Policy</span>.
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white overflow-hidden relative">
        <div className="content-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(200,255,0,0.3)]">
                <Quote className="w-4 h-4 text-black" />
                <span className="text-black text-sm tracking-wide font-bold">{t('home.testimonials.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-black mb-4 tracking-tight">{t('home.testimonials.title')}</h2>
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

export default Contact;
