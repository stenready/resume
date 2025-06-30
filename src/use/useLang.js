import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { STORAGE_KEYS } from '@/constants.js'

export default function useLanguage() {
  const { locale, availableLocales } = useI18n()
  ///
  onMounted(() => {
    locale.value = localStorage.getItem(STORAGE_KEYS['current-locale']) || locale?.value
  })
  ///
  const onChangeLocale = () => {
    locale.value =
      availableLocales.find((iterLocale) => iterLocale !== locale.value) || locale.value
    localStorage.setItem(STORAGE_KEYS['current-locale'], locale.value)
  }

  return { appLocale: locale, onChangeLocale }
}
