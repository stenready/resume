import { computed, onMounted, ref } from 'vue'
import { STORAGE_KEYS, THEMES } from '@/constants.js'
///
const savedTheme = import.meta.env.SSR ? null : localStorage.getItem(STORAGE_KEYS['current-theme'])
const theme = ref(savedTheme || THEMES.light)
///
const getCurrentTheme = computed(() => {
  const isDark = theme.value === THEMES.dark
  return {
    theme: theme.value,
    isDark: isDark,
    themeIcon: isDark ? '🌞' : '🌙',
  }
})

const onChangeTheme = () => {
  theme.value = getCurrentTheme.value.isDark ? THEMES.light : THEMES.dark
  localStorage.setItem(STORAGE_KEYS['current-theme'], theme.value)
  setThemeToDom()
}

const setThemeToDom = () => {
  document.documentElement.setAttribute('data-theme', theme.value)
}

export default function useTheme() {
  onMounted(() => {
    setThemeToDom()
  })

  return { onChangeTheme, getCurrentTheme, theme }
}
