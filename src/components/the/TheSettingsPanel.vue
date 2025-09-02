<template>
  <div data-component-name="TheSettingsPanel" class="TheSettingsPanel">
    <BaseButton id="theme-btn" aria-label="theme" @click="onChangeTheme" size="small" type="main">
      <template #icon>
        {{ getCurrentTheme?.themeIcon }}
      </template>
    </BaseButton>

    <BaseButton id="lang-btn" aria-label="lang" @click="onChangeLocale" size="small" type="main">
      <div class="to-uppercase font-500">
        {{ appLocale }}
      </div>
    </BaseButton>

    <!--    //bg actions-->
    <BaseButton
      v-for="(bgItem, idx) of bgList"
      :key="bgItem?.id"
      :aria-label="`bg ${idx + 1}`"
      :id="`bg ${idx + 1}`"
      class="bg-btn"
      :class="[{ active: bgItem?.isActive }]"
      size="small"
      type="main"
      @click="setActive(bgItem)"
    >
      <div
        class="to-uppercase image-wrap font-500"
        :style="{ backgroundImage: `url('${bgItem?.urlImage}')` }"
      ></div>
    </BaseButton>
  </div>
</template>

<script setup>
//imports
import { defineAsyncComponent } from 'vue'
import useTheme from '@/use/useTheme.js'
import useLanguage from '@/use/useLang.js'
import useBg from '@/use/useBg.js'

//components
const BaseButton = defineAsyncComponent(() => import('@/components/app/BaseButton.vue'))

/// hooks custom
const { onChangeTheme, getCurrentTheme } = useTheme()
const { appLocale, onChangeLocale } = useLanguage()
const { setActive, bgList } = useBg()
</script>

<style lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

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

  .bg-btn {
    &.BaseButton {
      padding: 0 !important;
      box-shadow: none;

      .image-wrap {
        width: 100%;
        height: 100%;
        background-position: center;
      }

      &.active {
        outline: 4px solid var(--accent);
      }
    }
  }

  @include maxWidth(1024) {
    transform: translateX(-50%);
    left: 50%;
    top: 8.5rem;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  @include minWidth(470) {
    top: 7rem;
  }

  @include minWidth(579) {
    top: 5rem;
  }
}
</style>
