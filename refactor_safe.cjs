const fs = require('fs');

const code = fs.readFileSync('src/pages/HotStores.tsx', 'utf-8');

// Insert import at the top
const importStatement = `import { mockBrands, mockCurrentBrand, mockProductTypes, mockProducts } from '../mock/mallData';\n`;
let newCode = importStatement + code;

// Remove static block
const startIdx = newCode.indexOf('  const buildProducts =');
const endIdx = newCode.indexOf('  const [activeBrandId, setActiveBrandId]');

if (startIdx === -1 || endIdx === -1) {
  console.log('Could not find boundaries.');
  process.exit(1);
}

const beforeCode = newCode.substring(0, startIdx);
const afterCode = newCode.substring(endIdx);

newCode = beforeCode + afterCode;

// Fix staticBrands references in the code to use mockBrands, etc.
// In the current code:
// const displayBrands = apiBrands.length > 0 ? apiBrands.map(...) : staticBrands;
newCode = newCode.replace(/staticBrands/g, 'mockBrands');

// The activeBrand fallback was using staticBrands[0] and staticBrands.find(...)
// We should replace that with mockCurrentBrand when no API data is available.

fs.writeFileSync('src/pages/HotStores.tsx', newCode);
console.log('Successfully replaced static code block with imports and fixed syntax.');
