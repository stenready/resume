<template>
  <div data-component-name="ContactsSection" class="ContactsSection">
    <div class="ContactsSection-title">
      <FontAwesomeIcon icon="fa-id-card" />

      {{ t('contacts') }}
    </div>

    <div class="contacts-wrap">
      <div class="message">
        {{ t('writeMeMessage') }}
      </div>

      <div class="buttons-wrap">
        <BaseButton
          id="email-contact"
          :aria-label="SOCIAL_LINKS.EMAIL"
          :is-link="true"
          type="rounded-outline"
          class="with-icon"
        >
          <a :href="`mailto:${SOCIAL_LINKS.EMAIL}`">
            <FontAwesomeIcon icon="fa-solid fa-envelope" />
            {{ SOCIAL_LINKS.EMAIL }}
          </a>
        </BaseButton>

        <BaseButton
          id="LinkedIn-contact"
          aria-label="LinkedIn"
          :is-link="true"
          type="rounded-outline"
          class="with-icon"
        >
          <a :href="SOCIAL_LINKS.LINKED_IN" target="_blank">
            <FontAwesomeIcon icon="fa-brands fa-linkedin" />
            LinkedIn
          </a>
        </BaseButton>

        <BaseButton
          id="telegram-contact"
          aria-label="Telegram"
          :is-link="true"
          type="rounded-outline"
          class="with-icon"
        >
          <a :href="SOCIAL_LINKS.TG" target="_blank">
            <FontAwesomeIcon icon="fa-brands fa-telegram" />
            Telegram
          </a>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const BaseButton = defineAsyncComponent(() => import('@/components/app/BaseButton.vue'))

import { useI18n } from 'vue-i18n'
import { SOCIAL_LINKS } from '@/constants.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const { t } = useI18n()
</script>

<style scoped lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

.ContactsSection {
  margin: 4rem auto 0 auto;
  max-width: 45rem;

  .with-icon {
    svg {
      margin-top: 4px;
    }
  }

  .ContactsSection-title {
    @include sectionTitle();
    margin-bottom: 1.5rem;
  }

  .contacts-wrap {
    .message {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      font-weight: 700;
      color: var(--accent);
      line-height: 1.7;
    }
  }

  .buttons-wrap {
    flex-wrap: wrap;
    display: flex;
    gap: 1rem;
  }

  @include maxWidth(1024) {
    margin: 1rem 0;
    max-width: 100% !important;
    .ContactsSection-title {
      font-size: 1.7rem !important;
      align-items: center;
      text-align: center;
      justify-content: center;
    }

    .fa-id-card {
      display: none;
    }

    .message {
      opacity: 0.9;
      border-radius: 12px;
      font-size: 1.25rem !important;
      padding: 28px 24px;
      background: var(--card-bg);
    }

    .buttons-wrap {
      button {
        width: 100%;
        font-size: 1.25rem !important;
      }
    }
  }
}
</style>
