<template>
  <div data-component-name="ExperienceSection" class="ExperienceSection">
    <div class="ExperienceSection-title">
      <FontAwesomeIcon icon="fa-solid fa-trophy" />
      {{ t('myExperience') }}
    </div>

    <div class="ExperienceSection-list-items">
      <article
        class="ExperienceSection-card-item"
        v-for="listItem of experienceList"
        :key="listItem?.id"
      >
        <div class="header-card">
          <span class="title-card"> {{ listItem?.title }} </span>

          <span class="date">{{ listItem?.dateStr }}</span>
        </div>

        <div class="position">{{ listItem?.position }}</div>

        <a
          target="_blank"
          v-if="listItem?.link"
          class="base-link link-company"
          href="https://planetakino.ua/"
          >PlanetaKino</a
        >

        <div class="desc">
          {{ listItem?.description }}
        </div>

        <div class="stack-wrap" v-if="listItem?.labels?.length">
          <span class="bold tech-stack"> {{ t('techStack') }}: </span>

          <ul class="technology-list">
            <li class="technology-item" v-for="(label, idx) of listItem.labels || []" :key="idx">
              <div class="label-item">
                {{ label }}
              </div>
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const experienceList = computed(() => {
  return [
    {
      id: crypto.randomUUID(),
      title: t('planetaKino'),
      link: 'https://planetakino.ua/',
      dateStr: t('date1'),
      position: t('position'),
      description: t('desc1'),
      labels: [
        'Vue',
        'Nuxt',
        'JavaScript',
        'Tailwind CSS',
        'Vuexy',
        'BootstrapVue',
        'Axios',
        'GraphQL',
        'REST',
        'WebSockets',
        'AWS',
        'Electron',
        'Payment terminals',
        'Vchasno PRRO',
        'HLS',
        'Video.js',
      ],
    },
    {
      id: crypto.randomUUID(),
      title: t('vJetGroup'),
      dateStr: t('date2'),
      position: t('frontEndDeveloper'),
      description: t('desc2'),
      labels: [
        'Nuxt.js',
        'Vue.js',
        'REST APIs',
        'SCSS',
        'Vuetify',
        'BootstrapVue',
        'WebSockets',
        'Google Maps',
        'i18n',
      ],
    },
    {
      id: crypto.randomUUID(),
      title: t('quartSoft'),
      dateStr: t('date3'),
      position: t('frontEndDeveloper'),
      description: t('desc3'),
      labels: ['Nuxt.js', 'Leaflet (interactive maps)', 'SCSS', 'REST APIs', 'Vanilla JavaScript'],
    },
    {
      id: crypto.randomUUID(),
      title: t('foxprimeTv'),
      dateStr: t('date4'),
      position: t('frontEndDeveloper'),
      description: t('desc4'),
      labels: [
        'Nuxt.js',
        'WebSockets',
        'SEO optimization',
        'GraphQL',
        'HLS',
        'Video.js',
        'Custom Vue components',
        'JavaScript',
        'REST APIs',
        'SCSS',
      ],
    },
  ]
})
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

.ExperienceSection {
  margin: 4rem auto 0 auto;
  max-width: 50rem;

  .label-item {
    background-color: rgba(30, 144, 255, 0.15);
    color: var(--accent);
    padding: 6px 14px;
    border-radius: 1rem;
    font-size: 0.85rem;
    font-weight: 600;
    user-select: none;
    transition: background-color 0.3s ease;
    width: fit-content;
  }

  .ExperienceSection-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .ExperienceSection-list-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .ExperienceSection-card-item {
      border-left: 6px solid var(--accent);
      border-radius: 12px;
      background: var(--card-bg);
      padding: 28px 24px;
      box-shadow: 0 6px 12px var(--shadow-light);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition:
        box-shadow 0.35s ease,
        transform 0.3s ease;
      cursor: default;

      .header-card {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title-card {
          color: var(--accent);
          font-weight: 700;
          font-size: 1.8rem;
        }
      }

      .date,
      .position {
        color: var(--position-color);
        font-size: 0.9rem;
        font-weight: 700;
      }

      .position,
      .link-company {
        margin-top: 0.2rem;
      }

      .desc {
        font-size: 1rem;
        color: var(--text);
        margin-top: 1rem;
        line-height: 1.5;
      }

      &:hover {
        box-shadow: 0 20px 40px var(--shadow-light);
        transform: translateY(-10px);
        border-left: 6px solid var(--accent2);

        .label-item {
          background-color: var(--accent);
          color: #fff;
        }
      }
    }
  }

  .tech-stack {
    color: var(--text);
  }

  .stack-wrap {
    margin-top: 0.8rem;

    .technology-list {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
  }

  @include maxWidth(1024) {
    margin: 1rem 0;
    max-width: 100% !important;

    .ExperienceSection-title {
      font-size: 1.7rem;
      text-align: center;
      justify-content: center;
    }
    .fa-trophy {
      display: none;
    }

    .ExperienceSection-card-item {
      opacity: 0.9;

      .desc {
        font-size: 1.25rem !important;
      }
    }

    .header-card {
      align-items: baseline !important;
      flex-direction: column;
      gap: 5px;

      .date,
      .position {
        margin-bottom: 5px;
      }
    }

    .title-card {
      font-size: 2rem !important;
    }

    .date,
    .tech-stack,
    .label-item,
    .position,
    .link-company {
      font-size: 1.25rem !important;
    }

    .ExperienceSection-list-items {
      gap: 1rem;
    }
  }
}
</style>
