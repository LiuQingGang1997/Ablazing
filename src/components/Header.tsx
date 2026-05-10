import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

const navItems = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.hotStores', path: '/hot-stores' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.contact', path: '/contact' },
] as const;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭菜单当路由改变时
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLangMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!isLangMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      const el = langMenuRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setIsLangMenuOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [isLangMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black ${
        isScrolled
          ? 'py-2'
          : 'py-4'
      }`}
    >
      <div className="content-container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex flex-col leading-none md:flex-row md:items-center md:gap-3">
              <span className="text-[#c8ff00] text-xl font-bold tracking-wider">醒动</span>
              <span className="text-white/60 text-xs md:text-sm tracking-widest mt-1 md:mt-0">ABLAZING</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-[#c8ff00]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-[#c8ff00] text-black px-6 py-3 text-sm font-semibold hover:bg-white transition-colors duration-300"
            >
              <span>{t('cta.consultNow')}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <div ref={langMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen((v) => !v)}
                className="w-10 h-10 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center"
                aria-label={lang === 'zh' ? '切换语言' : 'Language'}
              >
                <Globe className="w-4 h-4" />
              </button>
              {isLangMenuOpen ? (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-2xl bg-[#111] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.35)] p-1 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setLang('zh');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left text-sm font-semibold transition-colors ${
                      lang === 'zh' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {t('lang.zh')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLang('en');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left text-sm font-semibold transition-colors ${
                      lang === 'en' ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {t('lang.en')}
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-96 mt-6' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col gap-2 pb-6 border-t border-white/10 pt-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 text-base font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-[#c8ff00]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
            <div className="mt-2 mx-4 inline-flex items-center rounded-full border border-white/15 bg-black/30 p-1">
              <button
                type="button"
                onClick={() => setLang('zh')}
                className={`h-9 px-4 rounded-full text-sm font-semibold transition-colors ${
                  lang === 'zh' ? 'bg-[#c8ff00] text-black' : 'text-white/80 hover:text-white'
                }`}
              >
                {t('lang.zh')}
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`h-9 px-4 rounded-full text-sm font-semibold transition-colors ${
                  lang === 'en' ? 'bg-[#c8ff00] text-black' : 'text-white/80 hover:text-white'
                }`}
              >
                {t('lang.en')}
              </button>
            </div>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#c8ff00] text-black px-6 py-3 text-sm font-semibold"
            >
              <span>{t('cta.consultNow')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
