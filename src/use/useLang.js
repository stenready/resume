import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { STORAGE_KEYS } from '@/constants.js'

export default function useLanguage() {
  const { locale, availableLocales } = useI18n()

  const setLocale = (nextLocale) => {
    locale.value = nextLocale
    document.documentElement.lang = nextLocale
  }

  onMounted(() => {
    const savedLocale = localStorage.getItem(STORAGE_KEYS.LOCALE)

    if (availableLocales.includes(savedLocale)) {
      setLocale(savedLocale)
    }
  })

  const onChangeLocale = () => {
    const nextLocale =
      availableLocales.find((iterLocale) => iterLocale !== locale.value) || locale.value

    setLocale(nextLocale)
    localStorage.setItem(STORAGE_KEYS.LOCALE, nextLocale)
  }

  return { appLocale: locale, onChangeLocale }
}
