import { createI18n } from 'vue-i18n'

import en from '@/locales/en.json'
import uk from '@/locales/uk.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    uk,
  },
})
