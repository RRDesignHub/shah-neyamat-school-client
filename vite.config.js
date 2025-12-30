import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks(id) {
  //         if (id.includes('node_modules')) {
  //           // Group node_modules dependencies into separate chunks
  //           return id.split('node_modules/')[1].split('/')[0];
  //         }
  //       },
  //     },
  //   },
  //   chunkSizeWarningLimit: 1000, // Adjust warning limit to 1000 kB (optional)
  // },
})
