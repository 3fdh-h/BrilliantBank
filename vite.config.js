import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: { //代理配置，解决跨域     
      '/api': {
        // target: 'http://10.176.147.96:8080',
        target: 'http://localhost:8080',
        //获取路径中包含了api的请求       
        changeOrigin: true,   //修改源       
        rewrite: (path) => path.replace(/^\/api/, '') //api替换为'' 
      }
    }
  },
  plugins: [
    vue()
  ]
})


