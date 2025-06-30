import './assets/main.scss'

//icons
import { FontAwesomeIcon } from '/@fortawesome/vue-fontawesome'

///

import { i18n } from '/plugins/i18n.js'
import '/plugins/icons.js'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(i18n).mount('#app')
