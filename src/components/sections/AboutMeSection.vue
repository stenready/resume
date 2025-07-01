<template>
  <div data-component-name="AboutMeSection" class="AboutMeSection d-flex">
    <div class="left-info">
      <div class="my-avatar">
        <img class="img-avatar" alt="my avatar" src="/images/avatar.jpg" />
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
        <h1 class="job-title">
          <FontAwesomeIcon icon="laptop-code" />
          {{ t('jobTitle') }}
        </h1>

        <p class="desc">
          <span class="decorated-text">
            {{ t('heroTitle') }}
          </span>

          <br />

          {{ t('heroDesc1') }}

          <span class="decorated-text">{{ t('heroDesc2') }}</span>
          {{ t('heroDesc3') }} <span class="decorated-text">{{ t('withVueAndNuxt') }}</span>
          {{ t('goodProgrammerMsg') }}
        </p>

        <BaseButton
          :aria-label="t('downloadResume')"
          :is-link="true"
          id="download-resume-btn"
          type="rounded-outline"
          class="mt-1"
        >
          <a download="" href="/files/resume2.pdf">
            <FontAwesomeIcon icon="fa-solid fa-file-arrow-down" class="icon-download" />

            {{ t('downloadResume') }}
          </a>
        </BaseButton>
      </div>

      <div class="about-me">
        <div class="title-about-me">
          <FontAwesomeIcon icon="fa-solid fa-code-compare" />
          {{ t('hiMsg') }}
        </div>

        <div class="d-flex flex-col gap-1">
          <div class="about-me-text-card">
            <FontAwesomeIcon icon="fa-brands fa-vuejs" />
            {{ t('cardDesc1') }}
            <span class="decorated-text">{{ t('spaSsrApps') }}</span>
            {{ t('cardDesc2') }} <span class="decorated-text">Nuxt, Vue</span>
          </div>

          <div class="about-me-text-card">
            <FontAwesomeIcon icon="fa-brands fa-dev" />

            {{ t('cardDesc3') }} <span class="decorated-text">{{ t('adminPanel') }}</span
            >,
            {{ t('thatAnd') }}
            <span class="decorated-text"> {{ t('clients') }} </span>
            {{ t('sites') }} <span class="decorated-text">SEO friendly.</span>
          </div>

          <div class="about-me-text-card">
            <FontAwesomeIcon icon="fa-solid fa-code-merge" />

            {{ t('cardDesc4') }} <span class="decorated-text">{{ t('techLeading') }}</span>
            {{ t('cardDesc5') }} <span class="decorated-text">merge requests</span>
            {{ t('cardDesc6') }}
          </div>

          <div class="about-me-text-card">
            <FontAwesomeIcon icon="fa-solid fa-atom" />

            <span class="decorated-text"> {{ t('worWithElectron') }}</span>
            {{ t('integration') }}

            <span class="decorated-text">
              {{ t('cardDesc7') }}
            </span>

            {{ t('cardDesc8') }}

            <span class="decorated-text">{{ t('optimizations') }}</span> {{ t('cardDesc9') }}
          </div>

          <div class="about-me-text-card">
            <FontAwesomeIcon icon="fa-solid fa-bullseye" />

            {{ t('cardDesc10') }}
            <span class="decorated-text">{{ t('goodProduct') }}</span>
            {{ t('workFor') }}

            <span class="decorated-text">{{ t('cardProduct11') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { defineAsyncComponent } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { SOCIAL_LINKS } from '@/constants.js'

const BaseButton = defineAsyncComponent(() => import('@/components/app/BaseButton.vue'))

const { t } = useI18n()
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

$avatarWidth: 12rem;
$avatarHeight: 12rem;
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
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .job-title,
  .title-about-me {
    @include sectionTitle();
  }

  .title-about-me {
    font-size: 2.5rem;
  }

  .desc {
    font-size: 1.25rem;
    line-height: 1.7;
    color: var(--text);
    font-weight: 500;
    margin-bottom: 0;
  }

  .decorated-text {
    font-weight: 700;
    color: var(--accent);
  }

  .hero {
    background-color: var(--card-color);
    padding: 1rem;
  }

  .left-info {
    .buttons {
      margin-top: 1rem;
      display: flex;
      justify-content: center;
      gap: 0.6rem;
    }
  }

  .right-info {
    .about-me {
      margin-top: 2rem;

      .title-about-me {
        margin-bottom: 1.5rem;
      }

      .about-me-text-card {
        font-size: 1.15rem;
        line-height: 1.75;
        padding: 1rem 1.5rem;
        background-color: var(--card-color);
        border-left: 6px solid var(--accent);
        border-radius: 12px;
        box-shadow: 0 6px 16px var(--shadow-light);
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;

        color: var(--text);

        &:hover {
          transform: translateX(6px);
          box-shadow: 0 8px 20px var(--shadow-light);
        }

        svg {
          margin-right: 0.2rem;
        }
      }
    }
  }

  @include maxWidth(1024) {
    padding: 0;
    opacity: 0.9;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    gap: 1rem;

    .job-title {
      font-size: 2rem;
    }

    .hero {
      padding: 1.5rem;
    }

    .link-btn {
      width: 100%;
    }

    .title-about-me {
      font-size: 1.7rem;
      text-align: center;

      .fa-code-compare {
        display: none;
      }
    }

    .about-me-text-card {
      font-size: 1.25rem !important;
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
