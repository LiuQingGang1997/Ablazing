import { Instagram, PlaySquare } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TiktokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.34 6.26 6.26 0 001.79-4.49V9.1a8.18 8.18 0 004.77 1.52V7.13a4.85 4.85 0 01-1-.44z"/>
  </svg>
);

const WeiboIcon = () => (
  <svg viewBox="0 0 50 50" fill="currentColor" className="w-4 h-4">
    <path d="M 35 6 C 34.222656 6 33.472656 6.078125 32.75 6.207031 C 32.207031 6.300781 31.84375 6.820313 31.9375 7.363281 C 32.03125 7.910156 32.550781 8.273438 33.09375 8.179688 C 33.726563 8.066406 34.359375 8 35 8 C 41.085938 8 46 12.914063 46 19 C 46 20.316406 45.757813 21.574219 45.328125 22.753906 C 45.195313 23.09375 45.253906 23.476563 45.484375 23.757813 C 45.71875 24.039063 46.082031 24.171875 46.441406 24.105469 C 46.800781 24.039063 47.09375 23.78125 47.207031 23.4375 C 47.710938 22.054688 48 20.566406 48 19 C 48 11.832031 42.167969 6 35 6 Z M 35 12 C 34.574219 12 34.171875 12.042969 33.789063 12.109375 C 33.246094 12.207031 32.878906 12.722656 32.976563 13.269531 C 33.070313 13.8125 33.589844 14.175781 34.132813 14.082031 C 34.425781 14.03125 34.714844 14 35 14 C 37.773438 14 40 16.226563 40 19 C 40 19.597656 39.890625 20.167969 39.691406 20.707031 C 39.503906 21.226563 39.773438 21.800781 40.292969 21.988281 C 40.8125 22.175781 41.386719 21.910156 41.574219 21.390625 C 41.84375 20.648438 42 19.84375 42 19 C 42 15.144531 38.855469 12 35 12 Z M 21.175781 12.40625 C 17.964844 12.34375 13.121094 14.878906 8.804688 19.113281 C 4.511719 23.40625 2 27.90625 2 31.78125 C 2 39.3125 11.628906 43.8125 21.152344 43.8125 C 33.5 43.8125 41.765625 36.699219 41.765625 31.046875 C 41.765625 27.59375 38.835938 25.707031 36.21875 24.871094 C 35.59375 24.660156 35.175781 24.558594 35.488281 23.71875 C 35.695313 23.21875 36 22.265625 36 21 C 36 19.5625 35 18.316406 33 18.09375 C 32.007813 17.984375 28 18 25.339844 19.113281 C 25.339844 19.113281 23.871094 19.746094 24.289063 18.59375 C 25.023438 16.292969 24.917969 14.40625 23.765625 13.359375 C 23.140625 12.730469 22.25 12.425781 21.175781 12.40625 Z M 20.3125 23.933594 C 28.117188 23.933594 34.441406 27.914063 34.441406 32.828125 C 34.441406 37.738281 28.117188 41.71875 20.3125 41.71875 C 12.511719 41.71875 6.1875 37.738281 6.1875 32.828125 C 6.1875 27.914063 12.511719 23.933594 20.3125 23.933594 Z M 19.265625 26.023438 C 16.246094 26.046875 13.3125 27.699219 12.039063 30.246094 C 10.46875 33.484375 11.933594 37.042969 15.699219 38.191406 C 19.464844 39.445313 23.960938 37.5625 25.53125 34.113281 C 27.097656 30.769531 25.113281 27.214844 21.347656 26.277344 C 20.660156 26.097656 19.960938 26.019531 19.265625 26.023438 Z M 20.824219 30.25 C 21.402344 30.25 21.871094 30.714844 21.871094 31.292969 C 21.871094 31.871094 21.402344 32.339844 20.824219 32.339844 C 20.246094 32.339844 19.777344 31.871094 19.777344 31.292969 C 19.777344 30.714844 20.246094 30.25 20.824219 30.25 Z M 16.417969 31.292969 C 16.746094 31.296875 17.074219 31.347656 17.382813 31.453125 C 18.722656 31.878906 19.132813 33.148438 18.308594 34.207031 C 17.589844 35.265625 15.945313 35.792969 14.707031 35.265625 C 13.476563 34.738281 13.167969 33.464844 13.886719 32.515625 C 14.425781 31.71875 15.429688 31.28125 16.417969 31.292969 Z"/>
  </svg>
);

const XiaohongshuIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2L2 7l10 5 10-5-10-5zM4 8v8l8 4 8-4V8l-8 4-8-4z"/>
  </svg>
);

const DouyinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.34 6.26 6.26 0 001.79-4.49V9.1a8.18 8.18 0 004.77 1.52V7.13a4.85 4.85 0 01-1-.44z"/>
  </svg>
);

const Footer = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-[#0B0B0B] text-white py-16 md:py-24">
      <div className="container-custom max-w-[1400px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8 max-w-2xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-wider mb-6">ABLAZING</h2>
              <p className="text-white/90 text-sm md:text-base mb-3 font-medium tracking-widest">{t('footer.slogan')}</p>
              <p className="text-white/70 text-xs md:text-sm tracking-[0.2em] font-light">
                {t('footer.values')}
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="https://x.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <XIcon />
              </a>
              <a href="https://instagram.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <PlaySquare className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <TiktokIcon />
              </a>
              <a href="https://weibo.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <WeiboIcon />
              </a>
              <a href="https://xiaohongshu.com/user/profile/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <XiaohongshuIcon />
              </a>
              <a href="https://www.douyin.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <DouyinIcon />
              </a>
            </div>
          </div>

          {/* Right Column - QR Codes */}
          <div className="flex gap-6 md:gap-10 shrink-0">
            {/* QR Code 1 - 小程序 */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-2 w-32 h-32 md:w-40 md:h-40 rounded-lg">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://weixin.qq.com/r/ablazing-miniprogram" 
                  alt={t('footer.qr.miniprogram')}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide">{t('footer.qr.miniprogram')}</p>
            </div>

            {/* QR Code 2 - 公众号 */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-2 w-32 h-32 md:w-40 md:h-40 rounded-lg">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://weixin.qq.com/r/ablazing-official" 
                  alt={t('footer.qr.official')}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide">{t('footer.qr.official')}</p>
            </div>
          </div>
        </div>

        {/* ICP License & Copyright Info - Centered Bottom */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4 text-white/30 text-xs tracking-wider">
          <p>© {new Date().getFullYear()} ABLAZING. All rights reserved.</p>
          <span className="hidden md:inline text-white/20">|</span>
          <a 
            href="https://beian.miit.gov.cn/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-white/60 transition-colors duration-300"
          >
            沪ICP备2026003024号-1
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
