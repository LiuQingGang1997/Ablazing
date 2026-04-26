import { Instagram, Twitter, Music, MessageCircle, MapPin, PlaySquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white py-16 md:py-24">
      <div className="container-custom max-w-[1400px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8 max-w-2xl">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-wider mb-6">ABLAZING</h2>
              <p className="text-white/90 text-sm md:text-base mb-3 font-medium tracking-widest">用心实践，创造价值</p>
              <p className="text-white/70 text-xs md:text-sm tracking-[0.2em] font-light">
                性能 <span className="mx-1 opacity-50">·</span> 
                品质 <span className="mx-1 opacity-50">·</span> 
                生活 <span className="mx-1 opacity-50">·</span> 
                设计 <span className="mx-1 opacity-50">·</span> 
                体验 <span className="mx-1 opacity-50">·</span> 
                美学 <span className="mx-1 opacity-50">·</span> 
                制造
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="https://twitter.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <PlaySquare className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <Music className="w-4 h-4" />
              </a>
              <a href="https://weibo.com/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://xiaohongshu.com/user/profile/ablazing" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#c8ff00] hover:text-black hover:border-[#c8ff00] transition-all duration-300">
                <MapPin className="w-4 h-4" />
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
                  alt="ABLAZING 小程序" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide">@ 醒动ABLAZING 小程序</p>
            </div>

            {/* QR Code 2 - 公众号 */}
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white p-2 w-32 h-32 md:w-40 md:h-40 rounded-lg">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://weixin.qq.com/r/ablazing-official" 
                  alt="ABLAZING 公众号" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide">@ 醒动ABLAZING 公众号</p>
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
