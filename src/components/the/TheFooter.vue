<template>
  <footer data-component-name="TheFooter" class="TheFooter">
    <div>{{ t('footerText') }}</div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped lang="scss">
.TheFooter {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 1.5rem;
  background: var(--card-bg);
  border-top: 1px solid var(--border);
}
</style>
