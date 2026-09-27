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
@use '@/assets/mixins' as *;

$settingsPanelTopMobile: 4rem;

.TheSettingsPanel {
  position: fixed;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  top: 1.9rem;
  z-index: 10;

  .BaseButton {
    width: 40px;
    height: 40px;

    @include maxWidth(1120) {
      width: 30px;
      height: 30px;
    }
  }

  @include minWidth(1025) {
    top: 4.25rem;
  }

  @include maxWidth(1024) {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: $settingsPanelTopMobile;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
}
</style>
