<template>
  <div data-component-name="PublicProjectsSection" class="PublicProjectsSection">
    <h2 class="PublicProjectsSection-title">
      <FontAwesomeIcon icon="fa-solid fa-globe" />
      {{ t('publicProjects') }}
    </h2>

    <ul class="public-list">
      <li v-for="project of PUBLIC_PROJECTS" :key="project.id" class="public-card">
        <a
          :href="project.links[0].url"
          v-bind="EXTERNAL_LINK_ATTRS"
          class="cover-link"
          tabindex="-1"
        >
          <img
            v-if="project.img"
            :alt="t(`publicProjectItems.${project.id}.title`)"
            :src="project.img"
            :style="{ objectPosition: project.imgPosition }"
            class="img"
            loading="lazy"
            decoding="async"
          />
          <div v-else class="cover" aria-hidden="true">
            <FontAwesomeIcon :icon="project.coverIcon" />
          </div>
        </a>

        <div class="public-body">
          <div class="public-meta">
            {{ t(`publicProjectItems.${project.id}.meta`) }}
            <span v-if="project.inDevelopment" class="status">{{ t('inDevelopment') }}</span>
          </div>

          <h3 class="public-title">{{ t(`publicProjectItems.${project.id}.title`) }}</h3>

          <p class="public-summary">{{ t(`publicProjectItems.${project.id}.summary`) }}</p>

          <ul v-if="project.stack.length" class="stack" :aria-label="t('techStack')">
            <li v-for="tech of project.stack" :key="tech" class="label-item">{{ tech }}</li>
          </ul>

          <div class="site-links">
            <a
              v-for="link of project.links"
              :key="link.url"
              :href="link.url"
              v-bind="EXTERNAL_LINK_ATTRS"
              class="site-link"
            >
              {{ link.label }} ↗
            </a>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { EXTERNAL_LINK_ATTRS, PLANETA_KINO_URL } from '@/constants'
import BarbershopImg from '/public/images/project-barbershop.webp'
import PlanetaKinoImg from '/public/images/project-planetakino.webp'

const { t } = useI18n()

const BARBERSHOP_ARTICLE_URL =
  'https://www.linkedin.com/feed/update/urn:li:activity:7513328107353776130/'

interface PublicProject {
  id: string
  links: { label: string; url: string }[]
  stack: string[]
  img?: string
  imgPosition?: string
  coverIcon?: string
  inDevelopment?: boolean
}

const PUBLIC_PROJECTS: PublicProject[] = [
  {
    id: 'planetaKino',
    links: [{ label: 'planetakino.ua', url: PLANETA_KINO_URL }],
    img: PlanetaKinoImg,
    // logo is centered with padding: keep the middle when the card crops it
    imgPosition: 'center',
    stack: ['Nuxt.js', 'Vue.js', 'SSR', 'LiqPay'],
  },
  {
    id: 'barbershop',
    links: [
      {
        label: 'krasnodar-barber-braids-academy.com',
        url: 'https://krasnodar-barber-braids-academy.com/',
      },
      { label: 'LinkedIn', url: BARBERSHOP_ARTICLE_URL },
    ],
    img: BarbershopImg,
    // site screenshot: keep the header visible
    imgPosition: 'top',
    stack: ['Nuxt 4', 'TypeScript', 'Tailwind CSS 4', 'i18n', 'Netlify', 'Umami', 'Google Ads'],
  },
  {
    id: 'englishApp',
    links: [
      { label: 'GitHub', url: 'https://github.com/stenready/english-app' },
      {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/feed/update/urn:li:activity:7510635458385739777/',
      },
    ],
    coverIcon: 'fa-solid fa-language',
    inDevelopment: true,
    stack: [],
  },
]
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

$imageHeight: 200px;

.PublicProjectsSection {
  margin: 4rem auto 0 auto;
  max-width: $contentMaxWidth;

  .PublicProjectsSection-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .public-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
    margin: 0;
  }

  .public-card {
    display: flex;
    flex-direction: column;
    background: var(--card-color);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 6px 12px var(--shadow-light);
    overflow: hidden;
    transition:
      box-shadow 0.35s,
      transform 0.3s;

    &:hover {
      box-shadow: 0 20px 40px var(--shadow-light);
      transform: translateY(-6px);
    }

    &:last-child:nth-child(odd) {
      grid-column: 1 / -1;
    }
  }

  .img {
    display: block;
    width: 100%;
    height: $imageHeight;
    object-fit: cover;
  }

  .cover {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $imageHeight;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: var(--white);
    font-size: 4rem;
  }

  .public-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 1.25rem 1.5rem 1.5rem;
  }

  .public-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text);
  }

  .status {
    padding: 2px 8px;
    border-radius: 1rem;
    background-color: var(--label-bg);
    color: var(--accent2);
    letter-spacing: 0.03em;
  }

  .public-title {
    margin: 0.4rem 0 0;
    font-size: 1.3rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text);
  }

  .public-summary {
    margin: 0.6rem 0 0;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text);
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 0.9rem 0 0;
  }

  .label-item {
    background-color: var(--label-bg);
    color: var(--accent2);
    padding: 3px 10px;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .site-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.25rem;
    margin-top: auto;
    padding-top: 1rem;
  }

  .site-link {
    font-weight: 700;
    color: var(--accent);
    text-decoration: none;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }

  @include maxWidth(1024) {
    margin: 1rem 0;
    max-width: 100% !important;

    .PublicProjectsSection-title {
      font-size: 1.7rem;
      text-align: center;
      justify-content: center;

      .fa-globe {
        display: none;
      }
    }

    .public-list {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
}
</style>
