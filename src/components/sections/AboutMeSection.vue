<template>
  <div data-component-name="AboutMeSection" class="AboutMeSection d-flex">
    <div class="left-info">
      <div class="my-avatar">
        <img class="img-avatar" :alt="t('fullName')" src="/images/avatar.jpg" />
      </div>

      <div class="buttons">
        <BaseButton id="Linkedin-btn" aria-label="LinkedIn" type="social">
          <a :href="SOCIAL_LINKS.LINKED_IN" target="_blank">
            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
          </a>
        </BaseButton>

        <BaseButton id="Telegram-btn" aria-label="Telegram" type="social">
          <a :href="SOCIAL_LINKS.TG" target="_blank">
            <FontAwesomeIcon icon="fa-brands fa-telegram" />
          </a>
        </BaseButton>

        <BaseButton id="Instagram-btn" aria-label="Instagram" type="social">
          <a :href="SOCIAL_LINKS.INSTAGRAM" target="_blank">
            <FontAwesomeIcon icon="fa-brands fa-instagram" />
          </a>
        </BaseButton>

        <BaseButton id="WhatsApp-btn" aria-label="WhatsApp" type="social">
          <a :href="SOCIAL_LINKS.WHATSAPP" target="_blank">
            <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
          </a>
        </BaseButton>

        <BaseButton id="Viber-btn" aria-label="Viber" type="social">
          <a :href="SOCIAL_LINKS.VIBER">
            <FontAwesomeIcon icon="fa-brands fa-viber" />
          </a>
        </BaseButton>

        <BaseButton id="email-btn" aria-label="Email" type="social">
          <a :href="`mailto:${SOCIAL_LINKS.EMAIL}`">
            <FontAwesomeIcon icon="fa-solid fa-envelope" />
          </a>
        </BaseButton>
      </div>
    </div>
    <!--    ////-->
    <div class="right-info">
      <div class="hero">
        <h1 class="full-name">{{ t('fullName') }}</h1>

        <p class="job-title">{{ t('jobTitle') }} · Vue.js 2/3 · Nuxt.js 2/3</p>

        <ul class="meta-list">
          <li class="meta-item">{{ t('yearsOfExperience') }}</li>
          <li class="meta-item">{{ t('location') }}</li>
          <li class="meta-item">{{ t('workFormats') }}</li>
        </ul>

        <i18n-t keypath="heroSummary" tag="p" class="summary">
          <template #site>
            <!-- no whitespace around the anchor text, otherwise it renders as "( planetakino.ua )" -->
            <a :href="PLANETA_KINO_URL" target="_blank" rel="noopener noreferrer" class="base-link"
              >planetakino.ua</a
            >
          </template>
        </i18n-t>

        <div class="hero-actions">
          <BaseButton
            :aria-label="t('downloadResume')"
            :is-link="true"
            id="download-resume-btn"
            type="rounded-outline"
          >
            <a :download="resumeFileName" :href="`/files/${resumeFileName}`">
              <FontAwesomeIcon icon="fa-solid fa-file-arrow-down" class="icon-download" />

              {{ t('downloadResume') }}
            </a>
          </BaseButton>

          <BaseButton
            :aria-label="t('contactMe')"
            :is-link="true"
            id="contact-me-btn"
            type="rounded-outline"
          >
            <a :href="`#${SECTIONS_NAMES.CONTACTS}`" @click.prevent="onScrollToContacts">
              <FontAwesomeIcon icon="fa-solid fa-envelope" />

              {{ t('contactMe') }}
            </a>
          </BaseButton>
        </div>
      </div>

      <ul class="stats">
        <li class="stat-item" v-for="statItem of stats" :key="statItem.id">
          <span class="stat-value">{{ statItem.value }}</span>
          <span class="stat-label">{{ t(statItem.labelKey) }}</span>
        </li>
      </ul>

      <ul class="strengths">
        <li class="strength-card" v-for="strengthItem of strengths" :key="strengthItem.id">
          <div class="strength-title">
            <FontAwesomeIcon :icon="strengthItem.icon" />
            {{ t(strengthItem.titleKey) }}
          </div>

          <p class="strength-desc">{{ t(strengthItem.descKey) }}</p>
        </li>
      </ul>

      <div class="tag-group">
        <div class="tag-group-title">{{ t('domainsTitle') }}</div>

        <ul class="tag-list">
          <li class="tag-item" v-for="domainKey of DOMAIN_KEYS" :key="domainKey">
            {{ t(domainKey) }}
          </li>
        </ul>
      </div>

      <div class="tag-group">
        <div class="tag-group-title">{{ t('languagesTitle') }}</div>

        <ul class="tag-list">
          <li class="tag-item" v-for="languageKey of LANGUAGE_KEYS" :key="languageKey">
            {{ t(languageKey) }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed, defineAsyncComponent } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SECTIONS_NAMES, SOCIAL_LINKS } from '@/constants.js'
import { scrollWindowToSelector } from '@/helpers/index.js'

const BaseButton = defineAsyncComponent(() => import('@/components/app/BaseButton.vue'))

const { t, locale } = useI18n()

const PLANETA_KINO_URL = 'https://planetakino.ua/'

const RESUME_FILES = {
  en: 'Stanislav_Radchenko_Senior_Frontend_Developer_EN.pdf',
  uk: 'Stanislav_Radchenko_Senior_Frontend_Developer_UA.pdf',
}

const resumeFileName = computed(() => RESUME_FILES[locale.value] || RESUME_FILES.en)

const stats = [
  { id: 'cinemas', value: '12', labelKey: 'statCinemas' },
  { id: 'pagespeed', value: '90+', labelKey: 'statPageSpeed' },
  { id: 'migration', value: 'Vue 3', labelKey: 'statMigration' },
  { id: 'tablets', value: '1000+', labelKey: 'statTablets' },
  { id: 'mentoring', value: '5', labelKey: 'statMentoring' },
  { id: 'bundle', value: '−45%', labelKey: 'statBundle' },
]

const strengths = [
  {
    id: 'architecture',
    icon: 'fa-solid fa-diagram-project',
    titleKey: 'strengthArchitectureTitle',
    descKey: 'strengthArchitectureDesc',
  },
  {
    id: 'business',
    icon: 'fa-solid fa-cash-register',
    titleKey: 'strengthBusinessTitle',
    descKey: 'strengthBusinessDesc',
  },
  {
    id: 'performance',
    icon: 'fa-solid fa-gauge-high',
    titleKey: 'strengthPerformanceTitle',
    descKey: 'strengthPerformanceDesc',
  },
]

const DOMAIN_KEYS = [
  'domainCinema',
  'domainStreaming',
  'domainPayments',
  'domainPos',
  'domainAdvertising',
  'domainHoreca',
  'domainEcommerce',
  'domainGis',
]

const LANGUAGE_KEYS = [
  'languageUkrainian',
  'languageRussian',
  'languageEnglish',
  'languageBulgarian',
]

const onScrollToContacts = () => {
  const headerHeight = document.querySelector('.TheHeader')?.offsetHeight || 0
  scrollWindowToSelector(`#${SECTIONS_NAMES.CONTACTS}`, headerHeight)
}
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

$avatarWidth: 12rem;
$avatarHeight: 12rem;
$avatarSizeMobile: 8rem;
$gap: 4rem;
$paddingContainer: 1.25rem 4rem;

.AboutMeSection {
  gap: $gap;
  padding: $paddingContainer;

  .icon-download {
    font-size: 1.1rem;
  }

  .my-avatar {
    .img-avatar {
      width: $avatarWidth;
      height: $avatarHeight;
      border-radius: 50%;
      border: 3px solid var(--accent);
      box-shadow: 0 6px 15px grey;
    }
  }

  .left-info {
    .buttons {
      margin-top: 1rem;
      display: grid;
      grid-template-columns: repeat(3, auto);
      justify-content: center;
      gap: 0.6rem;
    }
  }

  .right-info {
    flex: 1;
  }

  .hero {
    background-color: var(--card-color);
    padding: 2rem;
    border: 1px solid var(--border);
    box-shadow: 0 6px 12px var(--shadow-light);
    border-radius: 16px;
  }

  .full-name {
    @include sectionTitle();
    line-height: 1.15;
  }

  .job-title {
    margin: 0.5rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text);
  }

  .meta-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0 0;

    .meta-item {
      padding: 0.3rem 0.8rem;
      border-radius: 1rem;
      border: 1px solid var(--border);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text);
    }
  }

  .summary {
    margin: 1.25rem 0 0;
    font-size: 1.2rem;
    line-height: 1.7;
    color: var(--text);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin: 1.5rem 0 0;

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1.25rem 1rem;
      background-color: var(--card-color);
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 6px 12px var(--shadow-light);
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      line-height: 1;
      color: var(--accent);
    }

    .stat-label {
      font-size: 0.95rem;
      line-height: 1.4;
      color: var(--text);
    }
  }

  .strengths {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1.5rem 0 0;

    .strength-card {
      padding: 1.25rem 1.5rem;
      background-color: var(--card-color);
      border-left: 6px solid var(--accent);
      border-radius: 12px;
      box-shadow: 0 6px 16px var(--shadow-light);
    }

    .strength-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text);

      svg {
        color: var(--accent);
      }
    }

    .strength-desc {
      margin: 0.5rem 0 0;
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text);
    }
  }

  .tag-group {
    margin-top: 1.5rem;

    .tag-group-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text);
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.75rem 0 0;
    }

    .tag-item {
      padding: 0.35rem 0.9rem;
      border-radius: 1rem;
      background-color: var(--card-color);
      border: 1px solid var(--border);
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--text);
    }
  }

  @include maxWidth(1024) {
    padding: 0;
    opacity: 0.9;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;

    .my-avatar .img-avatar {
      width: $avatarSizeMobile;
      height: $avatarSizeMobile;
    }

    .left-info .buttons {
      grid-template-columns: repeat(6, auto);
    }

    .hero {
      padding: 1.5rem;
    }

    .full-name {
      font-size: 2.25rem;
    }

    .job-title {
      font-size: 1.25rem;
    }

    .link-btn {
      width: 100%;
    }

    .stats {
      grid-template-columns: repeat(2, 1fr);

      // odd count: stretch the last card to the full row
      .stat-item:last-child:nth-child(odd) {
        grid-column: 1 / -1;
      }
    }

    .strengths {
      grid-template-columns: 1fr;
    }
  }

  @include between(1025, 1200) {
    margin: 0 auto;
    width: 90% !important;
    flex-direction: column !important;
    justify-content: center;
    align-items: center;
  }
}
</style>
