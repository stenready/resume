import { computed, onMounted, ref } from 'vue'
import { STORAGE_KEYS, THEMES, type Theme } from '@/constants'

// starts as light on both server and client so hydration matches; the saved theme is applied on mount
const theme = ref<Theme>(THEMES.light)

const getCurrentTheme = computed(() => {
  const isDark = theme.value === THEMES.dark
  return {
    theme: theme.value,
    isDark: isDark,
    themeIcon: isDark ? '🌞' : '🌙',
  }
})

const setThemeToDom = () => {
  document.documentElement.setAttribute('data-theme', theme.value)
}

const onChangeTheme = () => {
  theme.value = getCurrentTheme.value.isDark ? THEMES.light : THEMES.dark
  localStorage.setItem(STORAGE_KEYS.THEME, theme.value)
  setThemeToDom()
}

export default function useTheme() {
  onMounted(() => {
    theme.value =
      localStorage.getItem(STORAGE_KEYS.THEME) === THEMES.dark ? THEMES.dark : THEMES.light
    setThemeToDom()
  })

  return { onChangeTheme, getCurrentTheme, theme }
}
