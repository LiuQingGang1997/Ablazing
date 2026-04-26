// 图片配置 - 可以通过后台管理系统修改这些配置
export const imageConfig = {
  // Logo
  logo: '/images/logo.png',
  
  // 首页轮播图
  banners: [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop',
      title: '品质生活，从这里开始',
      subtitle: '精选全球好物，为您打造优质生活体验'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=600&fit=crop',
      title: '新品上市，限时特惠',
      subtitle: '全场满减优惠，精彩不容错过'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1920&h=600&fit=crop',
      title: '品质保证，售后无忧',
      subtitle: '7天无理由退换，购物更放心'
    }
  ],
  
  // 特色产品图片
  featuredProducts: [
    {
      id: 1,
      name: '智能手表',
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      description: '智能健康监测，时尚外观设计'
    },
    {
      id: 2,
      name: '无线耳机',
      price: 599,
      originalPrice: 799,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      description: '高音质体验，长续航电池'
    },
    {
      id: 3,
      name: '时尚背包',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      description: '大容量设计，防水材质'
    },
    {
      id: 4,
      name: '运动鞋',
      price: 459,
      originalPrice: 599,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
      description: '舒适透气，专业运动设计'
    }
  ],
  
  // 醒动热店图片
  hotStores: [
    {
      id: 1,
      name: '数码科技店',
      image: 'https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?w=600&h=400&fit=crop',
      description: '最新数码产品，科技改变生活',
      rating: 4.9
    },
    {
      id: 2,
      name: '时尚生活馆',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop',
      description: '潮流服饰，品质生活',
      rating: 4.8
    },
    {
      id: 3,
      name: '美妆护肤中心',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
      description: '正品保障，美丽从这里开始',
      rating: 4.9
    }
  ],
  
  // 公司介绍图片
  company: {
    hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop',
    team: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
    office: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&h=600&fit=crop'
  },
  
  // 联系我们页面图片
  contact: {
    hero: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=500&fit=crop'
  }
};

// 模拟从后台获取图片配置
export const fetchImageConfig = async () => {
  // 这里可以替换为实际的 API 调用
  // const response = await fetch('/api/config/images');
  // return await response.json();
  
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  return imageConfig;
};

export default imageConfig;
