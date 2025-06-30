import { computed, onMounted, ref } from 'vue'
import { STORAGE_KEYS, THEMES } from '@/constants.js'
///
const theme = ref(localStorage.getItem(STORAGE_KEYS['current-theme']) || THEMES.light)
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
