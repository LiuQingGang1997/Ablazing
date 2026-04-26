import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { label: '首页', path: '/' },
  { label: '醒动热店', path: '/hot-stores' },
  { label: '公司介绍', path: '/about' },
  { label: '联系我们', path: '/contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black ${
        isScrolled
          ? 'py-2'
          : 'py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <span className="text-[#c8ff00] text-xl font-bold tracking-wider">醒动</span>
            <span className="text-white/60 text-sm tracking-widest hidden sm:block">ABLAZING</span>
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
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 bg-[#c8ff00] text-black px-6 py-3 text-sm font-semibold hover:bg-white transition-colors duration-300"
            >
              <span>立即咨询</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
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
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-[#c8ff00] text-black px-6 py-3 text-sm font-semibold"
            >
              <span>立即咨询</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
