import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(),  svgLoader()],
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096, // файлы меньше 4 КБ инлайнятся в JS
    chunkSizeWarningLimit: 1500, // лимит предупреждения о размере чанка
    rollupOptions: {
      output: {
        // Кастомные имена чанков
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks: {
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
        arrows: true, // оптимизация стрелочных функций
        booleans: true, // оптимизация булевых значений
        collapse_vars: true, // сворачивание переменных
        comparisons: true, // оптимизация сравнений
        dead_code: true, // удаление мертвого кода
        evaluate: true, // вычисление константных выражений
        hoist_funs: true, // подъем объявлений функций
        hoist_props: true, // оптимизация свойств объектов
        join_vars: true, // объединение var
        loops: true, // оптимизация циклов
        reduce_funcs: true, // удаление неиспользуемых функций
        reduce_vars: true, // удаление неиспользуемых переменных
        sequences: true, // объединение выражений
        side_effects: true, // удаление вызовов без побочных эффектов
        switches: true, // оптимизация switch
        unused: true, // удаление неиспользуемого кода
        passes: 2,
      },
      format: {
        comments: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
