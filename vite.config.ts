import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// تشخیص محیط: بررسی متغیر محیطی
const isDeploy = process.env.GITHUB_ACTIONS === 'true' || process.env.DEPLOY_TARGET === 'gh-pages';

export default defineConfig({
  base: isDeploy ? '/smart-vet/' : '/',
  plugins: [react()],
})