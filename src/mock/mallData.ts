export const makeLogoDataUri = (text: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="160" viewBox="0 0 520 160">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="none"/>
      <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle"
        font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        font-weight="900" font-size="76" letter-spacing="2"
        fill="#ffffff" filter="url(#glow)">${text}</text>
    </svg>`
  )}`;

export const mockBrands = [
  { id: 1, name: 'TRUE', logoUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/True_logo.png' },

];

export const mockCurrentBrand = {
  id: 1,
  name: 'TRUE',
  title: '诚信至关重要',
  subtitle: 'TRUE Fitness 创立于 1981 年，总部位于美国密苏里州，长期专注于商用及家用健身器材研发与制造。',
  description: '品牌以跑步机见长，强调耐用性、舒适性与性能表现，并以 “Integrity Matters” 为核心理念，致力于为健身房、酒店及高端用户提供可靠的有氧与力量训练解决方案。',
  logoUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/True_logo.png',
  foundedYear: 1981,
  overview: 'TRUE 致力于为健身设施与个人用户提供专业可靠的器械设备。多年来始终坚持品质至上，以出色的耐用性与顺滑体验，满足高频使用的商业需求与高要求的家庭训练。',
  metrics: [
    { value: '40+', label: '专注商用健身' },
    { value: '4', label: '建立4家子公司' },
    { value: '75+', label: '覆盖75个国家' },
    { value: '4', label: '建立4个服务中心' },
    { value: '3k+', label: '覆盖3000+ 运动场所' }
  ],
  highlights: [
    { title: '全球合作伙伴', description: '十多年深耕，用专业与资源网络为合作伙伴持续赋能。' },
    { title: '服务卓越性能', description: '以稳定可靠的交付与服务体验，保障长期运营效率。' },
    { title: '可持续未来', description: '用更高标准的产品与流程，降低环境影响并提升长期价值。' }
  ],
  coverImageUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true.png?w=600&h=400&fit=crop',
  videoUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true1.mp4'
};

export const mockProductTypes = [
  { id: 101, name: '爬楼机', typeName: '爬楼机', enName: 'Escalate Stairclimber', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&h=900&fit=crop', focusTitle: '精工细作', focusSubtitle: '匠心打造', focusDesc: '在工艺与细节上持续打磨，让训练体验更稳定、更顺滑。' },
];

export const mockProducts = [
  {
    id: 1001,
    name: '',
    price: 3299.00,
    coverImageUrl: 'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
    brandId: 1,
    brandName: 'TRUE',
    typeId: 102,
    typeName: '跑步机',
    sceneId: 501,
    sceneName: '商业健身房',
    parameters: { '颜色': '黑色', '系列': 'PRO 系列', '控制台': '触控屏' },
    enabled: true
  }
];
