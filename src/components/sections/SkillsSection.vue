<template>
  <div data-component-name="SkillsSection" class="SkillsSection">
    <div class="SkillsSection-title">
      <FontAwesomeIcon icon="fa-brands fa-dev" />

      {{ t('skills') }}
    </div>

    <dl class="skill-groups">
      <div v-for="(group, groupIdx) of tm('skillGroups')" :key="groupIdx" class="skill-group">
        <dt class="group-title">{{ rt(group.title) }}</dt>

        <dd class="group-items">
          <ul class="items-list">
            <li v-for="(item, itemIdx) of group.items" :key="itemIdx" class="label-item">
              {{ rt(item) }}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

$groupTitleWidth: 13rem;

.SkillsSection {
  margin: 4rem auto 0 auto;
  max-width: 50rem;

  .SkillsSection-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .skill-groups {
    margin: 0;
    padding: 1rem 2rem;
    background-color: var(--card-color);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 6px 12px var(--shadow-light);
  }

  .skill-group {
    display: grid;
    grid-template-columns: $groupTitleWidth 1fr;
    gap: 1rem;
    padding: 1rem 0;

    & + .skill-group {
      border-top: 1px solid var(--border);
    }
  }

  .group-title {
    padding-top: 0.2rem;
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
  }

  .group-items {
    margin: 0;
  }

  .items-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0;
  }

  .label-item {
    background-color: rgba(30, 144, 255, 0.15);
    color: var(--accent);
    padding: 4px 12px;
    border-radius: 1rem;
    font-size: 0.9rem;
    font-weight: 600;
  }

  @include maxWidth(1024) {
    margin: 1rem 0;
    max-width: 100% !important;

    .SkillsSection-title {
      font-size: 1.7rem;
      text-align: center;
      justify-content: center;
    }

    .fa-dev {
      display: none;
    }

    .skill-groups {
      opacity: 0.9;
      padding: 0.5rem 1.25rem;
    }

    .skill-group {
      grid-template-columns: 1fr;
      gap: 0.6rem;
    }
  }
}
</style>
