<template>
  <div data-component-name="TheSettingsPanel" class="TheSettingsPanel">
    <BaseButton
      id="theme-btn"
      :aria-label="getCurrentTheme.isDark ? t('lightTheme') : t('darkTheme')"
      @click="onChangeTheme"
      size="small"
    >
      <template #icon>
        {{ getCurrentTheme.themeIcon }}
      </template>
    </BaseButton>

    <BaseButton
      id="lang-btn"
      :aria-label="t('languageSwitch', { locale: appLocale })"
      @click="onChangeLocale"
      size="small"
    >
      <div class="to-uppercase font-500">
        {{ appLocale }}
      </div>
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useTheme from '@/use/useTheme'
import useLanguage from '@/use/useLang'
import BaseButton from '@/components/app/BaseButton.vue'

const { t } = useI18n()
const { onChangeTheme, getCurrentTheme } = useTheme()
const { appLocale, onChangeLocale } = useLanguage()
</script>

<style lang="scss">
@use '@/assets/vars' as *;

.TheSettingsPanel {
  display: flex;
  flex-shrink: 0;
  gap: 0.4rem;

  .BaseButton {
    width: $headerLogoHeight;
    height: $headerLogoHeight;
    padding: 0;
    font-size: 1rem;
  }
}
</style>
