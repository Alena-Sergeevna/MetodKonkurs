import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// GitHub Pages: https://alena-sergeevna.github.io/MetodKonkurs/
export default defineConfig({
  plugins: [vue()],
  base: '/MetodKonkurs/',
})
