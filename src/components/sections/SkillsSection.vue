<template>
  <div data-component-name="SkillsSection" class="SkillsSection">
    <div class="SkillsSection-title">
      <FontAwesomeIcon icon="fa-brands fa-dev" />

      {{ t('skills') }}
    </div>

    <ul class="list-items">
      <li class="item-skill" v-for="skillItem of listOfSkills" :key="skillItem?.id">
        <FontAwesomeIcon v-if="skillItem?.icon" :icon="skillItem?.icon" />

        {{ skillItem?.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

import { reactive } from 'vue'

const { t } = useI18n()

const listOfSkills = reactive([
  { id: crypto.randomUUID(), title: 'HTML5', icon: 'fa-brands fa-html5' },
  { id: crypto.randomUUID(), title: 'CSS3', icon: 'fa-brands fa-css' },
  { id: crypto.randomUUID(), title: 'Scss', icon: 'fa-brands fa-sass' },
  { id: crypto.randomUUID(), title: 'JavaScript', icon: 'fa-brands fa-js' },
  { id: crypto.randomUUID(), title: 'TypeScript', icon: '' },
  { id: crypto.randomUUID(), title: 'Vue', icon: 'fa-brands fa-vuejs' },
  { id: crypto.randomUUID(), title: 'Nuxt', icon: '' },
  { id: crypto.randomUUID(), title: 'Tailwind CSS', icon: '' },
  { id: crypto.randomUUID(), title: 'Vuetify', icon: '' },
  { id: crypto.randomUUID(), title: 'Bootstrap Vue', icon: 'fa-brands fa-bootstrap' },
  { id: crypto.randomUUID(), title: 'WebSockets', icon: '' },
  { id: crypto.randomUUID(), title: 'Git', icon: 'fa-brands fa-github' },
  { id: crypto.randomUUID(), title: 'GraphQL', icon: 'fa-solid fa-diagram-project' },
  { id: crypto.randomUUID(), title: 'Rest API', icon: '' },
  { id: crypto.randomUUID(), title: 'Electron', icon: 'fa-solid fa-atom' },
  { id: crypto.randomUUID(), title: 'Video.js', icon: 'fa-solid fa-film' },
  { id: crypto.randomUUID(), title: 'Axios', icon: '' },
  { id: crypto.randomUUID(), title: 'Node.js', icon: 'fa-brands fa-node-js' },
])
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

.SkillsSection {
  margin: 4rem auto 0 auto;
  max-width: 50rem;

  .SkillsSection-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .list-items {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    margin: 0 auto;

    .item-skill {
      background: var(--card-bg);
      border: 1px solid var(--border);
      box-shadow: 0 4px 10px var(--shadow-light);
      padding: 1.5rem 1rem;
      border-radius: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        background-color 0.3s ease;
      cursor: default;
      gap: 10px;

      font-weight: 600;
      color: var(--text);
      font-size: 1.5rem;
      user-select: none;
      text-align: center;

      &:hover {
        transform: translateY(-6px) scale(1.03);
        box-shadow: 0 12px 30px var(--shadow-light);
        background-color: rgba(30, 144, 255, 0.4);
      }

      svg {
        font-size: 1.8rem;
      }
    }
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

    .list-items {
      opacity: 0.9;
      gap: 1rem;
    }
  }
}
</style>
