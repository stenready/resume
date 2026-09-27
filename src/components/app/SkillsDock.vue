<template>
  <ul data-component-name="SkillsDock" class="SkillsDock" :aria-label="t('techStack')">
    <li
      v-for="skill of MOBILE_DOCK_SKILLS"
      :key="skill.label"
      :data-skill-dock="skill.label"
      class="dock-item"
      :class="{ 'is-docked': dockedSkills.has(skill.label) }"
    >
      <svg v-if="skill.path" viewBox="0 0 24 24" class="dock-icon" aria-hidden="true">
        <path :d="skill.path" />
      </svg>
      {{ skill.label }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { MOBILE_DOCK_SKILLS, dockedSkills } from '@/use/useBg'

const { t } = useI18n()
</script>

<style scoped lang="scss">
@use '@/assets/mixins' as *;

// sizes mirror ROW_ICON_SIZE / ROW_ICON_GAP / ROW_FONT_SIZE in BgSkills.vue,
// so the canvas row lands exactly on top of its DOM twin
$iconSize: 20px;
$iconGap: 8px;
$fontSize: 13px;

.SkillsDock {
  display: none;

  @include maxWidth(767) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem 1rem;
    margin: 1rem 0 0;
  }
}

.dock-item {
  display: inline-flex;
  align-items: center;
  gap: $iconGap;
  height: $iconSize;
  font-size: $fontSize;
  font-weight: 700;
  line-height: $iconSize;
  color: var(--accent);
  opacity: 0;

  &.is-docked {
    opacity: 1;
  }
}

.dock-icon {
  width: $iconSize;
  height: $iconSize;
  fill: currentColor;
}
</style>
