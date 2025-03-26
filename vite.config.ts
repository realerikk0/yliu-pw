import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,  // 保留控制台日志用于调试
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        // 移除了有问题的 manualChunks 配置
        // 静态资源文件名格式
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  // 预览服务器配置
  preview: {
    port: 4173,
    open: true
  }
})