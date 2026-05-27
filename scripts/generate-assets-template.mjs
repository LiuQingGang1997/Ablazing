import fs from 'node:fs';
import path from 'node:path';
import * as XLSX from 'xlsx';

const projectRoot = path.resolve(process.cwd());
const docsDir = path.join(projectRoot, 'docs');
const outFile = path.join(docsDir, '素材清单字段模板.xlsx');

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const makeSheetFromRows = (rows) => {
  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = rows[0].map((h) => ({ wch: Math.max(12, String(h).length + 2) }));
  return ws;
};

const sectionSheetRows = [
  [
    'pageRoute',
    'pageName',
    'sectionKey',
    'sectionName',
    'assetType',
    'fieldKey',
    'fieldName',
    'required',
    'language',
    'spec',
    'exampleCurrent',
    'note',
  ],
  [
    '/',
    '首页',
    'home.hero.banners',
    '首屏Banner轮播',
    'image',
    'banners[].image',
    'Banner图片URL',
    'Y',
    'both',
    '建议1920x1080+，webp/jpg/png，重要主体居中',
    'src/config/images.ts -> imageConfig.banners[].image',
    '',
  ],
  [
    '/',
    '首页',
    'home.categoryCards',
    '分类卡片（悬停视频）',
    'video',
    'categoryCards[].video',
    '悬停视频URL',
    'N',
    'both',
    'mp4(H.264)，静音循环，5-12秒，建议<=15MB',
    'src/pages/Home.tsx 示例 mp4',
    '建议替换为品牌/品类真实视频',
  ],
  [
    '/hot-stores',
    '醒动热店',
    'hotStores.brand.hero',
    '品牌Hero（切换）',
    'video',
    'brands[].video',
    '品牌视频URL',
    'Y',
    'both',
    'mp4(H.264)，静音循环，10-30秒，建议<=30MB',
    'src/pages/HotStores.tsx 示例 mp4',
    '',
  ],
  [
    '/hot-stores/product/:productId',
    '商品详情',
    'productDetail.gallery',
    '商品图集',
    'image',
    'payload.images[]',
    '商品图片URL（多张）',
    'Y',
    'both',
    '建议1200x1200或统一比例，3-6张，webp/jpg/png',
    '路由传参 / sessionStorage',
    '',
  ],
  [
    '/about',
    '公司介绍',
    'about.hero',
    'About Hero',
    'image',
    'company.hero',
    '公司形象图URL',
    'Y',
    'both',
    '建议1920x1080+，偏品牌调性主视觉',
    'src/config/images.ts -> imageConfig.company.hero',
    '',
  ],
  [
    '/contact',
    '联系我们',
    'contact.hero',
    'Contact Hero',
    'image',
    'contact.hero',
    '联系页头图URL',
    'Y',
    'both',
    '建议1920x1080+，偏人物/场景/空间',
    'src/config/images.ts -> imageConfig.contact.hero',
    '',
  ],
];

const brandSheetHeaders = [
  'brandId',
  'brandNameZh',
  'brandNameEn',
  'logoUrl',
  'heroImageUrl',
  'cardImageUrl',
  'videoUrl',
  'posterUrl',
  'foundedYear',
  'titleZh',
  'titleEn',
  'subtitleZh',
  'subtitleEn',
  'descriptionZh',
  'descriptionEn',
  'overviewZh',
  'overviewEn',
  'metricsJson',
  'highlightsJson',
  'productTypesJson',
  'note',
];

const brandSheetExampleRow = [
  'brand_xxx',
  '品牌中文名',
  'Brand English Name',
  'https://.../logo.svg',
  'https://.../hero.webp',
  'https://.../card.webp',
  'https://.../brand.mp4',
  'https://.../poster.webp',
  '2016',
  '主标题（中）',
  'Title (EN)',
  '副标题（中）',
  'Subtitle (EN)',
  '一句话描述（中）',
  'One-liner (EN)',
  '长文介绍（中）',
  'Long overview (EN)',
  '[{\"value\":\"300%\",\"label\":\"增长\"}]',
  '[{\"title\":\"亮点1\",\"description\":\"...\"}]',
  '[{\"id\":\"cat1\",\"zh\":\"跑步机\",\"en\":\"Treadmill\",\"image\":\"https://...\"}]',
  'metrics/highlights/productTypes 建议按 JSON 数组填写',
];

const productSheetHeaders = [
  'productId',
  'brandId',
  'brandNameZh',
  'brandNameEn',
  'categoryId',
  'categoryLabelZh',
  'categoryLabelEn',
  'nameZh',
  'nameEn',
  'subtitleZh',
  'subtitleEn',
  'tagZh',
  'tagEn',
  'priceUsd',
  'weightKg',
  'weightLb',
  'imagesCsv',
  'descriptionZh',
  'descriptionEn',
  'variantGroupsJson',
  'recommendedProductsJson',
  'note',
];

const productSheetExampleRow = [
  'prod_001',
  'brand_xxx',
  '品牌中文名',
  'Brand English Name',
  'treadmill',
  '跑步机',
  'Treadmill',
  '商品名（中）',
  'Product Name',
  '副标题（中）',
  'Subtitle (EN)',
  '精选',
  'Selected',
  '1999',
  '120',
  '264',
  'https://.../1.webp,https://.../2.webp,https://.../3.webp',
  '商品简介（中）',
  'Description (EN)',
  '[{\"key\":\"version\",\"label\":\"版本\",\"options\":[{\"value\":\"std\",\"label\":\"标准版\"}]}]',
  '[{\"id\":\"prod_002\",\"name\":\"...\",\"image\":\"https://...\"}]',
  'imagesCsv 用逗号分隔；其余复杂字段用 JSON',
];

const partnersSheetHeaders = ['partnerName', 'logoUrl', 'altZh', 'altEn', 'usagePagesCsv', 'note'];
const partnersSheetExampleRow = [
  'Nike',
  'https://.../nike.svg',
  '耐克',
  'Nike',
  '/,/hot-stores,/about,/contact',
  '建议提供 SVG 或透明底 PNG',
];

const i18nSheetHeaders = ['key', 'zh', 'en', 'page', 'section', 'note'];
const i18nSheetExampleRows = [
  ['home.hero.titleLeft', '全球运动健身', 'Global Sports & Fitness', '/', 'Hero', ''],
  ['home.brands.title', 'ABLAZING的合作伙伴遍布全球', 'ABLAZING partners worldwide', '/', 'Brands', ''],
  ['cta.consultNow', '立即咨询', 'Consult Now', '全站', 'CTA', ''],
];

ensureDir(docsDir);

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, makeSheetFromRows(sectionSheetRows), '页面区块素材');
XLSX.utils.book_append_sheet(wb, makeSheetFromRows([brandSheetHeaders, brandSheetExampleRow]), '品牌库');
XLSX.utils.book_append_sheet(wb, makeSheetFromRows([productSheetHeaders, productSheetExampleRow]), '商品库');
XLSX.utils.book_append_sheet(wb, makeSheetFromRows([partnersSheetHeaders, partnersSheetExampleRow]), '合作伙伴Logo');
XLSX.utils.book_append_sheet(wb, makeSheetFromRows([i18nSheetHeaders, ...i18nSheetExampleRows]), '文案i18n');

XLSX.writeFile(wb, outFile, { compression: true });

console.log(outFile);
