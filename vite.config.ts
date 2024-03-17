import path from 'node:path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// @see https://unocss.dev/
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [uni(), UnoCSS()],
  resolve: {
    alias: {
      '@': path.join(process.cwd(), './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    hmr: true,
    port: 9900,
  },
})
