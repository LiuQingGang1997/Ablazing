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
  { id: 1, name: 'TRUE', logoUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/True_logo.png', promoImageUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true.png?w=600&h=400&fit=crop', mobilePromoImageUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true.png?w=400&h=600&fit=crop' },
  { id: 2, name: 'TORQUE', logoUrl: makeLogoDataUri('TORQUE'), promoImageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop', mobilePromoImageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop' },
  { id: 3, name: 'gym80', logoUrl: makeLogoDataUri('gym80'), promoImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop', mobilePromoImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop' },
  { id: 4, name: 'TOTAL GYM', logoUrl: makeLogoDataUri('TOTAL GYM'), promoImageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop', mobilePromoImageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=600&fit=crop' },
  { id: 5, name: 'Life Fitness', logoUrl: makeLogoDataUri('Life Fitness'), promoImageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop', mobilePromoImageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=600&fit=crop' }
];

export const mockCurrentBrand = {
  id: 1,
  name: 'TRUE',
  title: '诚信至关重要',
  subtitle: 'TRUE Fitness 创立于 1981 年，总部位于美国密苏里州，长期专注于商用及家用健身器材研发与制造。',
  description: '品牌以跑步机见长，强调耐用性、舒适性与性能表现，并以 "Integrity Matters" 为核心理念，致力于为健身房、酒店及高端用户提供可靠的有氧与力量训练解决方案。',
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
  promoImageUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true.png?w=600&h=400&fit=crop',
  mobilePromoImageUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true.png?w=400&h=600&fit=crop',
  videoUrl: 'https://ablazing.oss-cn-shanghai.aliyuncs.com/ABLAZINGHOME/Brand/true1.mp4'
};

export const mockProductTypes = [
  { id: 101, name: '爬楼机', typeName: '爬楼机', enName: 'Escalate Stairclimber', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&h=900&fit=crop', focusTitle: '精工细作', focusSubtitle: '匠心打造', focusDesc: '在工艺与细节上持续打磨，让训练体验更稳定、更顺滑。' },
  { id: 102, name: '跑步机', typeName: '跑步机', enName: 'Treadmill', image: 'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop' },
  { id: 103, name: '椭圆机', typeName: '椭圆机', enName: 'Elliptical Trainer', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=900&fit=crop' },
  { id: 104, name: '卧式自行车', typeName: '卧式自行车', enName: 'Recumbent Bike', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07d?w=1200&h=900&fit=crop' }
];

export const mockScenes = [
  { id: 501, name: '商业健身房', englishName: 'Commercial Gym', enabled: true, sortOrder: 0 },
  { id: 502, name: '工作室', englishName: 'Studio', enabled: true, sortOrder: 1 },
  { id: 503, name: '家庭健身', englishName: 'Home Gym', enabled: true, sortOrder: 2 },
  { id: 504, name: '酒店健身', englishName: 'Hotel Gym', enabled: true, sortOrder: 3 }
];

export const mockCategories = [
  { id: 1, name: '有氧器械', parentId: null, level: 1 },
  { id: 101, name: '跑步机', parentId: 1, level: 2 },
  { id: 102, name: '椭圆机', parentId: 1, level: 2 },
  { id: 103, name: '爬楼机', parentId: 1, level: 2 },
  { id: 104, name: '动感单车', parentId: 1, level: 2 },
  { id: 2, name: '力量器械', parentId: null, level: 1 },
  { id: 201, name: '自由重量', parentId: 2, level: 2 },
  { id: 202, name: '固定器械', parentId: 2, level: 2 },
  { id: 203, name: '功能性训练', parentId: 2, level: 2 },
  { id: 3, name: '综合训练', parentId: null, level: 1 },
  { id: 301, name: '综合训练架', parentId: 3, level: 2 },
  { id: 302, name: '悬挂训练', parentId: 3, level: 2 },
];

export const mockProducts = [
  {
    id: 1001,
    name: 'TRUE PRO 跑步机',
    price: 3299.00,
    coverImageUrl: 'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
    brandId: 1,
    brandName: 'TRUE',
    typeId: 102,
    typeName: '跑步机',
    categoryId: 101,
    categoryName: '跑步机',
    seriesId: 1,
    seriesName: 'PRO 系列',
    sceneId: 501,
    sceneName: '商业健身房',
    parameters: { '颜色': '黑色', '系列': 'PRO 系列', '控制台': '触控屏' }
  },
  {
    id: 1002,
    name: 'TRUE 450 爬楼机',
    price: 4599.00,
    coverImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&h=900&fit=crop',
    brandId: 1,
    brandName: 'TRUE',
    typeId: 101,
    typeName: '爬楼机',
    categoryId: 103,
    categoryName: '爬楼机',
    seriesId: 2,
    seriesName: '450 系列',
    sceneId: 501,
    sceneName: '商业健身房',
    parameters: { '颜色': '银色', '系列': '450 系列', '阻力等级': 'L11+' }
  },
  {
    id: 1003,
    name: 'TRUE 550 椭圆机',
    price: 2899.00,
    coverImageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=900&fit=crop',
    brandId: 1,
    brandName: 'TRUE',
    typeId: 103,
    typeName: '椭圆机',
    categoryId: 102,
    categoryName: '椭圆机',
    seriesId: 3,
    seriesName: '550 系列',
    sceneId: 502,
    sceneName: '工作室',
    parameters: { '颜色': '白色', '系列': '550 系列', '级别': '工作室' }
  },
  {
    id: 1004,
    name: 'TRUE 家用卧式自行车',
    price: 1799.00,
    coverImageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07d?w=1200&h=900&fit=crop',
    brandId: 1,
    brandName: 'TRUE',
    typeId: 104,
    typeName: '卧式自行车',
    categoryId: 104,
    categoryName: '动感单车',
    seriesId: 4,
    seriesName: '家用系列',
    sceneId: 503,
    sceneName: '家庭健身',
    parameters: { '颜色': '黑色', '级别': '家用' }
  }
];
