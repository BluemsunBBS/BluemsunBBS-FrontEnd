import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    preprocessorOptions:{
      less:{
        javascriptEnabled: true,  //注意，这一句是在less对象中，写在外边不起作用
      }
    }
  },
  build:{
    chunkSizeWarningLimit: 20000,
  }
})
