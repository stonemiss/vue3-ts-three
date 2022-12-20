import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    open: true, //自动打开浏览器
    cors: true  // 为开发服务器配置 CORS。默认启用并允许任何源
  },
  // pluginOptions: {
  //     'style-resources-loader': {
  //         preProcessor: 'scss',
  //         patterns: []
  //     }
  // }
})
