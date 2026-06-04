const fs = require('fs');

const file = 'src/pages/HotStores.tsx';
let code = fs.readFileSync(file, 'utf8');

// Fix displayBrands
code = code.replace(
  /const displayBrands = apiBrands.length > 0 \? apiBrands.map\(b => \(\{[\s\S]*?\}\)\) : mockBrands;/,
  `const sourceBrands = apiBrands.length > 0 ? apiBrands : mockBrands;
  const displayBrands = sourceBrands.map(b => ({
    id: b.id,
    name: b.name,
    logo: b.logoUrl || '',
    subtitle: b.subtitle || '',
    video: b.videoUrl || '',
    videoPc: b.videoUrl || '',
    videoMobile: b.videoUrl || '',
    cardImage: b.coverImageUrl || ''
  }));`
);

// Fix staticFallbackBrand and activeBrand
code = code.replace(
  /const staticFallbackBrand = mockBrands\[0\];[\s\S]*?\} : \(mockBrands.find\(b => b.id === activeBrandId\) \|\| staticFallbackBrand\);/,
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

// Fix unused makeLogoDataUri by exporting it from mallData.ts and removing from HotStores.tsx
code = code.replace(/  const makeLogoDataUri = \(text: string\) =>[\s\S]*?\}\)`;/, '');

fs.writeFileSync(file, code);
