import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// @ts-ignore
import { fingguCompiler } from '@finggujadhav/compiler'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    fingguCompiler({
      mode: 'opt',
      include: ['./src/**/*.{tsx,ts}']
    })
  ],
})
