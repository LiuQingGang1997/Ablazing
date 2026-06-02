const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve(__dirname, '../XindDongAdmin');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. Backend setup
const backendDir = path.join(targetDir, 'backend');
const backendSrcDir = path.join(backendDir, 'src');
fs.mkdirSync(backendSrcDir, { recursive: true });

fs.writeFileSync(path.join(backendDir, 'package.json'), JSON.stringify({
  name: "xinddong-admin-backend",
  version: "1.0.0",
  main: "src/index.ts",
  scripts: {
    "start": "ts-node src/index.ts",
    "dev": "nodemon src/index.ts"
  },
  dependencies: {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2"
  },
  devDependencies: {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.12.7",
    "nodemon": "^3.1.0",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  }
}, null, 2));

fs.writeFileSync(path.join(backendDir, 'tsconfig.json'), JSON.stringify({
  compilerOptions: {
    target: "ES2022",
    module: "CommonJS",
    rootDir: "./src",
    outDir: "./dist",
    esModuleInterop: true,
    strict: true,
    skipLibCheck: true,
    forceConsistentCasingInFileNames: true
  },
  include: ["src/**/*"]
}, null, 2));

fs.writeFileSync(path.join(backendSrcDir, 'index.ts'), `import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'XindDongAdmin Backend is running!' });
});

app.listen(port, () => {
  console.log(\`Backend Server is running at http://localhost:\${port}\`);
});
`);

console.log('Backend files created.');

// 2. Frontend setup via vite
try {
  console.log('Creating frontend...');
  execSync('npx create-vite frontend --no-interactive --template react-ts', { cwd: targetDir, stdio: 'inherit' });
  console.log('Installing frontend dependencies (antd, react-router-dom, tailwind)...');
  execSync('npm install', { cwd: path.join(targetDir, 'frontend'), stdio: 'inherit' });
  execSync('npm install antd react-router-dom @ant-design/icons axios', { cwd: path.join(targetDir, 'frontend'), stdio: 'inherit' });
  execSync('npm install -D tailwindcss postcss autoprefixer', { cwd: path.join(targetDir, 'frontend'), stdio: 'inherit' });
  execSync('npx --yes tailwindcss init -p', { cwd: path.join(targetDir, 'frontend'), stdio: 'inherit' });
} catch (e) {
  console.error('Error creating frontend:', e.message);
}

// 3. Install backend dependencies
try {
  console.log('Installing backend dependencies...');
  execSync('npm install', { cwd: backendDir, stdio: 'inherit' });
} catch (e) {
  console.error('Error installing backend deps:', e.message);
}

// 4. Create Root README
fs.writeFileSync(path.join(targetDir, 'README.md'), `# XindDongAdmin

This is the admin dashboard for the XingDongTest project.
It is a separated Frontend/Backend architecture.

## Frontend
- React + Vite + TypeScript
- Ant Design & Tailwind CSS
- \`cd frontend && npm run dev\`

## Backend
- Node.js + Express + TypeScript
- \`cd backend && npm run dev\`
`);

console.log('Project XindDongAdmin created successfully.');
