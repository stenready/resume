import './assets/main.scss'

//icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

///

import { i18n } from '@/plugins/i18n.js'
import '@/plugins/icons.js'

import { ViteSSG } from 'vite-ssg/single-page'
import App from './App.vue'

export const createApp = ViteSSG(App, ({ app }) => {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
  app.use(i18n)
})
