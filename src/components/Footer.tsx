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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 694.83" fill="currentColor" className="w-4 h-4">
  <g>
    <path d="M604.42,512.06l-37.73,84.64-18.05,37.35c-39.28-47.46-63.23-126.05-70-186.19l-3.64-32.39-1.9-28.92-8.12-103.69-2.11-33.22-3.34-41.95-1.78-22.35h124.51s4.2,37.63,4.2,37.63l3.74,48.76,3.33,41.93,3,41.95,2.13,24.5,3.38,55.2c.67,11,1.71,20.11,4.82,30.5l7.03,23.5-9.46,22.74Z"/>
    <g>
      <path d="M184.05,646.32l-21.21-48.86c-.5-1.16-1.69-5.26-.81-6.14,1.17-1.18,5.68-3.08,7.5-3.11l62.71-1.08c8.59-.15,11.4-12.77,13.4-20.51l.04-551.6,124.37-.24.06,583.16c-4.73,40.14-24.71,75-62.4,89.61-27.65,10.71-68.12,6.21-101.31,6.88l-22.36-48.12Z"/>
      <path d="M129.11,489.39l-8.72,34.37c-8.6,33.86-31.42,84.68-55.3,109.77L4.99,499.37c-4.01-8.95-5.16-12.54-.21-22.12,9.56-18.52,7.5-41.09,9.36-61.58l4.64-50.93,4.09-62.14,2.24-24.04,2.06-20.22,2.27-42.25c.41-7.55,1.12-18.95,2.45-25.48,2.36-11.53,17.17-5.5,23.59-5.48l102.51.26-3.63,41.85-4.1,44.15-2.65,40.04-2.28,33.38-4.65,52.87-2.45,28.78-2.58,31.35c-.8,9.74-3.86,20.97-6.56,31.58Z"/>
    </g>
  </g>
  <g>
    <g>
      <path d="M736.85,517.87c-18.6-.03-40.24-11.81-45.3-29.71-5.23-18.48,3.45-37.48,10.52-53.61l24.47-55.86,19.53-44.59,11.79-29.26-60.31-2.21c-17.38-.64-33.66-10.84-40.27-27.11-4.12-27.28,6.92-48.01,18.75-73.6l27.85-60.27,32.2-71.73,28.56-63.62,126.45.39-69.23,155.11c-2.1,4.71-3.4,12.47-1.24,15.71s9.33,7.79,13.31,7.82l103.99.68-91.84,206.03c-1.84,4.12-3.18,11.19-1.97,14.32s8.52,6.17,11.98,6.16l68.25-.1-16.03,39.03-10.24,23.03-19.88,43.65-141.34-.26Z"/>
      <path d="M654.09,694.35l-21.36-3.62c-5.91-.89-12.84-4.54-15.08-8.45l17.75-38.58,29.88-64.9,9.35-19.62c16.27,2.46,29.78,7.69,45.35,7.81l125.16.94,27.32,2.1-57.19,124.33h-161.19Z"/>
    </g>
    <g>
      <path d="M1672.11,597.62c-1.04-2.38-2.25-6.55-1.83-8.25.42-1.7,4.57-3.02,6.93-3.96l101.3-.08c6.34-2.12,15.11-9.93,15.1-17.83l-.12-111.42c-.01-14.06-10.78-24.04-22.08-28.68-4.5-2.18-10.13-4.51-15-4.5l-196.66.13.06,257.63-3.06,13.96-123.45-.28-.04-271.3-125.8-.52-.24-127.27,115.1.11c2.57-.22,8.54-.33,9.34-2.35l4.33-10.91-.33-86.8c-2.03-8.08-4.95-13.85-13.25-13.85l-73.21.04-.07-124.68,83.66-.36.54-46.02,9.19-4.27h108.53c2.72-.12,8.51,3.98,8.54,6.76l.48,43.48,81.67,1.01c21.94.27,44.05,10.3,63.12,20.24,27.17,14.16,45.82,37.39,55.81,66.2,3.5,10.1,8.88,23.87,8.94,34.58l.62,108.85c.09,15.04,22.87,2.75,55.52,13.56l20.49,6.78c42.67,14.13,73.3,59.68,73.4,107l.36,162.26-2.28,26.69c-3.29,38.48-43.26,79.23-86.17,86.42l-22.29,3.73-94.18.52-32.56-72.71-10.42-23.93ZM1647.81,295.53l-.6-100.72c-1.61-9.05-17.55-14.09-25.08-13.95l-63.96,1.19-.19,113.54,89.83-.05Z"/>
      <path d="M1312.01,694.53l-426.05-.02,56.88-125.07,106.17-.78,8.03-1.96c1.75-.43,2.74-5.44,2.74-7.89l.05-366.31c-1.25-4.94-3.47-8.96-6.35-11.13l-75.94.31.41-124.98h290.15s-.03,124.47-.03,124.47l-79.7,1.07-.05,385.77,109.94-.03,13.91,4.52-.16,122.05Z"/>
      <path d="M1899.65,164.18c-13.2,14.28-33.44,17.76-52.42,17.54l-53.05-.61.44-63.8c.19-28.18,19.35-55.03,48.35-59.87,7.71-1.29,20.79-1.47,28.43-.15,34.45,5.97,52.39,39.97,47.23,72.94-2.06,13.2-9.19,23.37-18.98,33.95Z"/>
    </g>
  </g>
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
              <a href="https://www.xiaohongshu.com/user/profile/660cb328000000000600eae2" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
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
                  src="https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/wechat/%E5%95%86%E5%8A%A1%E8%81%94%E7%B3%BB.png" 
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
                  src="https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/wechat/qrcode_for_gh_ad3eeeda2d58_258.jpg" 
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
