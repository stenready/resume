<template>
  <div data-component-name="ProjectsSection" class="ProjectsSection">
    <div class="ProjectsSection-title">
      <FontAwesomeIcon icon="fa-solid fa-layer-group" />
      {{ t('projects') }}
    </div>

    <ul class="projects-list">
      <li v-for="project of PROJECTS" :key="project.id" class="project-card">
        <div class="project-meta">{{ t(`projectItems.${project.id}.meta`) }}</div>

        <h3 class="project-title">{{ t(`projectItems.${project.id}.title`) }}</h3>

        <p class="project-summary">{{ t(`projectItems.${project.id}.summary`) }}</p>

        <ul class="project-points">
          <li v-for="(point, pointIdx) of tm(`projectItems.${project.id}.points`)" :key="pointIdx">
            {{ rt(point) }}
          </li>
        </ul>

        <div class="project-result">
          <span class="result-label">{{ t('projectResult') }}:</span>
          {{ t(`projectItems.${project.id}.result`) }}
        </div>

        <ul class="stack" :aria-label="t('techStack')">
          <li v-for="tech of project.stack" :key="tech" class="label-item">{{ tech }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

// texts live in locales under projectItems.<id>
const PROJECTS = [
  {
    id: 'pos',
    stack: ['Electron', 'Vue.js', 'Pinia', 'LiqPay', 'Vchasno PRRO', 'Sentry'],
  },
  {
    id: 'migrations',
    stack: ['Vue 2.7', 'Vue 3', 'Composition API', 'Pinia', 'GraphQL', 'REST'],
  },
  {
    id: 'suite',
    stack: ['Vue.js', 'Nuxt.js', 'Pinia', 'Tailwind CSS', 'Vuexy', 'GraphQL'],
  },
  {
    id: 'auth',
    stack: ['Vue.js', 'Nuxt.js', 'Pinia', 'Axios'],
  },
  {
    id: 'streaming',
    stack: ['Nuxt.js', 'Vue.js', 'Video.js', 'HLS', 'WebSockets', 'GraphQL', 'LiqPay'],
  },
]
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

.ProjectsSection {
  margin: 4rem auto 0 auto;
  max-width: 50rem;

  .ProjectsSection-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .projects-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin: 0;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background-color: var(--card-color);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 6px 12px var(--shadow-light);

    // odd count: stretch the last card to the full row
    &:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    }
  }

  .project-meta {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text);
    opacity: 0.6;
  }

  .project-title {
    margin: 0.4rem 0 0;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text);
  }

  .project-summary {
    margin: 0.6rem 0 0;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text);
  }

  .project-points {
    margin: 0.75rem 0 1rem;

    li {
      position: relative;
      padding-left: 1rem;
      font-size: 0.95rem;
      line-height: 1.55;
      color: var(--text);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.65em;
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 50%;
        background-color: var(--accent);
      }

      & + li {
        margin-top: 0.35rem;
      }
    }
  }

  // pushes result + stack to the bottom so cards in a row line up
  .project-result {
    margin-top: auto;
    padding: 0.6rem 0.9rem;
    border-left: 4px solid var(--accent);
    border-radius: 8px;
    background-color: rgba(30, 144, 255, 0.08);
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.5;
    color: var(--text);

    .result-label {
      color: var(--accent);
    }
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.9rem 0 0;
  }

  .label-item {
    background-color: rgba(30, 144, 255, 0.15);
    color: var(--accent);
    padding: 3px 10px;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  @include maxWidth(1024) {
    margin: 1rem 0;
    max-width: 100% !important;

    .ProjectsSection-title {
      font-size: 1.7rem;
      text-align: center;
      justify-content: center;
    }

    .fa-layer-group {
      display: none;
    }

    .projects-list {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .project-card {
      opacity: 0.9;
      padding: 1.25rem;
    }
  }
}
</style>
