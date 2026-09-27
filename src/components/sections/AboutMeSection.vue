<template>
  <div data-component-name="AboutMeSection" class="AboutMeSection">
    <div class="hero">
      <div class="hero-text">
        <h1 class="full-name">{{ t('fullName') }}</h1>

        <p class="job-title">{{ t('jobTitle') }} · Vue.js 2/3 · Nuxt.js 2/3</p>

        <ul class="meta-list">
          <li class="meta-item">{{ t('yearsOfExperience') }}</li>
          <li class="meta-item">{{ t('location') }}</li>
          <li class="meta-item">{{ t('workFormats') }}</li>
        </ul>

        <i18n-t keypath="heroSummary" tag="p" class="summary">
          <template #site>
            <a :href="PLANETA_KINO_URL" target="_blank" rel="noopener noreferrer" class="base-link"
              >planetakino.ua</a
            >
          </template>
        </i18n-t>

        <div class="hero-actions">
          <BaseButton
            id="download-resume-btn"
            :href="`/files/${resumeFileName}`"
            :download="resumeFileName"
            tag="a"
            variant="primary"
            class="hero-action"
          >
            <FontAwesomeIcon icon="fa-solid fa-file-arrow-down" class="icon-download" />

            {{ t('downloadResume') }}
          </BaseButton>

          <BaseButton
            id="contact-me-btn"
            :href="`#${SECTIONS_NAMES.CONTACTS}`"
            tag="a"
            variant="rounded-outline"
            class="hero-action"
          >
            <FontAwesomeIcon icon="fa-solid fa-envelope" />

            {{ t('contactMe') }}
          </BaseButton>
        </div>

        <div class="socials">
          <BaseButton
            v-for="social of heroSocials"
            :id="`${social.key}-btn`"
            :key="social.key"
            :href="social.href"
            :aria-label="social.name"
            v-bind="social.isExternal ? EXTERNAL_LINK_ATTRS : {}"
            tag="a"
            variant="social"
          >
            <FontAwesomeIcon :icon="social.icon" />
          </BaseButton>
        </div>
      </div>

      <div class="my-avatar">
        <img
          class="img-avatar"
          :alt="`${t('fullName')} — ${t('jobTitle')}`"
          src="/images/avatar.webp"
          width="192"
          height="192"
          fetchpriority="high"
        />
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

    <div class="tag-group">
      <div class="tag-group-title">{{ t('growthTitle') }}</div>

      <ul class="tag-list">
        <li class="tag-item" v-for="growthKey of GROWTH_KEYS" :key="growthKey">
          {{ t(growthKey) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import {
  EXTERNAL_LINK_ATTRS,
  PLANETA_KINO_URL,
  SECTIONS_NAMES,
  SOCIAL_CONTACTS,
  type SocialContactKey,
} from '@/constants'
import BaseButton from '@/components/app/BaseButton.vue'

const { t, locale } = useI18n()

const RESUME_FILES: Record<string, string> = {
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

const GROWTH_KEYS = ['growthEnglish', 'growthNode', 'growthReact']

const HERO_SOCIAL_KEYS: SocialContactKey[] = [
  'linkedIn',
  'telegram',
  'instagram',
  'whatsApp',
  'viber',
  'email',
]

const heroSocials = HERO_SOCIAL_KEYS.map((key) => ({ key, ...SOCIAL_CONTACTS[key] }))
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

$avatarSize: 12rem;
$avatarSizeMobile: 7rem;
$avatarRingWidth: 4px;
$heroGap: 3rem;
$summaryMaxWidth: 44rem;
$nameFontSize: clamp(2.5rem, 4.5vw, 3.25rem);
$nameFontSizeMobile: 2.5rem;
$statsColumns: 3;
$statsColumnsMobile: 2;
$glassOpacity: 72%;
$glassBlur: 16px;
$glassRadius: 28px;
$metaDotSize: 6px;

.AboutMeSection {
  margin-top: 2rem;
  padding: 3rem;
  border: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
  border-radius: $glassRadius;
  background: color-mix(in srgb, var(--bg-color) $glassOpacity, transparent);
  backdrop-filter: blur($glassBlur);

  .hero {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: $heroGap;
  }

  .full-name {
    margin: 0;
    font-size: $nameFontSize;
    font-weight: 800;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: var(--text);
  }

  .job-title {
    margin: 0.75rem 0 0;
    font-size: 1.35rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .meta-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem 0.75rem;
    margin: 1rem 0 0;

    .meta-item {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-muted);

      &::before {
        content: '';
        display: inline-block;
        width: $metaDotSize;
        height: $metaDotSize;
        margin-right: 0.5rem;
        border-radius: 50%;
        background: var(--accent);
        vertical-align: middle;
      }
    }
  }

  .summary {
    max-width: $summaryMaxWidth;
    margin: 1.25rem 0 0;
    font-size: 1.15rem;
    line-height: 1.7;
    color: var(--text);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 1.75rem;
  }

  .icon-download {
    font-size: 1.1rem;
  }

  .socials {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 1.25rem;
  }

  .my-avatar {
    padding: $avatarRingWidth;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    box-shadow: 0 20px 50px var(--shadow-light);

    .img-avatar {
      display: block;
      width: $avatarSize;
      height: $avatarSize;
      border-radius: 50%;
      border: $avatarRingWidth solid var(--bg-color);
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat($statsColumns, 1fr);
    row-gap: 1.75rem;
    margin: 3rem 0 0;
    padding-top: 2rem;
    border-top: 1px solid var(--border);

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      padding: 0 1.5rem;
      border-left: 1px solid var(--border);

      &:nth-child(#{$statsColumns}n + 1) {
        padding-left: 0;
        border-left: none;
      }
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 800;
      line-height: 1;
      letter-spacing: -0.02em;
      background: linear-gradient(90deg, var(--accent), var(--accent2));
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .stat-label {
      font-size: 0.95rem;
      line-height: 1.4;
      color: var(--text-muted);
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
    margin-top: 0.5rem;
    padding: 1.5rem 1.25rem;
    border-radius: 20px;

    .hero {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .my-avatar {
      order: -1;
      justify-self: center;

      .img-avatar {
        width: $avatarSizeMobile;
        height: $avatarSizeMobile;
      }
    }

    .full-name {
      font-size: $nameFontSizeMobile;
      text-align: center;
    }

    .job-title {
      font-size: 1.2rem;
      text-align: center;
    }

    .meta-list {
      justify-content: center;
      text-align: center;
    }

    .hero-action {
      width: 100%;
    }

    .stats {
      grid-template-columns: repeat($statsColumnsMobile, 1fr);
      margin-top: 2rem;

      .stat-item {
        padding: 0 1rem;
        border-left: 1px solid var(--border);

        &:nth-child(#{$statsColumnsMobile}n + 1) {
          padding-left: 0;
          border-left: none;
        }
      }

      .stat-value {
        font-size: 2rem;
      }
    }

    .strengths {
      grid-template-columns: 1fr;
    }
  }

  @include between(1025, 1200) {
    margin: 2rem auto 0;
    width: 90% !important;
  }
}
</style>
