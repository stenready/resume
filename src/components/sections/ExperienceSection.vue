<template>
  <div data-component-name="ExperienceSection" class="ExperienceSection">
    <div class="ExperienceSection-title">
      <FontAwesomeIcon icon="fa-solid fa-trophy" />
      {{ t('myExperience') }}
    </div>

    <ol class="timeline">
      <li
        v-for="(job, idx) of JOBS"
        :key="job.id"
        class="timeline-item"
        :class="{ current: idx === 0 }"
      >
        <div class="period">
          {{ t(`experience.${job.id}.period`) }}
          <span class="duration">· {{ formatDuration(job) }}</span>
        </div>

        <article class="entry">
          <span class="dot" aria-hidden="true"></span>

          <h3 class="role">{{ t(`experience.${job.id}.role`) }}</h3>

          <div class="company-line">
            <a
              v-if="job.link"
              :href="job.link"
              target="_blank"
              rel="noopener noreferrer"
              class="base-link company"
              >{{ job.company }} ↗</a
            >
            <span v-else class="company">{{ job.company }}</span>
            · {{ t(`experience.${job.id}.location`) }}
          </div>

          <ul class="bullets">
            <li v-for="(bullet, bulletIdx) of getVisibleBullets(job.id)" :key="bulletIdx">
              {{ rt(bullet) }}
            </li>
          </ul>

          <button
            v-if="getBullets(job.id).length > VISIBLE_BULLETS_LIMIT"
            type="button"
            class="toggle-bullets"
            :aria-expanded="!!expandedJobs[job.id]"
            @click="expandedJobs[job.id] = !expandedJobs[job.id]"
          >
            {{
              expandedJobs[job.id]
                ? t('showLessBullets')
                : t('showAllBullets', { n: getBullets(job.id).length })
            }}
          </button>

          <ul class="stack" :aria-label="t('techStack')">
            <li v-for="tech of job.stack" :key="tech" class="label-item">{{ tech }}</li>
          </ul>
        </article>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { PLANETA_KINO_URL } from '@/constants.js'

const { t, tm, rt, locale } = useI18n()

const MONTHS_IN_YEAR = 12
const VISIBLE_BULLETS_LIMIT = 6

// job id -> true when all bullets are shown
const expandedJobs = reactive({})

const getBullets = (jobId) => tm(`experience.${jobId}.bullets`)

const getVisibleBullets = (jobId) => {
  const bullets = getBullets(jobId)
  return expandedJobs[jobId] ? bullets : bullets.slice(0, VISIBLE_BULLETS_LIMIT)
}

// newest first: the first item is rendered as the current job.
// start/end are 'YYYY-MM'; end: null means "present"
const JOBS = [
  {
    id: 'planetaKino',
    company: 'Planeta Kino',
    link: PLANETA_KINO_URL,
    start: '2022-01',
    end: null,
    stack: [
      'Vue.js',
      'Nuxt.js',
      'JavaScript',
      'Pinia',
      'Tailwind CSS',
      'Vuexy',
      'BootstrapVue',
      'Axios',
      'GraphQL',
      'REST',
      'WebSockets',
      'AWS',
      'Electron',
      'Sentry',
      'LiqPay',
      'Vchasno PRRO',
      'HLS',
      'Video.js',
    ],
  },
  {
    id: 'vjet',
    company: 'VJET Group',
    start: '2021-08',
    end: '2022-01',
    stack: [
      'Nuxt.js',
      'Vue.js',
      'REST',
      'SCSS',
      'Vuetify',
      'BootstrapVue',
      'WebSockets',
      'Google Maps',
      'i18n',
      'FullCalendar.js',
    ],
  },
  {
    id: 'quartSoft',
    company: 'QuartSoft',
    start: '2021-05',
    end: '2021-07',
    stack: ['Nuxt.js', 'Leaflet (interactive maps)', 'SCSS', 'REST', 'vanilla JavaScript'],
  },
  {
    id: 'foxprime',
    company: 'Foxprime.tv',
    start: '2020-08',
    end: '2021-05',
    stack: [
      'Nuxt.js',
      'Vue.js',
      'JavaScript',
      'WebSockets',
      'GraphQL',
      'HLS',
      'Video.js',
      'custom video player',
      'LiqPay',
      'custom Vue components',
      'REST',
      'SCSS',
      'SEO',
    ],
  },
]

const toMonthIndex = (yearMonth) => {
  const [year, month] = yearMonth.split('-').map(Number)
  return year * MONTHS_IN_YEAR + month
}

const getCurrentYearMonth = () => {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth() + 1}`
}

// both the start and the end month count, as on LinkedIn: May–Jul = 3 months
const getMonthsWorked = ({ start, end }) =>
  toMonthIndex(end || getCurrentYearMonth()) - toMonthIndex(start) + 1

const pluralize = (key, n) => {
  const form = new Intl.PluralRules(locale.value).select(n)
  return t(`${key}.${form}`, { n })
}

const formatDuration = (job) => {
  const totalMonths = getMonthsWorked(job)
  const years = Math.floor(totalMonths / MONTHS_IN_YEAR)
  const months = totalMonths % MONTHS_IN_YEAR
  const parts = []

  if (years) {
    parts.push(pluralize('durationYears', years))
  }

  if (months) {
    parts.push(pluralize('durationMonths', months))
  }

  return parts.join(' ')
}
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

$dotSize: 0.875rem;
$lineWidth: 2px;
$entryIndent: 2.25rem;
$entryIndentMobile: 1.75rem;

.ExperienceSection {
  margin: 4rem auto 0 auto;
  max-width: $contentMaxWidth;

  .ExperienceSection-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .timeline {
    list-style: none;
    margin: 0;
    padding: 2rem;
    background-color: var(--card-color);
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 6px 12px var(--shadow-light);
  }

  .timeline-item + .timeline-item {
    margin-top: 2rem;
  }

  .period {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--text);
    opacity: 0.6;
    margin-bottom: 0.75rem;

    .duration {
      text-transform: none;
      letter-spacing: normal;
    }
  }

  .entry {
    position: relative;
    padding-left: $entryIndent;

    // vertical line from under the dot to the end of the entry
    &::before {
      content: '';
      position: absolute;
      left: calc(($dotSize - $lineWidth) / 2);
      top: calc($dotSize + 0.9rem);
      bottom: 0;
      width: $lineWidth;
      background-color: var(--border);
    }
  }

  .dot {
    position: absolute;
    left: 0;
    top: 0.45rem;
    width: $dotSize;
    height: $dotSize;
    border-radius: 50%;
    border: 3px solid var(--border);
    background-color: var(--card-color);
  }

  .current .dot {
    border-color: var(--accent);
    box-shadow: 0 0 0 4px var(--shadow-light);
  }

  .role {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.3;
    color: var(--text);
  }

  .company-line {
    margin-top: 0.25rem;
    font-size: 1rem;
    color: var(--text);
    opacity: 0.85;

    .company {
      font-weight: 700;
    }
  }

  .bullets {
    margin: 0.9rem 0 0;

    li {
      position: relative;
      padding-left: 1rem;
      font-size: 1.05rem;
      line-height: 1.6;
      color: var(--text);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0.7em;
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 50%;
        background-color: var(--accent);
      }

      & + li {
        margin-top: 0.4rem;
      }
    }
  }

  .toggle-bullets {
    margin-top: 0.6rem;
    padding: 0 0 0 1rem;
    border: none;
    background: none;
    font: inherit;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--accent);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  .stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0 0;
  }

  .label-item {
    background-color: rgba(30, 144, 255, 0.15);
    color: var(--accent);
    padding: 4px 12px;
    border-radius: 1rem;
    font-size: 0.85rem;
    font-weight: 600;
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

    .timeline {
      opacity: 0.9;
      padding: 1.5rem 1.25rem;
    }

    .entry {
      padding-left: $entryIndentMobile;
    }

    .role {
      font-size: 1.25rem;
    }

    .bullets li {
      font-size: 1rem;
    }
  }
}
</style>
