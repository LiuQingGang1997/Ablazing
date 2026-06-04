const fs = require('fs');

const file = 'src/pages/HotStores.tsx';
let code = fs.readFileSync(file, 'utf8');

// 1. Insert import
code = `import { mockBrands, mockCurrentBrand, mockProductTypes, mockProducts } from '../mock/mallData';\n` + code;

// 2. Remove makeLogoDataUri
const makeLogoStart = code.indexOf('  const makeLogoDataUri = (text: string) =>');
const makeLogoEnd = code.indexOf('    )}`;', makeLogoStart) + 8;
if (makeLogoStart !== -1 && makeLogoEnd > 8) {
  code = code.substring(0, makeLogoStart) + code.substring(makeLogoEnd);
}

// 3. Remove buildProducts, brandCatalogMap, staticBrands
const staticStart = code.indexOf('  const buildProducts =');
const staticEnd = code.indexOf('  const [activeBrandId, setActiveBrandId] = useState');
if (staticStart !== -1 && staticEnd !== -1) {
  code = code.substring(0, staticStart) + code.substring(staticEnd);
}

// 4. Fix displayBrands
code = code.replace(
  /const displayBrands = apiBrands.length > 0 \? apiBrands.map\([\s\S]*?\}\)\) : staticBrands;/,
  `const sourceBrands = apiBrands.length > 0 ? apiBrands : mockBrands;
  const displayBrands = sourceBrands.map(b => ({
    id: b.id,
    name: b.name,
    logo: b.logoUrl || '',
    subtitle: (b as any).subtitle || '',
    video: (b as any).videoUrl || '',
    videoPc: (b as any).videoUrl || '',
    videoMobile: (b as any).videoUrl || '',
    cardImage: (b as any).coverImageUrl || ''
  }));`
);

// 5. Fix activeBrand
code = code.replace(
  /const staticFallbackBrand = staticBrands\[0\];[\s\S]*?\} : \(staticBrands.find\(b => b.id === activeBrandId\) \|\| staticFallbackBrand\);/,
  `const fallbackCurrentBrand = mockCurrentBrand;
  const currentBrandData = apiCurrentBrand || fallbackCurrentBrand;
  const activeBrand = {
    id: currentBrandData.id,
    name: currentBrandData.name || '',
    title: currentBrandData.title || currentBrandData.name || '',
    subtitle: currentBrandData.subtitle || '',
    description: currentBrandData.description || '',
    logo: currentBrandData.logoUrl || '',
    foundedYear: currentBrandData.foundedYear || 2000,
    overview: currentBrandData.overview || '',
    metrics: currentBrandData.metrics || [],
    highlights: currentBrandData.highlights || [],
    productTypes: (apiProductTypes.length > 0 ? apiProductTypes : mockProductTypes).map(t => ({
      id: String(t.id),
      zh: t.name || t.typeName || '',
      en: t.enName || '',
      image: t.image || t.imageUrl || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
      focusTitle: t.focusTitle || '',
      focusSubtitle: t.focusSubtitle || '',
      focusDesc: t.focusDesc || ''
    })),
    heroImagePc: currentBrandData.coverImageUrl || '',
    heroImageMobile: currentBrandData.coverImageUrl || '',
    videoPc: currentBrandData.videoUrl || '',
    videoMobile: currentBrandData.videoUrl || '',
    video: currentBrandData.videoUrl || '',
    heroImage: currentBrandData.coverImageUrl || '',
    cardImage: currentBrandData.coverImageUrl || ''
  };`
);

// 6. Fix activeCatalog usages
code = code.replace(
  /const activeCatalog =[\s\S]*?\} as BrandCatalog\);/,
  ''
);

code = code.replace(
  /const displayProducts = apiProducts.length > 0 \? apiProducts.map\([\s\S]*?\}\)\) : activeCatalog.products;/,
  `const sourceProducts = apiProducts.length > 0 ? apiProducts : mockProducts;
  const displayProducts = sourceProducts.map(p => ({
    id: String(p.id),
    name: p.name || '',
    subtitle: p.subtitle || '',
    image: p.coverImageUrl || p.image || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&h=900&fit=crop',
    categoryId: String(p.typeId),
    tag: p.tag || undefined,
    weightKg: p.weightKg || undefined,
    weightLb: p.weightLb || undefined,
    priceUsd: p.price || 0,
    attrs: p.parameters || {},
    sceneId: String(p.sceneId)
  }));`
);

// 7. Fix dynamic filter extraction to use sourceProducts
code = code.replace(
  /if \(apiProducts.length > 0\) \{/,
  `if (sourceProducts.length > 0) {`
);
code = code.replace(
  /apiProducts.forEach\(p => \{/,
  `sourceProducts.forEach(p => {`
);

code = code.replace(
  /const categoryOptions: Option\[\] = apiProducts.length > 0 \? typeOptions : \[[\s\S]*?\];/,
  `const categoryOptions: Option[] = typeOptions;`
);

code = code.replace(
  /const dynamicFilters = apiProducts.length > 0 \? \[\] : \([\s\S]*?\);/,
  ''
);

code = code.replace(
  /const filterDefs: FilterDef\[\] = apiProducts.length > 0 \? \[[\s\S]*?\] : \[[\s\S]*?\];/,
  `const filterDefs: FilterDef[] = [
    { key: 'category', label: '产品类型', options: typeOptions },
    ...(sceneOptions.length > 1 ? [{ key: 'scene', label: '场景', options: sceneOptions }] : []),
    ...Object.entries(paramOptionsMap).map(([k, opts]) => ({ key: \`param_\$\{k\}\`, label: k, options: opts }))
  ];`
);

code = code.replace(
  /if \(apiProducts.length > 0\) \{[\s\S]*?\} else \{[\s\S]*?\}/,
  `if (productFilters.scene && productFilters.scene !== 'all' && p.sceneId !== productFilters.scene) return false;
      for (const k of Object.keys(paramOptionsMap)) {
        const sel = productFilters[\`param_\$\{k\}\`] ?? 'all';
        if (sel === 'all') continue;
        if ((p.attrs?.[k] ?? '') !== sel) return false;
      }`
);

// 8. Fix UI rendering usages of activeCatalog
code = code.replace(/\{activeCatalog.title\}/g, `{activeBrand.title || '提供多元、个性、潮流的训练方式'}`);
code = code.replace(/\{activeCatalog.description\}/g, `{activeBrand.description || '根据不同品牌与品类展示对应的产品清单。'}`);
code = code.replace(/activeCatalog.products/g, `displayProducts`);
code = code.replace(/activeCatalog.description/g, `(activeBrand.description || '根据不同品牌与品类展示对应的产品清单。')`);

fs.writeFileSync(file, code);
console.log('Refactoring complete.');
