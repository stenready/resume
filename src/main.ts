import './assets/main.scss'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ViteSSG } from 'vite-ssg/single-page'
import { i18n } from '@/plugins/i18n'
import '@/plugins/icons'
import App from './App.vue'

export const createApp = ViteSSG(App, ({ app }) => {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
  app.use(i18n)
})
