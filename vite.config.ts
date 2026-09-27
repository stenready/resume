import { fileURLToPath, URL } from 'node:url'

import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

const GOATCOUNTER_ENDPOINT = 'https://sten-ready.goatcounter.com/count'

const goatCounter = (): Plugin => ({
  name: 'goatcounter',
  apply: 'build',
  transformIndexHtml: () => [
    {
      tag: 'script',
      attrs: {
        'data-goatcounter': GOATCOUNTER_ENDPOINT,
        async: true,
        src: 'https://gc.zgo.at/count.js',
      },
      injectTo: 'body',
    },
  ],
})

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [vue(), vueDevTools(), svgLoader(), goatCounter()],
  base: './',
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
    assetsInlineLimit: 4096, // файлы меньше 4 КБ инлайнятся в JS
    chunkSizeWarningLimit: 1500, // лимит предупреждения о размере чанка
    rollupOptions: {
      output: {
        // Кастомные имена чанков
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: isSsrBuild
          ? undefined
          : {
              // Разделение vendor-чанков
              vue: ['vue'],
            },
      },
    },
    minify: 'terser', // или 'esbuild'
    terserOptions: {
      compress: {
        drop_console: true, // удаляем console.log в продакшене
        drop_debugger: true,
        passes: 2,
      },
    },
  },
  define: {
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
  ssr: {
    noExternal: ['vue-i18n', /^@intlify\//],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
