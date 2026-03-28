import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor'
            }
            if (id.includes('lucide-react')) {
              return 'ui'
            }
            if (id.includes('graphql-request')) {
              return 'shopify'
            }
            if (id.includes('framer-motion')) {
              return 'animation'
            }
          }
        },
      },
    },
  },
})
