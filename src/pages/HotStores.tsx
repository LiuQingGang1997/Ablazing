import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, ArrowRight, Play, ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n/I18nProvider';

const HotStores = () => {
  const { lang, t } = useI18n();
  const makeLogoDataUri = (text: string) =>
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

  // 数据统计
  const stats = [
    { value: '72+', label: lang === 'zh' ? '合作品牌' : 'Partner brands' },
    { value: '2000+', label: lang === 'zh' ? '合作门店' : 'Partner stores' },
    { value: '5000+', label: lang === 'zh' ? 'SKU数量' : 'SKUs' },
    { value: '100%', label: lang === 'zh' ? '正品保障' : 'Authenticity' },
  ];

  type Option = { value: string; label: string };
  type FilterDef = { key: string; label: string; options: Option[] };
  type ProductItem = {
    id: string;
    name: string;
    subtitle?: string;
    image: string;
    categoryId: string;
    tag?: string;
    weightKg?: number;
    weightLb?: number;
    priceUsd: number;
    attrs: Record<string, string>;
  };
  type BrandCatalog = {
    title: string;
    description: string;
    filtersByCategoryId: Record<string, FilterDef[]>;
    products: ProductItem[];
  };

  const buildProducts = (
    brandId: string,
    categoryIds: string[],
    makeName: (categoryId: string, index: number) => { name: string; subtitle?: string },
    images: string[],
    attrPresets: Array<Record<string, string>>,
    tagEvery = 4
  ) => {
    const list: ProductItem[] = [];
    const basePriceMap: Record<string, number> = {
      stairclimber: 4599,
      treadmill: 3299,
      elliptical: 2899,
      bike: 1799,
      strength: 3999,
      plate: 3199,
      selectorized: 3699,
      benches: 899,
      rehab: 1299,
      mobility: 799,
      recovery: 999,
      running: 189,
      training: 159,
      football: 149,
      lifestyle: 169,
      footwear: 179,
      apparel: 99,
      accessory: 49,
      digital: 599,
      floor: 499,
      solution: 2499,
    };
    for (let i = 0; i < 18; i += 1) {
      const categoryId = categoryIds[i % categoryIds.length];
      const nm = makeName(categoryId, i);
      const attrs = attrPresets[i % attrPresets.length];
      const base = basePriceMap[categoryId] ?? 199;
      const priceUsd = Math.round((base + (i % 6) * (base >= 1000 ? 120 : 10)) * 100) / 100;
      list.push({
        id: `${brandId}-${categoryId}-${i}`,
        name: nm.name,
        subtitle: nm.subtitle,
        image: images[i % images.length],
        categoryId,
        tag: i % tagEvery === 0 ? '人气优选' : undefined,
        weightKg: 220 + (i % 6) * 18,
        weightLb: 485 + (i % 6) * 40,
        priceUsd,
        attrs,
      });
    }
    return list;
  };

  const brandCatalogMap: Record<string, BrandCatalog> = {
    ntena: {
      title: '提供多元、个性、潮流的训练方式',
      description: '专业器械覆盖多场景训练需求，支持更高效的空间配置与运营。',
      filtersByCategoryId: {
        all: [
          {
            key: 'function',
            label: '功能分类',
            options: [
              { value: 'all', label: '功能分类' },
              { value: 'cardio', label: '有氧训练' },
              { value: 'strength', label: '力量训练' },
              { value: 'recovery', label: '恢复放松' },
            ],
          },
          {
            key: 'series',
            label: '系列分类',
            options: [
              { value: 'all', label: '系列分类' },
              { value: '450', label: '450 系列' },
              { value: '550', label: '550 系列' },
              { value: 'pro', label: 'PRO 系列' },
            ],
          },
          {
            key: 'level',
            label: '级别',
            options: [
              { value: 'all', label: '级别' },
              { value: 'commercial', label: '商用' },
              { value: 'studio', label: '工作室' },
              { value: 'home', label: '家用' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'silver', label: '银灰' },
              { value: 'white', label: '白色' },
            ],
          },
        ],
        stairclimber: [
          {
            key: 'resistance',
            label: '阻力等级',
            options: [
              { value: 'all', label: '阻力等级' },
              { value: 'l1', label: 'L1-L5' },
              { value: 'l6', label: 'L6-L10' },
              { value: 'l11', label: 'L11+' },
            ],
          },
          {
            key: 'console',
            label: '控制台',
            options: [
              { value: 'all', label: '控制台' },
              { value: 'lcd', label: 'LCD' },
              { value: 'touch', label: '触控屏' },
            ],
          },
        ],
        treadmill: [
          {
            key: 'motor',
            label: '马力',
            options: [
              { value: 'all', label: '马力' },
              { value: '3hp', label: '3.0HP' },
              { value: '4hp', label: '4.0HP' },
              { value: '5hp', label: '5.0HP+' },
            ],
          },
          {
            key: 'incline',
            label: '坡度',
            options: [
              { value: 'all', label: '坡度' },
              { value: '0-10', label: '0-10%' },
              { value: '10-20', label: '10-20%' },
              { value: '20+', label: '20%+' },
            ],
          },
        ],
        elliptical: [
          {
            key: 'stride',
            label: '步幅',
            options: [
              { value: 'all', label: '步幅' },
              { value: 'short', label: '短步幅' },
              { value: 'mid', label: '中步幅' },
              { value: 'long', label: '长步幅' },
            ],
          },
          {
            key: 'drive',
            label: '驱动',
            options: [
              { value: 'all', label: '驱动' },
              { value: 'front', label: '前置' },
              { value: 'rear', label: '后置' },
            ],
          },
        ],
        bike: [
          {
            key: 'bikeType',
            label: '类型',
            options: [
              { value: 'all', label: '类型' },
              { value: 'recumbent', label: '卧式' },
              { value: 'upright', label: '立式' },
              { value: 'spin', label: '动感' },
            ],
          },
          {
            key: 'resistance',
            label: '阻力系统',
            options: [
              { value: 'all', label: '阻力系统' },
              { value: 'mag', label: '磁控' },
              { value: 'air', label: '风阻' },
            ],
          },
        ],
      },
      products: buildProducts(
        'ntena',
        ['stairclimber', 'treadmill', 'elliptical', 'bike'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            stairclimber: '爬楼机',
            treadmill: '跑步机',
            elliptical: '椭圆机',
            bike: '卧式自行车',
          };
          const series = i % 3 === 0 ? '450' : i % 3 === 1 ? '550' : 'PRO';
          return { name: `${map[categoryId]} ${series} ${i % 2 === 0 ? 'C12S' : 'T12S'}` };
        },
        [
          'https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&h=900&fit=crop',
        ],
        [
          { function: 'cardio', series: '450', level: 'commercial', color: 'black', motor: '4hp', incline: '10-20' },
          { function: 'cardio', series: '550', level: 'studio', color: 'silver', motor: '3hp', incline: '0-10' },
          { function: 'strength', series: 'pro', level: 'commercial', color: 'black', console: 'touch', drive: 'rear' },
          { function: 'recovery', series: '450', level: 'home', color: 'white', stride: 'mid', bikeType: 'recumbent' },
        ]
      ),
    },
    torque: {
      title: '提供多元、个性、潮流的训练方式',
      description: '以功能训练为核心的产品矩阵，支持不同空间与训练场景组合。',
      filtersByCategoryId: {
        all: [
          {
            key: 'function',
            label: '功能分类',
            options: [
              { value: 'all', label: '功能分类' },
              { value: 'functional', label: '功能训练' },
              { value: 'strength', label: '力量训练' },
              { value: 'accessory', label: '训练配件' },
            ],
          },
          {
            key: 'series',
            label: '系列分类',
            options: [
              { value: 'all', label: '系列分类' },
              { value: 'alpha', label: 'ALPHA' },
              { value: 'prime', label: 'PRIME' },
              { value: 'rig', label: 'RIG' },
            ],
          },
          {
            key: 'space',
            label: '适配空间',
            options: [
              { value: 'all', label: '适配空间' },
              { value: 'gym', label: '商业健身房' },
              { value: 'studio', label: '工作室' },
              { value: 'club', label: '俱乐部' },
            ],
          },
        ],
        functional: [
          {
            key: 'module',
            label: '模块',
            options: [
              { value: 'all', label: '模块' },
              { value: 'base', label: '基础' },
              { value: 'pro', label: '进阶' },
              { value: 'elite', label: '旗舰' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'sand', label: '沙色' },
              { value: 'red', label: '红色' },
            ],
          },
        ],
        sled: [
          {
            key: 'floor',
            label: '地面',
            options: [
              { value: 'all', label: '地面' },
              { value: 'rubber', label: '橡胶' },
              { value: 'turf', label: '草坪' },
              { value: 'track', label: '跑道' },
            ],
          },
        ],
        rig: [
          {
            key: 'bay',
            label: '位数',
            options: [
              { value: 'all', label: '位数' },
              { value: '2', label: '2 位' },
              { value: '4', label: '4 位' },
              { value: '6', label: '6+ 位' },
            ],
          },
        ],
        accessories: [
          {
            key: 'material',
            label: '材质',
            options: [
              { value: 'all', label: '材质' },
              { value: 'steel', label: '钢制' },
              { value: 'rubber', label: '橡胶' },
              { value: 'fabric', label: '织物' },
            ],
          },
        ],
      },
      products: buildProducts(
        'torque',
        ['functional', 'sled', 'rig', 'accessories'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            functional: '功能训练',
            sled: '推雪橇',
            rig: '综合训练架',
            accessories: '训练配件',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'PRIME' : 'ALPHA'} ${100 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
        ],
        [
          { function: 'functional', series: 'alpha', space: 'gym', module: 'base', color: 'black', floor: 'rubber', bay: '4', material: 'steel' },
          { function: 'strength', series: 'prime', space: 'studio', module: 'pro', color: 'sand', floor: 'turf', bay: '2', material: 'rubber' },
          { function: 'accessory', series: 'rig', space: 'club', module: 'elite', color: 'red', floor: 'track', bay: '6', material: 'fabric' },
        ]
      ),
    },
    gym80: {
      title: '提供多元、个性、潮流的训练方式',
      description: '稳定可靠的商用力量器械，为专业场馆打造高效训练区。',
      filtersByCategoryId: {
        all: [
          {
            key: 'line',
            label: '产品线',
            options: [
              { value: 'all', label: '产品线' },
              { value: 'strength', label: '力量区器械' },
              { value: 'plate', label: '片加载器械' },
              { value: 'selectorized', label: '配重片器械' },
            ],
          },
          {
            key: 'training',
            label: '训练部位',
            options: [
              { value: 'all', label: '训练部位' },
              { value: 'upper', label: '上肢' },
              { value: 'lower', label: '下肢' },
              { value: 'full', label: '全身' },
            ],
          },
          {
            key: 'level',
            label: '级别',
            options: [
              { value: 'all', label: '级别' },
              { value: 'commercial', label: '商用' },
              { value: 'studio', label: '工作室' },
            ],
          },
        ],
        strength: [
          {
            key: 'footprint',
            label: '占地',
            options: [
              { value: 'all', label: '占地' },
              { value: 'compact', label: '紧凑' },
              { value: 'standard', label: '标准' },
              { value: 'large', label: '大型' },
            ],
          },
        ],
        plate: [
          {
            key: 'load',
            label: '加载方式',
            options: [
              { value: 'all', label: '加载方式' },
              { value: 'plate', label: '片加载' },
              { value: 'hybrid', label: '混合' },
            ],
          },
        ],
        selectorized: [
          {
            key: 'stack',
            label: '配重栈',
            options: [
              { value: 'all', label: '配重栈' },
              { value: '80', label: '80kg' },
              { value: '100', label: '100kg' },
              { value: '120', label: '120kg+' },
            ],
          },
        ],
        benches: [
          {
            key: 'benchType',
            label: '训练凳',
            options: [
              { value: 'all', label: '训练凳' },
              { value: 'flat', label: '平板' },
              { value: 'adjustable', label: '可调' },
              { value: 'olympic', label: '奥林匹克' },
            ],
          },
        ],
      },
      products: buildProducts(
        'gym80',
        ['strength', 'plate', 'selectorized', 'benches'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            strength: '力量器械',
            plate: '片加载',
            selectorized: '配重片',
            benches: '训练凳',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'Elite' : 'Pro'} ${200 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
        ],
        [
          { line: 'strength', training: 'upper', level: 'commercial', footprint: 'standard', load: 'plate', stack: '100', benchType: 'adjustable' },
          { line: 'plate', training: 'lower', level: 'studio', footprint: 'compact', load: 'hybrid', stack: '80', benchType: 'flat' },
          { line: 'selectorized', training: 'full', level: 'commercial', footprint: 'large', load: 'plate', stack: '120', benchType: 'olympic' },
        ]
      ),
    },
    totalgym: {
      title: '提供多元、个性、潮流的训练方式',
      description: '从训练到康复的全链路方案，帮助更多人安全有效地运动。',
      filtersByCategoryId: {
        all: [
          {
            key: 'scene',
            label: '应用场景',
            options: [
              { value: 'all', label: '应用场景' },
              { value: 'rehab', label: '康复' },
              { value: 'studio', label: '工作室' },
              { value: 'home', label: '家庭' },
            ],
          },
          {
            key: 'level',
            label: '级别',
            options: [
              { value: 'all', label: '级别' },
              { value: 'basic', label: '基础' },
              { value: 'pro', label: '专业' },
              { value: 'elite', label: '旗舰' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'white', label: '白色' },
              { value: 'gray', label: '灰色' },
            ],
          },
        ],
        platform: [
          {
            key: 'module',
            label: '模块',
            options: [
              { value: 'all', label: '模块' },
              { value: 'base', label: '基础' },
              { value: 'plus', label: '增强' },
              { value: 'max', label: '旗舰' },
            ],
          },
        ],
        core: [
          {
            key: 'intensity',
            label: '强度',
            options: [
              { value: 'all', label: '强度' },
              { value: 'low', label: '低' },
              { value: 'mid', label: '中' },
              { value: 'high', label: '高' },
            ],
          },
        ],
        rehab: [
          {
            key: 'target',
            label: '目标',
            options: [
              { value: 'all', label: '目标' },
              { value: 'posture', label: '体态' },
              { value: 'mobility', label: '灵活性' },
              { value: 'strength', label: '力量' },
            ],
          },
        ],
        mobility: [
          {
            key: 'tool',
            label: '工具',
            options: [
              { value: 'all', label: '工具' },
              { value: 'band', label: '弹力带' },
              { value: 'roller', label: '泡沫轴' },
              { value: 'ball', label: '按摩球' },
            ],
          },
        ],
      },
      products: buildProducts(
        'totalgym',
        ['platform', 'core', 'rehab', 'mobility'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            platform: '综合训练平台',
            core: '核心训练',
            rehab: '康复训练',
            mobility: '灵活性',
          };
          return { name: `${map[categoryId]} ${i % 3 === 0 ? 'X' : i % 3 === 1 ? 'Pro' : 'Plus'} ${60 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
        ],
        [
          { scene: 'rehab', level: 'basic', color: 'gray', module: 'base', intensity: 'low', target: 'posture', tool: 'band' },
          { scene: 'studio', level: 'pro', color: 'black', module: 'plus', intensity: 'mid', target: 'mobility', tool: 'roller' },
          { scene: 'home', level: 'elite', color: 'white', module: 'max', intensity: 'high', target: 'strength', tool: 'ball' },
        ]
      ),
    },
    puma: {
      title: '提供多元、个性、潮流的生活方式',
      description: '潮流与运动基因融合，打造多场景的穿搭与训练装备。',
      filtersByCategoryId: {
        all: [
          {
            key: 'series',
            label: '系列分类',
            options: [
              { value: 'all', label: '系列分类' },
              { value: 'classic', label: 'Classic' },
              { value: 'performance', label: 'Performance' },
              { value: 'collab', label: 'Collab' },
            ],
          },
          {
            key: 'gender',
            label: '性别',
            options: [
              { value: 'all', label: '性别' },
              { value: 'men', label: '男' },
              { value: 'women', label: '女' },
              { value: 'unisex', label: '中性' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'white', label: '白色' },
              { value: 'green', label: '绿色' },
            ],
          },
        ],
        footwear: [
          {
            key: 'shoeType',
            label: '鞋款',
            options: [
              { value: 'all', label: '鞋款' },
              { value: 'running', label: '跑鞋' },
              { value: 'training', label: '训练鞋' },
              { value: 'lifestyle', label: '潮流鞋' },
            ],
          },
          {
            key: 'cushion',
            label: '缓震',
            options: [
              { value: 'all', label: '缓震' },
              { value: 'soft', label: '柔软' },
              { value: 'balanced', label: '均衡' },
              { value: 'responsive', label: '回弹' },
            ],
          },
        ],
        apparel: [
          {
            key: 'apparel',
            label: '服饰',
            options: [
              { value: 'all', label: '服饰' },
              { value: 'tee', label: 'T恤' },
              { value: 'hoodie', label: '卫衣' },
              { value: 'pants', label: '裤装' },
            ],
          },
        ],
        accessory: [
          {
            key: 'accessory',
            label: '配件',
            options: [
              { value: 'all', label: '配件' },
              { value: 'bag', label: '包袋' },
              { value: 'cap', label: '帽子' },
              { value: 'sock', label: '袜子' },
            ],
          },
        ],
        training: [
          {
            key: 'gear',
            label: '训练装备',
            options: [
              { value: 'all', label: '训练装备' },
              { value: 'glove', label: '手套' },
              { value: 'belt', label: '护腰' },
              { value: 'mat', label: '垫子' },
            ],
          },
        ],
      },
      products: buildProducts(
        'puma',
        ['footwear', 'apparel', 'accessory', 'training'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            footwear: '运动鞋',
            apparel: '运动服饰',
            accessory: '配件',
            training: '训练装备',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'RS' : 'ULTRA'} ${100 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
        ],
        [
          { series: 'classic', gender: 'unisex', color: 'black', shoeType: 'lifestyle', cushion: 'balanced', apparel: 'tee', accessory: 'bag', gear: 'mat' },
          { series: 'performance', gender: 'men', color: 'white', shoeType: 'running', cushion: 'responsive', apparel: 'pants', accessory: 'cap', gear: 'belt' },
          { series: 'collab', gender: 'women', color: 'green', shoeType: 'training', cushion: 'soft', apparel: 'hoodie', accessory: 'sock', gear: 'glove' },
        ]
      ),
    },
    adidas: {
      title: '提供多元、个性、潮流的生活方式',
      description: '以运动场景为核心的产品体系，覆盖跑步、训练与生活方式。',
      filtersByCategoryId: {
        all: [
          {
            key: 'series',
            label: '系列分类',
            options: [
              { value: 'all', label: '系列分类' },
              { value: 'originals', label: 'Originals' },
              { value: 'performance', label: 'Performance' },
              { value: 'collab', label: 'Collab' },
            ],
          },
          {
            key: 'gender',
            label: '性别',
            options: [
              { value: 'all', label: '性别' },
              { value: 'men', label: '男' },
              { value: 'women', label: '女' },
              { value: 'unisex', label: '中性' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'white', label: '白色' },
              { value: 'blue', label: '蓝色' },
            ],
          },
        ],
        running: [
          {
            key: 'shoeType',
            label: '鞋款',
            options: [
              { value: 'all', label: '鞋款' },
              { value: 'daily', label: '日常训练' },
              { value: 'tempo', label: '节奏跑' },
              { value: 'race', label: '竞速' },
            ],
          },
        ],
        training: [
          {
            key: 'training',
            label: '训练',
            options: [
              { value: 'all', label: '训练' },
              { value: 'gym', label: '健身房' },
              { value: 'hiit', label: 'HIIT' },
              { value: 'outdoor', label: '户外' },
            ],
          },
        ],
        football: [
          {
            key: 'boots',
            label: '球鞋',
            options: [
              { value: 'all', label: '球鞋' },
              { value: 'fg', label: 'FG' },
              { value: 'ag', label: 'AG' },
              { value: 'tf', label: 'TF' },
            ],
          },
        ],
        lifestyle: [
          {
            key: 'style',
            label: '风格',
            options: [
              { value: 'all', label: '风格' },
              { value: 'classic', label: '经典' },
              { value: 'retro', label: '复古' },
              { value: 'modern', label: '现代' },
            ],
          },
        ],
      },
      products: buildProducts(
        'adidas',
        ['running', 'training', 'football', 'lifestyle'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            running: '跑步',
            training: '训练',
            football: '足球',
            lifestyle: '生活方式',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'ULTRA' : 'ADIZERO'} ${200 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&h=900&fit=crop',
        ],
        [
          { series: 'performance', gender: 'men', color: 'black', shoeType: 'daily', training: 'gym', boots: 'fg', style: 'classic' },
          { series: 'originals', gender: 'women', color: 'white', shoeType: 'tempo', training: 'hiit', boots: 'ag', style: 'retro' },
          { series: 'collab', gender: 'unisex', color: 'blue', shoeType: 'race', training: 'outdoor', boots: 'tf', style: 'modern' },
        ]
      ),
    },
    nike: {
      title: '提供多元、个性、潮流的生活方式',
      description: '从训练到生活方式的全场景产品矩阵，兼顾科技与设计表达。',
      filtersByCategoryId: {
        all: [
          {
            key: 'series',
            label: '系列分类',
            options: [
              { value: 'all', label: '系列分类' },
              { value: 'air', label: 'Air' },
              { value: 'pro', label: 'Pro' },
              { value: 'court', label: 'Court' },
            ],
          },
          {
            key: 'gender',
            label: '性别',
            options: [
              { value: 'all', label: '性别' },
              { value: 'men', label: '男' },
              { value: 'women', label: '女' },
              { value: 'unisex', label: '中性' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'white', label: '白色' },
              { value: 'green', label: '绿色' },
            ],
          },
        ],
        training: [
          {
            key: 'training',
            label: '训练',
            options: [
              { value: 'all', label: '训练' },
              { value: 'gym', label: '健身房' },
              { value: 'hiit', label: 'HIIT' },
              { value: 'strength', label: '力量' },
            ],
          },
        ],
        running: [
          {
            key: 'shoeType',
            label: '鞋款',
            options: [
              { value: 'all', label: '鞋款' },
              { value: 'daily', label: '日常训练' },
              { value: 'tempo', label: '节奏跑' },
              { value: 'race', label: '竞速' },
            ],
          },
        ],
        basketball: [
          {
            key: 'position',
            label: '位置',
            options: [
              { value: 'all', label: '位置' },
              { value: 'guard', label: '后卫' },
              { value: 'forward', label: '前锋' },
              { value: 'center', label: '中锋' },
            ],
          },
        ],
        lifestyle: [
          {
            key: 'style',
            label: '风格',
            options: [
              { value: 'all', label: '风格' },
              { value: 'classic', label: '经典' },
              { value: 'retro', label: '复古' },
              { value: 'modern', label: '现代' },
            ],
          },
        ],
      },
      products: buildProducts(
        'nike',
        ['training', 'running', 'basketball', 'lifestyle'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            training: '训练',
            running: '跑步',
            basketball: '篮球',
            lifestyle: '生活方式',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'AIR' : 'PRO'} ${300 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
        ],
        [
          { series: 'air', gender: 'men', color: 'black', training: 'gym', shoeType: 'daily', position: 'guard', style: 'classic' },
          { series: 'pro', gender: 'women', color: 'white', training: 'hiit', shoeType: 'tempo', position: 'forward', style: 'retro' },
          { series: 'court', gender: 'unisex', color: 'green', training: 'strength', shoeType: 'race', position: 'center', style: 'modern' },
        ]
      ),
    },
    reebok: {
      title: '提供多元、个性、潮流的生活方式',
      description: '训练文化与复古表达并存，覆盖训练与日常穿搭需求。',
      filtersByCategoryId: {
        all: [
          {
            key: 'series',
            label: '系列分类',
            options: [
              { value: 'all', label: '系列分类' },
              { value: 'classic', label: 'Classic' },
              { value: 'training', label: 'Training' },
              { value: 'heritage', label: 'Heritage' },
            ],
          },
          {
            key: 'gender',
            label: '性别',
            options: [
              { value: 'all', label: '性别' },
              { value: 'men', label: '男' },
              { value: 'women', label: '女' },
              { value: 'unisex', label: '中性' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'white', label: '白色' },
              { value: 'gray', label: '灰色' },
            ],
          },
        ],
        training: [
          {
            key: 'training',
            label: '训练',
            options: [
              { value: 'all', label: '训练' },
              { value: 'gym', label: '健身房' },
              { value: 'hiit', label: 'HIIT' },
              { value: 'cross', label: '综合训练' },
            ],
          },
        ],
        footwear: [
          {
            key: 'shoeType',
            label: '鞋款',
            options: [
              { value: 'all', label: '鞋款' },
              { value: 'training', label: '训练鞋' },
              { value: 'lifestyle', label: '潮流鞋' },
              { value: 'running', label: '跑鞋' },
            ],
          },
        ],
        apparel: [
          {
            key: 'apparel',
            label: '服饰',
            options: [
              { value: 'all', label: '服饰' },
              { value: 'tee', label: 'T恤' },
              { value: 'hoodie', label: '卫衣' },
              { value: 'pants', label: '裤装' },
            ],
          },
        ],
        classics: [
          {
            key: 'style',
            label: '风格',
            options: [
              { value: 'all', label: '风格' },
              { value: 'classic', label: '经典' },
              { value: 'retro', label: '复古' },
              { value: 'modern', label: '现代' },
            ],
          },
        ],
      },
      products: buildProducts(
        'reebok',
        ['training', 'footwear', 'apparel', 'classics'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            training: '训练',
            footwear: '运动鞋',
            apparel: '运动服饰',
            classics: '经典系列',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'CLASSIC' : 'NANO'} ${120 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
        ],
        [
          { series: 'training', gender: 'men', color: 'black', training: 'gym', shoeType: 'training', apparel: 'tee', style: 'classic' },
          { series: 'classic', gender: 'women', color: 'white', training: 'hiit', shoeType: 'lifestyle', apparel: 'hoodie', style: 'retro' },
          { series: 'heritage', gender: 'unisex', color: 'gray', training: 'cross', shoeType: 'running', apparel: 'pants', style: 'modern' },
        ]
      ),
    },
    fila: {
      title: '提供多元、个性、潮流的生活方式',
      description: '复古与当代融合的产品矩阵，覆盖训练与日常穿搭。',
      filtersByCategoryId: {
        all: [
          {
            key: 'series',
            label: '系列分类',
            options: [
              { value: 'all', label: '系列分类' },
              { value: 'heritage', label: 'Heritage' },
              { value: 'sport', label: 'Sport' },
              { value: 'collab', label: 'Collab' },
            ],
          },
          {
            key: 'gender',
            label: '性别',
            options: [
              { value: 'all', label: '性别' },
              { value: 'men', label: '男' },
              { value: 'women', label: '女' },
              { value: 'unisex', label: '中性' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'white', label: '白色' },
              { value: 'blue', label: '蓝色' },
            ],
          },
        ],
        lifestyle: [
          {
            key: 'style',
            label: '风格',
            options: [
              { value: 'all', label: '风格' },
              { value: 'classic', label: '经典' },
              { value: 'retro', label: '复古' },
              { value: 'modern', label: '现代' },
            ],
          },
        ],
        footwear: [
          {
            key: 'shoeType',
            label: '鞋款',
            options: [
              { value: 'all', label: '鞋款' },
              { value: 'lifestyle', label: '潮流鞋' },
              { value: 'court', label: '球场' },
              { value: 'running', label: '跑鞋' },
            ],
          },
        ],
        apparel: [
          {
            key: 'apparel',
            label: '服饰',
            options: [
              { value: 'all', label: '服饰' },
              { value: 'tee', label: 'T恤' },
              { value: 'hoodie', label: '卫衣' },
              { value: 'pants', label: '裤装' },
            ],
          },
        ],
        accessories: [
          {
            key: 'accessory',
            label: '配件',
            options: [
              { value: 'all', label: '配件' },
              { value: 'bag', label: '包袋' },
              { value: 'cap', label: '帽子' },
              { value: 'sock', label: '袜子' },
            ],
          },
        ],
      },
      products: buildProducts(
        'fila',
        ['lifestyle', 'footwear', 'apparel', 'accessories'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            lifestyle: '潮流系列',
            footwear: '运动鞋',
            apparel: '运动服饰',
            accessories: '配件',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'HERITAGE' : 'SPORT'} ${80 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=900&fit=crop',
        ],
        [
          { series: 'heritage', gender: 'unisex', color: 'black', style: 'classic', shoeType: 'lifestyle', apparel: 'tee', accessory: 'bag' },
          { series: 'sport', gender: 'men', color: 'white', style: 'retro', shoeType: 'court', apparel: 'hoodie', accessory: 'cap' },
          { series: 'collab', gender: 'women', color: 'blue', style: 'modern', shoeType: 'running', apparel: 'pants', accessory: 'sock' },
        ]
      ),
    },
    technogym: {
      title: '提供多元、个性、潮流的训练方式',
      description: '数字化与器械结合的解决方案，覆盖训练、恢复与内容生态。',
      filtersByCategoryId: {
        all: [
          {
            key: 'solution',
            label: '方案',
            options: [
              { value: 'all', label: '方案' },
              { value: 'cardio', label: '有氧器械' },
              { value: 'strength', label: '力量器械' },
              { value: 'recovery', label: '恢复科技' },
              { value: 'digital', label: '数字内容' },
            ],
          },
          {
            key: 'level',
            label: '级别',
            options: [
              { value: 'all', label: '级别' },
              { value: 'commercial', label: '商用' },
              { value: 'studio', label: '工作室' },
              { value: 'home', label: '家用' },
            ],
          },
          {
            key: 'color',
            label: '颜色',
            options: [
              { value: 'all', label: '颜色' },
              { value: 'black', label: '黑色' },
              { value: 'silver', label: '银灰' },
              { value: 'white', label: '白色' },
            ],
          },
        ],
        cardio: [
          {
            key: 'console',
            label: '控制台',
            options: [
              { value: 'all', label: '控制台' },
              { value: 'lcd', label: 'LCD' },
              { value: 'touch', label: '触控屏' },
            ],
          },
        ],
        strength: [
          {
            key: 'stack',
            label: '配重栈',
            options: [
              { value: 'all', label: '配重栈' },
              { value: '80', label: '80kg' },
              { value: '100', label: '100kg' },
              { value: '120', label: '120kg+' },
            ],
          },
        ],
        recovery: [
          {
            key: 'tool',
            label: '设备',
            options: [
              { value: 'all', label: '设备' },
              { value: 'massage', label: '按摩' },
              { value: 'compression', label: '加压' },
              { value: 'cold', label: '冷疗' },
            ],
          },
        ],
        digital: [
          {
            key: 'platform',
            label: '平台',
            options: [
              { value: 'all', label: '平台' },
              { value: 'app', label: 'APP' },
              { value: 'screen', label: '大屏' },
              { value: 'cloud', label: '云服务' },
            ],
          },
        ],
      },
      products: buildProducts(
        'technogym',
        ['cardio', 'strength', 'recovery', 'digital'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            cardio: '有氧器械',
            strength: '力量器械',
            recovery: '恢复科技',
            digital: '数字内容',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'Artis' : 'Skill'} ${70 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1606041623037-7763d6013b86?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=900&fit=crop',
        ],
        [
          { solution: 'cardio', level: 'commercial', color: 'black', console: 'touch', stack: '100', tool: 'massage', platform: 'app' },
          { solution: 'strength', level: 'studio', color: 'silver', console: 'lcd', stack: '80', tool: 'compression', platform: 'screen' },
          { solution: 'digital', level: 'home', color: 'white', console: 'touch', stack: '120', tool: 'cold', platform: 'cloud' },
        ]
      ),
    },
    lifefitness: {
      title: '提供多元、个性、潮流的训练方式',
      description: '面向高频商业场景的器械与空间解决方案，长期稳定可靠。',
      filtersByCategoryId: {
        all: [
          {
            key: 'solution',
            label: '解决方案',
            options: [
              { value: 'all', label: '解决方案' },
              { value: 'strength', label: '力量器械' },
              { value: 'cardio', label: '有氧器械' },
              { value: 'floor', label: '地材与配套' },
              { value: 'solution', label: '空间方案' },
            ],
          },
          {
            key: 'space',
            label: '适配空间',
            options: [
              { value: 'all', label: '适配空间' },
              { value: 'gym', label: '商业健身房' },
              { value: 'hotel', label: '酒店' },
              { value: 'club', label: '俱乐部' },
            ],
          },
          {
            key: 'level',
            label: '级别',
            options: [
              { value: 'all', label: '级别' },
              { value: 'commercial', label: '商用' },
              { value: 'studio', label: '工作室' },
            ],
          },
        ],
        strength: [
          {
            key: 'line',
            label: '产品线',
            options: [
              { value: 'all', label: '产品线' },
              { value: 'hammer', label: 'Hammer' },
              { value: 'insignia', label: 'Insignia' },
              { value: 'signature', label: 'Signature' },
            ],
          },
        ],
        cardio: [
          {
            key: 'console',
            label: '控制台',
            options: [
              { value: 'all', label: '控制台' },
              { value: 'lcd', label: 'LCD' },
              { value: 'touch', label: '触控屏' },
            ],
          },
        ],
        floor: [
          {
            key: 'material',
            label: '材质',
            options: [
              { value: 'all', label: '材质' },
              { value: 'rubber', label: '橡胶' },
              { value: 'wood', label: '木纹' },
              { value: 'turf', label: '草坪' },
            ],
          },
        ],
        solution: [
          {
            key: 'service',
            label: '服务',
            options: [
              { value: 'all', label: '服务' },
              { value: 'design', label: '设计' },
              { value: 'delivery', label: '交付' },
              { value: 'support', label: '运维' },
            ],
          },
        ],
      },
      products: buildProducts(
        'lifefitness',
        ['strength', 'cardio', 'floor', 'solution'],
        (categoryId, i) => {
          const map: Record<string, string> = {
            strength: '力量器械',
            cardio: '有氧器械',
            floor: '地材与配套',
            solution: '空间方案',
          };
          return { name: `${map[categoryId]} ${i % 2 === 0 ? 'Club' : 'Pro'} ${40 + i}` };
        },
        [
          'https://images.unsplash.com/photo-1606041623037-7763d6013b86?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
        ],
        [
          { solution: 'strength', space: 'gym', level: 'commercial', line: 'hammer', console: 'touch', material: 'rubber', service: 'design' },
          { solution: 'cardio', space: 'hotel', level: 'studio', line: 'insignia', console: 'lcd', material: 'wood', service: 'delivery' },
          { solution: 'solution', space: 'club', level: 'commercial', line: 'signature', console: 'touch', material: 'turf', service: 'support' },
        ]
      ),
    },
  };

  const brands = [
    {
      id: 'ntena',
      name: 'ntena',
      title: '全球新锐健身设备品牌引领者',
      subtitle: 'INTENZA 聚焦专业健身运动领域',
      description: '围绕有氧 · 力量 · 功能性训练构建三大前沿训练产品体系',
      logo: makeLogoDataUri('ntena'),
      foundedYear: 1998,
      overview:
        'INTENZA 秉持专业与诚信的原则，发展成为一个以健康和可持续发展为驱动力的全球社区。我们因对提升健身体验的热忱而团结在一起，正在打造一份持久的遗产——赋能更健康的生活方式，共创美好未来。',
      metrics: [
        { value: '4', label: '建立4家子公司' },
        { value: '75+', label: '覆盖75个国家' },
        { value: '4', label: '建立4个服务中心' },
        { value: '3k+', label: '覆盖3000+ 运动场所' },
      ],
      highlights: [
        {
          title: '全球合作伙伴',
          description:
            '十多年深耕，用专业与资源网络为合作伙伴持续赋能。',
        },
        {
          title: '服务卓越性能',
          description:
            '以稳定可靠的交付与服务体验，保障长期运营效率。',
        },
        {
          title: '可持续未来',
          description:
            '用更高标准的产品与流程，降低环境影响并提升长期价值。',
        },
      ],
      productTypes: [
        {
          id: 'stairclimber',
          zh: '爬楼机',
          en: 'Escalate Stairclimber',
          image:
            'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&h=900&fit=crop',
          focusTitle: '精工细作',
          focusSubtitle: '匠心打造',
          focusDesc:
            '在工艺与细节上持续打磨，让训练体验更稳定、更顺滑。',
        },
        {
          id: 'treadmill',
          zh: '跑步机',
          en: 'Treadmill',
          image:
            'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
        },
        {
          id: 'elliptical',
          zh: '椭圆机',
          en: 'Elliptical Trainer',
          image:
            'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=900&fit=crop',
        },
        {
          id: 'bike',
          zh: '卧式自行车',
          en: 'Recumbent Bike',
          image:
            'https://images.unsplash.com/photo-1599058917212-d750089bc07d?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'torque',
      name: 'TORQUE',
      title: '功能训练与体能空间解决方案',
      subtitle: 'TORQUE 专注功能训练产品线',
      description: '让训练空间更高效、更多元、更具可拓展性',
      logo: makeLogoDataUri('TORQUE'),
      foundedYear: 2005,
      overview:
        'TORQUE 致力于为训练空间提供高效、可拓展的功能训练解决方案，让更多场景能够快速搭建专业训练体验。',
      metrics: [
        { value: '3', label: '核心产品线' },
        { value: '60+', label: '覆盖国家与地区' },
        { value: '6', label: '服务网络节点' },
        { value: '2k+', label: '合作训练空间' },
      ],
      highlights: [
        { title: '空间解决方案', description: '从规划到落地，一站式搭建训练空间。' },
        { title: '模块化拓展', description: '按需组合，满足不同训练与运营需求。' },
        { title: '可靠交付', description: '稳定供应与服务体系，保障项目推进。' },
      ],
      productTypes: [
        {
          id: 'functional',
          zh: '功能训练',
          en: 'Functional Training',
          image:
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=900&fit=crop',
          focusTitle: '高效训练',
          focusSubtitle: '空间升级',
          focusDesc:
            '用更少的占地，覆盖更多训练动作与场景需求。',
        },
        {
          id: 'sled',
          zh: '推雪橇',
          en: 'Sled',
          image:
            'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1200&h=900&fit=crop',
        },
        {
          id: 'rig',
          zh: '综合训练架',
          en: 'Rig System',
          image:
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
        },
        {
          id: 'accessories',
          zh: '训练配件',
          en: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1606041623037-7763d6013b86?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=400&fit=crop',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'gym80',
      name: 'gym80',
      title: '德系力量训练器械标杆品牌',
      subtitle: 'gym80 德国制造',
      description: '稳定、顺滑、耐用，为专业训练而生',
      logo: makeLogoDataUri('gym80'),
      foundedYear: 1980,
      overview:
        'gym80 以德系制造和工程理念为核心，长期服务专业训练场景。通过稳定的结构与顺滑的轨迹，为高频使用的训练空间提供可靠保障。',
      metrics: [
        { value: '40+', label: '专注力量训练' },
        { value: '80+', label: '覆盖国家' },
        { value: '10', label: '系列产品矩阵' },
        { value: '5k+', label: '合作训练场所' },
      ],
      highlights: [
        { title: '专业稳定', description: '高强度使用场景下依然稳定可靠。' },
        { title: '工程优化', description: '顺滑轨迹与人体工学设计提升体验。' },
        { title: '长期耐用', description: '耐用结构与维护友好，降低运维成本。' },
      ],
      productTypes: [
        {
          id: 'strength',
          zh: '力量区器械',
          en: 'Strength Machines',
          image:
            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=900&fit=crop',
          focusTitle: '专业力量',
          focusSubtitle: '稳定输出',
          focusDesc:
            '为高频训练空间提供可靠支撑，满足专业训练需求。',
        },
        {
          id: 'plate',
          zh: '片加载器械',
          en: 'Plate Loaded',
          image:
            'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&h=900&fit=crop',
        },
        {
          id: 'selectorized',
          zh: '配重片器械',
          en: 'Selectorized',
          image:
            'https://images.unsplash.com/photo-1606041623037-7763d6013b86?w=1200&h=900&fit=crop',
        },
        {
          id: 'benches',
          zh: '训练凳',
          en: 'Benches',
          image:
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1606041623037-7763d6013b86?w=600&h=400&fit=crop',
      video: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
      id: 'totalgym',
      name: 'TOTAL GYM',
      title: '全身综合训练系统',
      subtitle: 'Total Gym 经典训练平台',
      description: '一机多练，覆盖全身肌群与功能训练',
      logo: makeLogoDataUri('TOTAL GYM'),
      foundedYear: 1974,
      overview:
        'TOTAL GYM 以“全身综合训练平台”为核心，覆盖多种训练动作与人群需求。通过紧凑结构与多用途设计，提升空间利用率。',
      metrics: [
        { value: '1', label: '一机多练平台' },
        { value: '50+', label: '覆盖国家' },
        { value: '100+', label: '可扩展动作' },
        { value: '1k+', label: '合作训练空间' },
      ],
      highlights: [
        { title: '多用途', description: '覆盖力量、稳定与功能训练的核心动作。' },
        { title: '高效率', description: '紧凑占地，提高训练空间坪效。' },
        { title: '易上手', description: '适合不同基础与人群的训练路径。' },
      ],
      productTypes: [
        {
          id: 'platform',
          zh: '综合训练平台',
          en: 'Training Platform',
          image:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
          focusTitle: '一机多练',
          focusSubtitle: '全身覆盖',
          focusDesc:
            '用更简单的配置满足多动作训练需求，提升空间效率。',
        },
        {
          id: 'core',
          zh: '核心训练',
          en: 'Core',
          image:
            'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=900&fit=crop',
        },
        {
          id: 'rehab',
          zh: '康复训练',
          en: 'Rehab',
          image:
            'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&h=900&fit=crop',
        },
        {
          id: 'mobility',
          zh: '灵活性',
          en: 'Mobility',
          image:
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&h=400&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'puma',
      name: 'PUMA',
      title: '运动生活方式与潮流装备',
      subtitle: 'PUMA 经典潮流与运动融合',
      description: '以设计与体验驱动品牌增长与用户黏性',
      logo: makeLogoDataUri('PUMA'),
      foundedYear: 1948,
      overview:
        'PUMA 将运动表现与生活方式融合，提供更具辨识度的产品体验与设计语言，服务多元人群与场景。',
      metrics: [
        { value: '70+', label: '全球市场覆盖' },
        { value: '200+', label: '联名与合作项目' },
        { value: '10k+', label: '零售触点' },
        { value: '1M+', label: '活跃用户触达' },
      ],
      highlights: [
        { title: '潮流体验', description: '运动与时尚融合的产品表达。' },
        { title: '跨界合作', description: '联名与合作驱动品牌势能增长。' },
        { title: '全渠道', description: '线上线下协同提升触达与转化。' },
      ],
      productTypes: [
        {
          id: 'footwear',
          zh: '运动鞋',
          en: 'Footwear',
          image:
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
          focusTitle: '潮流与性能',
          focusSubtitle: '双重进化',
          focusDesc:
            '以设计语言与科技材料共同驱动穿着体验升级。',
        },
        {
          id: 'apparel',
          zh: '运动服饰',
          en: 'Apparel',
          image:
            'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
        },
        {
          id: 'accessory',
          zh: '配件',
          en: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
        },
        {
          id: 'training',
          zh: '训练装备',
          en: 'Training',
          image:
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'adidas',
      name: 'adidas',
      title: '运动装备与训练生态领军品牌',
      subtitle: 'adidas Performance',
      description: '为训练、跑步与生活方式提供系统化装备支持',
      logo: makeLogoDataUri('adidas'),
      foundedYear: 1949,
      overview:
        'adidas 以运动科技与训练生态为核心，覆盖跑步、训练与生活方式。通过系统化装备与内容服务，持续提升运动体验。',
      metrics: [
        { value: '70+', label: '覆盖国家与地区' },
        { value: '100+', label: '产品系列' },
        { value: '8', label: '核心运动品类' },
        { value: '5k+', label: '合作门店' },
      ],
      highlights: [
        { title: '运动科技', description: '材料与结构创新提升运动表现。' },
        { title: '训练生态', description: '装备、内容与场景协同。' },
        { title: '品质标准', description: '稳定的质量与供应体系支持。' },
      ],
      productTypes: [
        {
          id: 'running',
          zh: '跑步',
          en: 'Running',
          image:
            'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
          focusTitle: '训练生态',
          focusSubtitle: '系统支持',
          focusDesc:
            '从产品到场景，形成更完整的运动体验闭环。',
        },
        {
          id: 'training',
          zh: '训练',
          en: 'Training',
          image:
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=900&fit=crop',
        },
        {
          id: 'football',
          zh: '足球',
          en: 'Football',
          image:
            'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&h=900&fit=crop',
        },
        {
          id: 'lifestyle',
          zh: '生活方式',
          en: 'Lifestyle',
          image:
            'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1526401485004-2aa6b5f6c2e5?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1526401485004-2aa6b5f6c2e5?w=600&h=400&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'nike',
      name: 'NIKE',
      title: '用创新驱动运动表现与体验升级',
      subtitle: 'NIKE Training',
      description: '以科技与设计连接训练与生活方式',
      logo: makeLogoDataUri('NIKE'),
      foundedYear: 1964,
      overview:
        'NIKE 通过创新设计与产品体系，连接训练与生活方式。围绕用户体验，持续优化从产品到服务的全链路。',
      metrics: [
        { value: '80+', label: '全球市场覆盖' },
        { value: '300+', label: '训练产品线' },
        { value: '10+', label: '核心创新方向' },
        { value: '20k+', label: '合作触点' },
      ],
      highlights: [
        { title: '创新驱动', description: '持续投入材料与体验创新。' },
        { title: '训练体系', description: '覆盖多品类训练与场景需求。' },
        { title: '用户体验', description: '以体验为中心的产品与服务。' },
      ],
      productTypes: [
        {
          id: 'training',
          zh: '训练',
          en: 'Training',
          image:
            'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&h=900&fit=crop',
          focusTitle: '创新驱动',
          focusSubtitle: '体验升级',
          focusDesc:
            '用产品与设计语言连接训练与生活方式场景。',
        },
        {
          id: 'running',
          zh: '跑步',
          en: 'Running',
          image:
            'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
        },
        {
          id: 'basketball',
          zh: '篮球',
          en: 'Basketball',
          image:
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
        },
        {
          id: 'lifestyle',
          zh: '生活方式',
          en: 'Lifestyle',
          image:
            'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=600&h=400&fit=crop',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'reebok',
      name: 'Reebok',
      title: '经典训练文化与复古潮流融合',
      subtitle: 'Reebok Training',
      description: '从健身训练到日常穿搭，保持专业与风格并存',
      logo: makeLogoDataUri('Reebok'),
      foundedYear: 1958,
      overview:
        'Reebok 以训练文化为底色，将专业与风格融合。通过经典产品与功能训练基因，服务从训练到日常的多元场景。',
      metrics: [
        { value: '60+', label: '覆盖国家与地区' },
        { value: '50+', label: '训练系列' },
        { value: '5', label: '核心训练方向' },
        { value: '3k+', label: '渠道触点' },
      ],
      highlights: [
        { title: '训练文化', description: '经典训练基因沉淀品牌心智。' },
        { title: '复古潮流', description: '复古语言与当代设计融合。' },
        { title: '场景多元', description: '覆盖训练与日常穿搭需求。' },
      ],
      productTypes: [
        {
          id: 'training',
          zh: '训练',
          en: 'Training',
          image:
            'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1200&h=900&fit=crop',
          focusTitle: '经典传承',
          focusSubtitle: '风格并存',
          focusDesc:
            '在训练文化的底色上，融入更当代的设计表达。',
        },
        {
          id: 'footwear',
          zh: '运动鞋',
          en: 'Footwear',
          image:
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
        },
        {
          id: 'apparel',
          zh: '运动服饰',
          en: 'Apparel',
          image:
            'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
        },
        {
          id: 'classics',
          zh: '经典系列',
          en: 'Classics',
          image:
            'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=600&h=400&fit=crop',
      video: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
      id: 'fila',
      name: 'FILA',
      title: '运动时尚与潮流生活方式品牌',
      subtitle: 'FILA Fusion',
      description: '以复古与当代设计语言打造运动潮流单品',
      logo: makeLogoDataUri('FILA'),
      foundedYear: 1911,
      overview:
        'FILA 以运动时尚与潮流生活方式为核心，强调设计表达与穿着体验，为多元人群提供兼具风格与功能的产品。',
      metrics: [
        { value: '50+', label: '覆盖市场' },
        { value: '100+', label: '合作项目' },
        { value: '8k+', label: '零售触点' },
        { value: '500k+', label: '用户触达' },
      ],
      highlights: [
        { title: '设计表达', description: '以设计语言建立品牌识别。' },
        { title: '潮流单品', description: '复古与当代融合的产品矩阵。' },
        { title: '渠道运营', description: '多渠道协同提升品牌触达。' },
      ],
      productTypes: [
        {
          id: 'lifestyle',
          zh: '潮流系列',
          en: 'Lifestyle',
          image:
            'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1200&h=900&fit=crop',
          focusTitle: '复古语言',
          focusSubtitle: '当代表达',
          focusDesc:
            '以当代审美重塑经典，打造更易搭配的潮流单品。',
        },
        {
          id: 'footwear',
          zh: '运动鞋',
          en: 'Footwear',
          image:
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=900&fit=crop',
        },
        {
          id: 'apparel',
          zh: '运动服饰',
          en: 'Apparel',
          image:
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=900&fit=crop',
        },
        {
          id: 'accessories',
          zh: '配件',
          en: 'Accessories',
          image:
            'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1542293787938-29f2b04213ff?w=600&h=400&fit=crop',
      video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    },
    {
      id: 'technogym',
      name: 'Technogym',
      title: '高端健身器械与数字化训练解决方案',
      subtitle: 'Technogym Ecosystem',
      description: '器械、内容与数据联动，打造专业训练闭环',
      logo: makeLogoDataUri('Technogym'),
      foundedYear: 1983,
      overview:
        'Technogym 以高端器械与数字化训练生态著称，通过设备、内容与数据联动，为专业训练空间提供可持续的增长方案。',
      metrics: [
        { value: '100+', label: '覆盖国家与地区' },
        { value: '20+', label: '数字化产品模块' },
        { value: '8', label: '专业训练场景' },
        { value: '6k+', label: '合作场馆' },
      ],
      highlights: [
        { title: '数字化训练', description: '内容与数据闭环，提升复购与留存。' },
        { title: '高端器械', description: '兼顾体验与可靠性，面向专业场景。' },
        { title: '增长方案', description: '以方案化能力支持运营与增长。' },
      ],
      productTypes: [
        {
          id: 'cardio',
          zh: '有氧器械',
          en: 'Cardio',
          image:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
          focusTitle: '数字生态',
          focusSubtitle: '训练闭环',
          focusDesc:
            '设备、内容与数据联动，打造可持续的训练体验。',
        },
        {
          id: 'strength',
          zh: '力量器械',
          en: 'Strength',
          image:
            'https://images.unsplash.com/photo-1606041623037-7763d6013b86?w=1200&h=900&fit=crop',
        },
        {
          id: 'recovery',
          zh: '恢复科技',
          en: 'Recovery',
          image:
            'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&h=900&fit=crop',
        },
        {
          id: 'digital',
          zh: '数字内容',
          en: 'Digital',
          image:
            'https://images.unsplash.com/photo-1528701800489-20be3c7f80f6?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=600&h=400&fit=crop',
      video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 'lifefitness',
      name: 'Life Fitness',
      title: '商用健身器械与空间解决方案',
      subtitle: 'Life Fitness Strength',
      description: '为健身房与训练空间提供稳定可靠的器械支持',
      logo: makeLogoDataUri('Life Fitness'),
      foundedYear: 1977,
      overview:
        'Life Fitness 为商用健身房与训练空间提供稳定可靠的器械与解决方案，通过完善的服务体系支持长期运营。',
      metrics: [
        { value: '90+', label: '覆盖国家与地区' },
        { value: '10+', label: '产品系列' },
        { value: '12', label: '服务网络节点' },
        { value: '8k+', label: '合作门店' },
      ],
      highlights: [
        { title: '商用可靠', description: '面向高频场景，长期稳定运行。' },
        { title: '方案能力', description: '支持空间规划与器械组合落地。' },
        { title: '服务体系', description: '完善售后与备件支持，降低运维压力。' },
      ],
      productTypes: [
        {
          id: 'strength',
          zh: '力量器械',
          en: 'Strength',
          image:
            'https://images.unsplash.com/photo-1606041623037-7763d6013b86?w=1200&h=900&fit=crop',
          focusTitle: '商用标准',
          focusSubtitle: '稳定可靠',
          focusDesc:
            '为高频训练空间提供长期稳定的器械与服务支持。',
        },
        {
          id: 'cardio',
          zh: '有氧器械',
          en: 'Cardio',
          image:
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop',
        },
        {
          id: 'floor',
          zh: '地材与配套',
          en: 'Flooring',
          image:
            'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
        },
        {
          id: 'solution',
          zh: '空间方案',
          en: 'Solutions',
          image:
            'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=1200&h=900&fit=crop',
        },
      ],
      heroImage:
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1800&h=1000&fit=crop',
      cardImage:
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
      video: 'https://www.w3schools.com/html/movie.mp4',
    },
  ];

  const [activeBrandIndex, setActiveBrandIndex] = useState(0);
  const activeBrand = brands[activeBrandIndex];
  const brandPhilosophyRef = useRef<HTMLElement | null>(null);
  const [hoveredBrandIndex, setHoveredBrandIndex] = useState<number | null>(null);
  const [productFilters, setProductFilters] = useState<Record<string, string>>({ category: 'all' });
  const [productFilterOpenKey, setProductFilterOpenKey] = useState<string | null>(null);
  const productFilterBarRef = useRef<HTMLDivElement | null>(null);
  const [productPage, setProductPage] = useState(1);
  const brandInlineVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isBrandInlineVideoPlaying, setIsBrandInlineVideoPlaying] = useState(false);
  const [isBrandListOpen, setIsBrandListOpen] = useState(false);
  const brandSwitcherRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    setProductFilters({ category: 'all' });
    setProductFilterOpenKey(null);
    setProductPage(1);
    setIsBrandListOpen(false);
  }, [activeBrandIndex]);

  useEffect(() => {
    setIsBrandInlineVideoPlaying(false);
    const v = brandInlineVideoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, [activeBrandIndex]);

  const brandStripRef = useRef<HTMLDivElement>(null);
  const [isBrandStripDragging, setIsBrandStripDragging] = useState(false);
  const [brandStripStartX, setBrandStripStartX] = useState(0);
  const [brandStripScrollLeft, setBrandStripScrollLeft] = useState(0);

  const brandStripItems = [...brands, ...brands, ...brands];

  const scrollToBrandPhilosophy = () => {
    brandPhilosophyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const productsBoxRef = useRef<HTMLDivElement | null>(null);
  const scrollToProducts = (nextCategoryId: string) => {
    setProductFilters({ category: nextCategoryId });
    setProductFilterOpenKey(null);
    setProductPage(1);
    productsBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const switchBrand = (dir: -1 | 1) => {
    setHoveredBrandIndex(null);
    setIsBrandListOpen(false);
    setActiveBrandIndex((prev) => {
      const total = brands.length || 1;
      return (prev + dir + total) % total;
    });
  };

  const selectBrand = (nextIndex: number) => {
    setHoveredBrandIndex(null);
    setIsBrandListOpen(false);
    setActiveBrandIndex(() => {
      const total = brands.length || 1;
      const normalized = ((nextIndex % total) + total) % total;
      return normalized;
    });
  };

  const partnersLogoWallRef = useRef<HTMLDivElement>(null);
  const [isPartnersLogoWallDragging, setIsPartnersLogoWallDragging] = useState(false);
  const [partnersLogoWallStartX, setPartnersLogoWallStartX] = useState(0);
  const [partnersLogoWallScrollLeft, setPartnersLogoWallScrollLeft] = useState(0);

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
      if (tries >= 30) window.clearInterval(intervalId);
      const singleSetWidth = el.scrollWidth / 3;
      if (singleSetWidth > 0 && el.scrollLeft !== 0) window.clearInterval(intervalId);
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
    let paused = false;

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    const tick = () => {
      if (!paused && !isPartnersLogoWallDragging) {
        el.scrollLeft += 0.6;
        const singleSetWidth = el.scrollWidth / 3;
        if (singleSetWidth > 0) {
          if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
          if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isPartnersLogoWallDragging]);

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
  };

  const handlePartnersLogoWallEnd = () => setIsPartnersLogoWallDragging(false);

  useEffect(() => {
    const onMouseUp = () => setIsPartnersLogoWallDragging(false);
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  const productTypes = activeBrand.productTypes ?? [];
  const [activeProductTypeIndex, setActiveProductTypeIndex] = useState(0);
  const [activeProductTypeVirtualIndex, setActiveProductTypeVirtualIndex] = useState(0);
  const productTypesStripRef = useRef<HTMLDivElement>(null);
  const [isProductTypesDragging, setIsProductTypesDragging] = useState(false);
  const [productTypesStartX, setProductTypesStartX] = useState(0);
  const [productTypesScrollLeft, setProductTypesScrollLeft] = useState(0);
  const productTypesPauseUntilRef = useRef(0);

  const productTypeItems = [...productTypes, ...productTypes, ...productTypes];

  useEffect(() => {
    setActiveProductTypeIndex(0);
    setActiveProductTypeVirtualIndex(productTypes.length);
    const el = productTypesStripRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const singleSetWidth = el.scrollWidth / 3;
      el.scrollLeft = singleSetWidth;
    });
  }, [activeBrandIndex]);

  useEffect(() => {
    const el = productTypesStripRef.current;
    if (!el || productTypes.length === 0) return;

    let rafId = 0;
    let paused = false;

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    const tick = () => {
      if (!paused && !isProductTypesDragging && Date.now() >= productTypesPauseUntilRef.current) {
        el.scrollLeft += 0.3;
        const singleSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleSetWidth * 2) {
          el.scrollLeft -= singleSetWidth;
        }
        if (el.scrollLeft < singleSetWidth) {
          el.scrollLeft += singleSetWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [activeBrandIndex, isProductTypesDragging, productTypes.length]);

  useEffect(() => {
    const el = productTypesStripRef.current;
    if (!el || productTypes.length === 0) return;
    const target = el.querySelector(
      `[data-ptype="${activeProductTypeVirtualIndex}"]`
    ) as HTMLElement | null;
    if (!target) return;
    const left = Math.max(0, target.offsetLeft - 8);
    el.scrollTo({ left, behavior: 'smooth' });
  }, [activeBrandIndex, activeProductTypeVirtualIndex, productTypes.length]);

  const setProductTypeVirtualIndex = (nextVirtualIndex: number, pauseMs: number) => {
    const el = productTypesStripRef.current;
    if (!el || productTypes.length === 0) return;

    productTypesPauseUntilRef.current = Date.now() + pauseMs;

    const singleSetWidth = el.scrollWidth / 3;
    let normalized = nextVirtualIndex;

    while (normalized >= productTypes.length * 2) {
      el.scrollLeft -= singleSetWidth;
      normalized -= productTypes.length;
    }

    while (normalized < productTypes.length) {
      el.scrollLeft += singleSetWidth;
      normalized += productTypes.length;
    }

    setActiveProductTypeVirtualIndex(normalized);
    setActiveProductTypeIndex(normalized % productTypes.length);
  };

  const handleProductTypesStart = (clientX: number) => {
    const el = productTypesStripRef.current;
    if (!el) return;
    productTypesPauseUntilRef.current = Date.now() + 1200;
    setIsProductTypesDragging(true);
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (el.scrollLeft >= singleSetWidth * 2) el.scrollLeft -= singleSetWidth;
      if (el.scrollLeft < singleSetWidth) el.scrollLeft += singleSetWidth;
    }
    setProductTypesStartX(clientX - el.offsetLeft);
    setProductTypesScrollLeft(el.scrollLeft);
  };

  const handleProductTypesMove = (clientX: number) => {
    const el = productTypesStripRef.current;
    if (!el || !isProductTypesDragging) return;
    const x = clientX - el.offsetLeft;
    const walk = (x - productTypesStartX) * 1.6;
    el.scrollLeft = productTypesScrollLeft - walk;
    const singleSetWidth = el.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (el.scrollLeft >= singleSetWidth * 2) {
        el.scrollLeft -= singleSetWidth;
        setProductTypesScrollLeft((prev) => prev - singleSetWidth);
      }
      if (el.scrollLeft < singleSetWidth) {
        el.scrollLeft += singleSetWidth;
        setProductTypesScrollLeft((prev) => prev + singleSetWidth);
      }
    }
  };

  const handleProductTypesEnd = () => setIsProductTypesDragging(false);

  useEffect(() => {
    const onMouseUp = () => setIsProductTypesDragging(false);
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  useEffect(() => {
    const el = brandStripRef.current;
    if (!el) return;

    const onMouseUp = () => setIsBrandStripDragging(false);
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  useEffect(() => {
    const el = brandStripRef.current;
    if (!el) return;

    let rafId = 0;
    let paused = false;

    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    const tick = () => {
      if (!paused && !isBrandStripDragging) {
        el.scrollLeft += 0.6;
        const singleSetWidth = el.scrollWidth / 3;
        if (el.scrollLeft >= singleSetWidth) {
          el.scrollLeft -= singleSetWidth;
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isBrandStripDragging]);

  const handleBrandStripStart = (clientX: number) => {
    const el = brandStripRef.current;
    if (!el) return;
    setIsBrandStripDragging(true);
    setBrandStripStartX(clientX - el.offsetLeft);
    setBrandStripScrollLeft(el.scrollLeft);
  };

  const handleBrandStripMove = (clientX: number) => {
    const el = brandStripRef.current;
    if (!el || !isBrandStripDragging) return;
    const x = clientX - el.offsetLeft;
    const walk = (x - brandStripStartX) * 1.6;
    el.scrollLeft = brandStripScrollLeft - walk;
  };

  const handleBrandStripEnd = () => setIsBrandStripDragging(false);

  const onBrandStripMouseDown = (e: React.MouseEvent<HTMLDivElement>) => handleBrandStripStart(e.pageX);
  const onBrandStripMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isBrandStripDragging) return;
    e.preventDefault();
    handleBrandStripMove(e.pageX);
  };
  const onBrandStripTouchStart = (e: React.TouchEvent<HTMLDivElement>) => handleBrandStripStart(e.touches[0].pageX);
  const onBrandStripTouchMove = (e: React.TouchEvent<HTMLDivElement>) => handleBrandStripMove(e.touches[0].pageX);

  const activeCatalog =
    brandCatalogMap[activeBrand.id] ??
    ({
      title: '提供多元、个性、潮流的训练方式',
      description: '根据不同品牌与品类展示对应的产品清单。',
      filtersByCategoryId: { all: [] },
      products: [],
    } as BrandCatalog);

  const categoryOptions: Option[] = [
    { value: 'all', label: '全部产品' },
    ...productTypes.map((t) => ({ value: t.id, label: t.zh })),
  ];

  const activeCategoryId = productFilters.category ?? 'all';
  const dynamicFilters =
    activeCatalog.filtersByCategoryId[activeCategoryId] ??
    activeCatalog.filtersByCategoryId.all ??
    [];

  const filterDefs: FilterDef[] = [
    { key: 'category', label: '全部产品', options: categoryOptions },
    ...dynamicFilters,
  ];

  useEffect(() => {
    const next: Record<string, string> = { category: activeCategoryId };
    for (const def of filterDefs) {
      next[def.key] = productFilters[def.key] ?? 'all';
    }
    setProductFilters(next);
    setProductFilterOpenKey(null);
    setProductPage(1);
  }, [activeCategoryId]);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      const el = productFilterBarRef.current;
      if (!(e.target instanceof Node)) return;
      const brandEl = brandSwitcherRef.current;
      if (el && el.contains(e.target)) return;
      if (brandEl && brandEl.contains(e.target)) return;
      setProductFilterOpenKey(null);
      setIsBrandListOpen(false);
    };
    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, []);

  const filteredProducts = activeCatalog.products.filter((p) => {
    if (activeCategoryId !== 'all' && p.categoryId !== activeCategoryId) return false;
    for (const def of dynamicFilters) {
      const sel = productFilters[def.key] ?? 'all';
      if (sel === 'all') continue;
      if ((p.attrs?.[def.key] ?? '') !== sel) return false;
    }
    return true;
  });

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(Math.max(productPage, 1), totalPages);
  const pagedProducts = filteredProducts.slice((safePage - 1) * pageSize, safePage * pageSize);

  const getPageItems = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const items: Array<number | '...'> = [];
    const add = (v: number | '...') => items.push(v);
    const start = Math.max(2, safePage - 1);
    const end = Math.min(totalPages - 1, safePage + 1);
    add(1);
    if (start > 2) add('...');
    for (let p = start; p <= end; p += 1) add(p);
    if (end < totalPages - 1) add('...');
    add(totalPages);
    return items;
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100svh] pt-20 pb-0 md:pt-32 md:pb-0">
        <div className="absolute inset-0 overflow-hidden z-0">
          <video
            src={activeBrand.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#c8ff00]/35 via-black/20 to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,255,0,0.15),transparent_45%)]" />
        </div>

        <div className="content-container relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="mb-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center p-4 md:p-5 mb-6 shadow-xl">
                <img
                  src={activeBrand.logo}
                  alt={activeBrand.name}
                  className="w-full h-full object-contain"
                  draggable="false"
                />
              </div>
              <div className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                {activeBrand.title}
              </div>
              <div className="mt-8 text-white/70 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                <div className="text-white/80 font-medium mb-3 text-lg md:text-xl">{activeBrand.subtitle}</div>
                <div className="mt-2">{activeBrand.description}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-[#c8ff00] mb-2">{stat.value}</div>
                  <div className="text-white/60 text-base md:text-lg tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 z-20">
          <div className="h-28 md:h-36 bg-gradient-to-t from-[#c8ff00]/30 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-14">
            <div className="content-container">
              <div
                ref={brandStripRef}
                onMouseDown={onBrandStripMouseDown}
                onMouseMove={onBrandStripMouseMove}
                onMouseLeave={handleBrandStripEnd}
                onMouseUp={handleBrandStripEnd}
                onTouchStart={onBrandStripTouchStart}
                onTouchMove={onBrandStripTouchMove}
                onTouchEnd={handleBrandStripEnd}
                onTouchCancel={handleBrandStripEnd}
                className={`flex gap-4 md:gap-6 overflow-x-auto pb-2 select-none [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isBrandStripDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              >
                {brandStripItems.map((brand, i) => {
                  const realIndex = i % brands.length;
                  const isActive = realIndex === activeBrandIndex;
                  const isHovered = hoveredBrandIndex === realIndex;
                  return (
                    <button
                      key={`${brand.id}-${i}`}
                      type="button"
                      onClick={() => {
                        setActiveBrandIndex(realIndex);
                        scrollToBrandPhilosophy();
                      }}
                      onMouseEnter={() => setHoveredBrandIndex(realIndex)}
                      onMouseLeave={() => setHoveredBrandIndex(null)}
                      className={`flex-none w-1/6 aspect-square rounded-full overflow-hidden border-2 transition-all duration-300 ${
                        isActive ? 'border-[#c8ff00] scale-105' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="relative w-full h-full bg-[#111]">
                        {isHovered && brand.video ? (
                          <video
                            src={brand.video}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={brand.cardImage}
                            alt={brand.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                            draggable="false"
                          />
                        )}
                        <div className={`absolute inset-0 transition-colors ${isActive ? 'bg-black/25' : 'bg-black/45'}`} />
                        <div className={`absolute inset-0 ring-1 transition-opacity ${isActive ? 'ring-[#c8ff00]/60 opacity-100' : 'ring-white/10 opacity-0'}`} />
                        <div className="absolute inset-0 flex items-center justify-center px-2">
                          <img
                            src={brand.logo}
                            alt={brand.name}
                            className="h-4 sm:h-5 md:h-6 w-auto opacity-95 pointer-events-none"
                            draggable="false"
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Brand Philosophy Section */}
      <section ref={brandPhilosophyRef} className="py-16 md:py-24 bg-[#111]">
        <div className="content-container">
          <div className="bg-white rounded-[28px] md:rounded-[36px] px-6 md:px-12 py-10 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-2 flex items-center justify-between lg:flex-col lg:items-start lg:justify-start gap-4">
                <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                  {lang === 'zh' ? '了解品牌' : 'About the Brand'}
                </div>
                <div className="hidden lg:flex items-center gap-2 text-xs text-black/60 tracking-widest">
                  SCROLL DOWN
                  <span className="text-black/60">↓</span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="grid grid-cols-2 gap-y-10 gap-x-8 md:gap-x-16 max-w-xl">
                  {activeBrand.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-4xl md:text-5xl font-black text-black leading-none">
                        {m.value}
                      </div>
                      <div className="mt-3 text-xs md:text-sm text-black/70 font-semibold tracking-wide">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="rounded-2xl overflow-hidden border border-black/10 bg-white">
                  <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-4">
                    <div className="text-xs text-black/60">
                      <div className="font-semibold tracking-wide">Product Design</div>
                      <div className="mt-1 font-bold text-black">{activeBrand.name}</div>
                    </div>
                    <div className="text-xs text-black/50 font-semibold">24 Feb</div>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="aspect-square md:aspect-[16/10] rounded-xl overflow-hidden bg-black/5">
                      <img
                        src={activeBrand.cardImage}
                        alt={activeBrand.name}
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-16">
              <h2 className="text-2xl md:text-4xl font-black text-black tracking-tight text-center">
                {lang === 'zh'
                  ? `自${activeBrand.foundedYear}年，一直致力于为健身事业提供动力。`
                  : `Since ${activeBrand.foundedYear}, empowering fitness with products and innovation.`}
              </h2>
              <p className="mt-6 md:mt-8 text-sm md:text-base text-black/60 leading-relaxed max-w-4xl mx-auto text-center">
                {activeBrand.overview}
              </p>
            </div>

            <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {activeBrand.highlights.map((h) => (
                <div key={h.title} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#c8ff00] flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-black" />
                  </div>
                  <div className="mt-5 text-sm md:text-base font-black text-black tracking-wide">
                    {h.title}
                  </div>
                  <div className="mt-2 text-xs md:text-sm text-black/60 leading-relaxed max-w-xs">
                    {h.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     

      {/* Feature Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10 mb-10 md:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider mb-6">
                {lang === 'zh' ? '产品精选' : 'Featured Products'}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {lang === 'zh' ? '用心突破，创造价值' : 'Break through. Create value.'}
              </h2>
            </div>
            <div className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl md:text-right">
              <div className="font-semibold text-white/70">
                {lang === 'zh' ? `${activeBrand.name} 产品矩阵` : `${activeBrand.name} portfolio`}
              </div>
              <div className="mt-2">
                {lang === 'zh'
                  ? '围绕场景化需求，覆盖从有氧、力量到功能训练的关键品类。'
                  : 'Built around real scenarios, covering key categories from cardio and strength to functional training.'}
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              ref={productTypesStripRef}
              onMouseDown={(e) => handleProductTypesStart(e.pageX)}
              onMouseMove={(e) => {
                if (!isProductTypesDragging) return;
                e.preventDefault();
                handleProductTypesMove(e.pageX);
              }}
              onMouseLeave={handleProductTypesEnd}
              onMouseUp={handleProductTypesEnd}
              onTouchStart={(e) => handleProductTypesStart(e.touches[0].pageX)}
              onTouchMove={(e) => handleProductTypesMove(e.touches[0].pageX)}
              onTouchEnd={handleProductTypesEnd}
              onTouchCancel={handleProductTypesEnd}
              className={`flex gap-5 md:gap-7 overflow-x-auto pb-2 select-none [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isProductTypesDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ scrollBehavior: 'auto', touchAction: 'pan-y' }}
            >
              {productTypeItems.map((t, i) => {
                const realIndex = productTypes.length === 0 ? 0 : i % productTypes.length;
                const isActive = realIndex === activeProductTypeIndex;
                const isFocusCard = !!t.focusTitle && isActive;
                return (
                  <div key={`${t.id}-${i}`} data-ptype={i} className="flex-none w-[260px] sm:w-[300px] md:w-[340px]">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setProductTypeVirtualIndex(i, 1500);
                        scrollToProducts(t.id);
                      }}
                      className={`rounded-2xl overflow-hidden bg-[#111] border transition-all outline-none ${
                        isActive
                          ? 'border-[#c8ff00] shadow-[0_0_0_1px_rgba(200,255,0,0.35)]'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="relative aspect-[9/16] md:aspect-[3/4]">
                        <img
                          src={t.image}
                          alt={t.zh}
                          className="absolute inset-0 w-full h-full object-cover"
                          draggable="false"
                        />
                        <div className={`absolute inset-0 transition-colors ${isActive ? 'bg-black/25' : 'bg-black/55'}`} />
                        {isFocusCard ? (
                          <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="text-3xl md:text-4xl font-black text-white tracking-tight">
                              {t.focusTitle}
                            </div>
                            <div className="mt-2 text-xl md:text-2xl font-black text-white/95 tracking-tight">
                              {t.focusSubtitle}
                            </div>
                            <div className="mt-4 text-white/70 text-sm leading-relaxed max-w-[22rem]">
                              {t.focusDesc}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-white font-bold tracking-wide">{t.zh}</div>
                      <div className="text-white/50 text-sm mt-1">{t.en}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setProductTypeVirtualIndex(activeProductTypeVirtualIndex - 1, 1500)
                }
                className="w-12 h-12 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setProductTypeVirtualIndex(activeProductTypeVirtualIndex + 1, 1500)
                }
                className="w-12 h-12 rounded-full bg-[#c8ff00] text-black hover:bg-white transition-colors flex items-center justify-center"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

<section className="py-16 md:py-24 bg-white">
        <div className="content-container">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                {lang === 'zh' ? '品牌视频' : 'Brand Video'}
              </div>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">
                {lang === 'zh' ? '提升健身体验，赋能于人' : 'Elevate fitness experiences'}
              </h2>
            </div>
            <div className="text-black/60 text-sm md:text-base leading-relaxed max-w-xl md:text-right">
              <div className="font-semibold text-black/70">
                {lang === 'zh' ? `“${activeBrand.name}”品牌介绍` : `${activeBrand.name} introduction`}
              </div>
              <div className="mt-2">{activeBrand.subtitle}</div>
            </div>
          </div>

          <div className="mt-10 md:mt-12">
            <div className="relative w-full rounded-[32px] overflow-hidden border border-black/10 bg-black/5">
              <div className="relative aspect-[9/16] md:aspect-[16/9]">
                <video
                  ref={brandInlineVideoRef}
                  key={activeBrand.id}
                  src={activeBrand.video}
                  poster={activeBrand.heroImage}
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsBrandInlineVideoPlaying(true)}
                  onPause={() => setIsBrandInlineVideoPlaying(false)}
                  onEnded={() => setIsBrandInlineVideoPlaying(false)}
                />
                {!isBrandInlineVideoPlaying ? (
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => brandInlineVideoRef.current?.play()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') brandInlineVideoRef.current?.play();
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/35 via-black/10 to-transparent cursor-pointer"
                  >
                    <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#c8ff00] text-black flex items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
                      <Play className="w-6 h-6 md:w-7 md:h-7 translate-x-[1px]" />
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section className="py-16 md:py-24 bg-[#111]">
        <div className="content-container">
          <div
            ref={productsBoxRef}
            className="bg-white rounded-[28px] md:rounded-[36px] px-6 md:px-12 py-10 md:py-14 scroll-mt-24 md:scroll-mt-32"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-[#c8ff00] text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                  {lang === 'zh' ? '产品清单' : 'Product List'}
                </div>
                <h2 className="mt-6 text-3xl md:text-5xl font-black text-black tracking-tight">
                  {activeCatalog.title}
                </h2>
              </div>
              <div className="text-black/60 text-sm md:text-base leading-relaxed max-w-xl md:text-right">
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <div className="font-semibold text-black/70">
                    {lang === 'zh' ? `${activeBrand.name} · 产品矩阵` : `${activeBrand.name} · Portfolio`}
                  </div>
                  <div className="flex items-center gap-2">
                    <div ref={brandSwitcherRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsBrandListOpen((v) => !v)}
                        className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-full text-xs md:text-sm font-semibold text-black hover:border-gray-300 transition-colors"
                        aria-label={lang === 'zh' ? '展开品牌列表' : 'Open brand list'}
                      >
                        <img src={activeBrand.logo} alt={activeBrand.name} className="h-4 md:h-5 w-auto" draggable="false" />
                        <span className="max-w-[8rem] truncate">{activeBrand.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isBrandListOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isBrandListOpen ? (
                        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-1 z-30">
                          <div className="max-h-80 overflow-auto">
                            {brands.map((b, idx) => {
                              const active = idx === activeBrandIndex;
                              return (
                                <button
                                  key={b.id}
                                  type="button"
                                  onClick={() => selectBrand(idx)}
                                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors ${
                                    active ? 'bg-[#c8ff00]/30' : 'hover:bg-black/5'
                                  }`}
                                >
                                  <img src={b.logo} alt={b.name} className="h-5 w-auto" draggable="false" />
                                  <div className="min-w-0">
                                    <div className="text-sm font-bold text-black truncate">{b.name}</div>
                                    <div className="text-xs text-black/50 truncate">{b.subtitle}</div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="inline-flex items-center rounded-full bg-gray-50 border border-gray-200 p-1">
                      <button
                        type="button"
                        onClick={() => switchBrand(-1)}
                        className="w-9 h-9 rounded-full text-black/70 hover:bg-[#c8ff00] hover:text-black transition-colors flex items-center justify-center"
                        aria-label={lang === 'zh' ? '上一品牌' : 'Previous brand'}
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => switchBrand(1)}
                        className="w-9 h-9 rounded-full text-black/70 hover:bg-[#c8ff00] hover:text-black transition-colors flex items-center justify-center"
                        aria-label={lang === 'zh' ? '下一品牌' : 'Next brand'}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-2">{activeCatalog.description}</div>
              </div>
            </div>

            <div ref={productFilterBarRef} className="mt-8 flex flex-wrap items-center gap-3">
              {filterDefs.map((def) => {
                const selectedValue = productFilters[def.key] ?? 'all';
                const selectedLabel =
                  def.options.find((o) => o.value === selectedValue)?.label ?? def.label;
                const isOpen = productFilterOpenKey === def.key;
                return (
                  <div key={def.key} className="relative">
                    <button
                      type="button"
                      onClick={() => setProductFilterOpenKey((prev) => (prev === def.key ? null : def.key))}
                      className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-black hover:border-gray-300 transition-colors"
                    >
                      <span>{selectedLabel}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen ? (
                      <div className="absolute left-0 top-full mt-2 w-52 rounded-2xl bg-white border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.18)] p-1 z-30">
                        {def.options.map((opt) => {
                          const active = opt.value === selectedValue;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setProductFilters((prev) => ({ ...prev, [def.key]: opt.value }));
                                setProductFilterOpenKey(null);
                                setProductPage(1);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                                active ? 'bg-[#c8ff00] text-black font-bold' : 'text-black/80 hover:bg-black/5'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {pagedProducts.length === 0 ? (
                <div className="col-span-full rounded-2xl border border-black/10 bg-black/5 p-10 text-center text-black/60">
                  {lang === 'zh' ? '暂无符合筛选条件的产品' : 'No products match the current filters.'}
                </div>
              ) : (
                pagedProducts.map((p) => {
                  const categoryLabel =
                    categoryOptions.find((o) => o.value === p.categoryId)?.label ?? '';
                  const variantGroups = filterDefs
                    .filter((d) => d.key !== 'category')
                    .slice(0, 2)
                    .map((d) => ({
                      key: d.key,
                      label: d.label,
                      options: d.options.filter((o) => o.value !== 'all'),
                      selectedValue: p.attrs?.[d.key],
                    }))
                    .filter((g) => g.options.length > 0);
                  const images = [p.image, activeBrand.heroImage, activeBrand.cardImage].filter(Boolean);
                  const functionValue = p.attrs?.function ?? null;
                  const getCategoryLabel = (id: string) =>
                    categoryOptions.find((o) => o.value === id)?.label ?? '';
                  const baseRecommended = activeCatalog.products.filter((x) => x.id !== p.id);
                  const sameCategory = baseRecommended.filter((x) => x.categoryId === p.categoryId);
                  const sameFunctionOtherCategory =
                    functionValue == null
                      ? []
                      : baseRecommended.filter(
                          (x) => x.categoryId !== p.categoryId && (x.attrs?.function ?? null) === functionValue
                        );
                  const otherProducts =
                    functionValue == null
                      ? baseRecommended.filter((x) => x.categoryId !== p.categoryId)
                      : baseRecommended.filter(
                          (x) => x.categoryId !== p.categoryId && (x.attrs?.function ?? null) !== functionValue
                        );
                  const recommendedProducts = [...sameCategory, ...sameFunctionOtherCategory, ...otherProducts]
                    .slice(0, 12)
                    .map((x) => ({
                      id: x.id,
                      name: x.name,
                      image: x.image,
                      tag: x.tag,
                      weightKg: x.weightKg,
                      weightLb: x.weightLb,
                      priceUsd: x.priceUsd,
                      categoryId: x.categoryId,
                      categoryLabel: getCategoryLabel(x.categoryId),
                    }));
                  const payload = {
                    productId: p.id,
                    brandId: activeBrand.id,
                    brandName: activeBrand.name,
                    title: p.name,
                    description: activeCatalog.description,
                    images,
                    tag: p.tag,
                    weightKg: p.weightKg,
                    weightLb: p.weightLb,
                    priceUsd: p.priceUsd,
                    categoryId: p.categoryId,
                    categoryLabel,
                    variantGroups,
                    recommendedProducts,
                  };
                  return (
                    <Link
                      key={p.id}
                      to={`/hot-stores/product/${encodeURIComponent(p.id)}`}
                      state={payload}
                      onClick={() => {
                        sessionStorage.setItem(`product-detail:${p.id}`, JSON.stringify(payload));
                      }}
                      className="group block"
                    >
                      <div className="relative rounded-2xl bg-[#f3f4f6] overflow-hidden">
                        <div className="aspect-[4/3] p-6 flex items-center justify-center">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                            draggable="false"
                          />
                        </div>
                        {p.tag ? (
                          <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-[#c8ff00] text-black px-3 py-1 rounded-full text-xs font-bold">
                            {p.tag}
                          </div>
                        ) : null}
                      </div>
                      <div className="mt-4">
                        <div className="text-sm text-black/50 font-semibold">{categoryLabel}</div>
                        <div className="mt-1 text-lg font-black text-black tracking-tight">{p.name}</div>
                        {p.subtitle ? (
                          <div className="mt-1 text-sm text-black/60">{p.subtitle}</div>
                        ) : null}
                        {typeof p.weightKg === 'number' && typeof p.weightLb === 'number' ? (
                          <div className="mt-2 text-sm text-black/50">
                            {p.weightKg}kg / {p.weightLb}lbs
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                className="w-11 h-11 rounded-full bg-white border border-gray-200 text-black/70 hover:border-gray-300 hover:text-black transition-colors flex items-center justify-center disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-black/70"
                disabled={safePage <= 1}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              {getPageItems().map((it, idx) =>
                it === '...' ? (
                  <span key={`e-${idx}`} className="w-11 h-11 flex items-center justify-center text-black/40">
                    ···
                  </span>
                ) : (
                  <button
                    key={it}
                    type="button"
                    onClick={() => setProductPage(it)}
                    className={`w-11 h-11 rounded-full border transition-colors flex items-center justify-center text-sm font-semibold ${
                      it === safePage
                        ? 'bg-[#c8ff00] border-[#c8ff00] text-black'
                        : 'bg-white border-gray-200 text-black/70 hover:border-gray-300 hover:text-black'
                    }`}
                  >
                    {it}
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                className="w-11 h-11 rounded-full bg-[#c8ff00] border border-[#c8ff00] text-black hover:bg-[#d7ff4a] transition-colors flex items-center justify-center disabled:opacity-40 disabled:hover:bg-[#c8ff00]"
                disabled={safePage >= totalPages}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

 <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="content-container">
          <div className="text-center mb-16">
            <h3 className="text-sm md:text-base font-bold text-gray-800 tracking-wider">
              ABLAZING的合作伙伴遍布全球
            </h3>
          </div>

          <div className="relative">
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
              className={`flex items-center gap-16 md:gap-24 overflow-x-auto select-none px-4 [&&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isPartnersLogoWallDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ scrollBehavior: 'auto', touchAction: 'pan-y' }}
            >
              {[1, 2, 3].map((setIndex) => (
                <div key={`partners-brand-set-${setIndex}`} className="flex items-center gap-16 md:gap-24 shrink-0">
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img src="https://cdn.worldvectorlogo.com/logos/borgwarner-1.svg" alt="BORGWARNER" className="h-full w-auto object-contain opacity-80 pointer-events-none" draggable="false" />
                  </div>
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img src="https://cdn.worldvectorlogo.com/logos/lennar.svg" alt="LENNAR" className="h-full w-auto object-contain opacity-80 pointer-events-none" draggable="false" />
                  </div>
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img src="https://cdn.worldvectorlogo.com/logos/norwegian-cruise-line.svg" alt="NORWEGIAN CRUISE LINE" className="h-full w-auto object-contain opacity-80 pointer-events-none" draggable="false" />
                  </div>
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img src="https://cdn.worldvectorlogo.com/logos/adidas-4.svg" alt="adidas" className="h-full w-auto object-contain opacity-80 pointer-events-none" draggable="false" />
                  </div>
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img src="https://cdn.worldvectorlogo.com/logos/fila-9.svg" alt="FILA" className="h-full w-auto object-contain opacity-80 pointer-events-none" draggable="false" />
                  </div>
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img src="https://cdn.worldvectorlogo.com/logos/nike-11.svg" alt="Nike" className="h-full w-auto object-contain opacity-80 pointer-events-none" draggable="false" />
                  </div>
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img src="https://cdn.worldvectorlogo.com/logos/puma-logo.svg" alt="PUMA" className="h-full w-auto object-contain opacity-80 pointer-events-none" draggable="false" />
                  </div>
                  <div className="h-8 md:h-9 flex items-center justify-center shrink-0">
                    <img src="https://cdn.worldvectorlogo.com/logos/reebok-1.svg" alt="Reebok" className="h-full w-auto object-contain opacity-80 pointer-events-none" draggable="false" />
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute top-0 bottom-0 left-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">
                {t('home.cta.titleLeft')} <span className="text-[#c8ff00]">·</span> {t('home.cta.titleRight')}
              </h2>
              <div className="flex items-center justify-center md:justify-end">
                <Link to="/contact" className="bg-[#c8ff00] text-black px-10 py-5 font-semibold hover:bg-white transition-colors duration-300">
                  {t('cta.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotStores;
