<template>
  <div data-component-name="ContactsSection" class="ContactsSection">
    <div class="wrapper">
      <h2 class="ContactsSection-title">
        <FontAwesomeIcon icon="fa-id-card" />

        {{ t('contacts') }}
      </h2>

      <div class="contacts-wrap">
        <div class="message">
          {{ t('writeMeMessage') }}
        </div>

        <div class="buttons-wrap">
          <BaseButton
            id="email-contact"
            :is-link="true"
            type="rounded-outline"
            class="with-icon"
            tag="div"
          >
            <a :href="`mailto:${SOCIAL_LINKS.EMAIL}`">
              <FontAwesomeIcon icon="fa-solid fa-envelope" />
              {{ SOCIAL_LINKS.EMAIL }}
            </a>
          </BaseButton>

          <BaseButton
            id="LinkedIn-contact"
            :is-link="true"
            type="rounded-outline"
            class="with-icon"
            tag="div"
          >
            <a :href="SOCIAL_LINKS.LINKED_IN" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon="fa-brands fa-linkedin" />
              LinkedIn
            </a>
          </BaseButton>

          <BaseButton
            id="telegram-contact"
            :is-link="true"
            type="rounded-outline"
            class="with-icon"
            tag="div"
          >
            <a :href="SOCIAL_LINKS.TG" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon="fa-brands fa-telegram" />
              Telegram
            </a>
          </BaseButton>

          <BaseButton
            id="instagram-contact"
            :is-link="true"
            type="rounded-outline"
            class="with-icon"
            tag="div"
          >
            <a :href="SOCIAL_LINKS.INSTAGRAM" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon="fa-brands fa-instagram" />
              Instagram
            </a>
          </BaseButton>

          <BaseButton
            id="whatsapp-contact"
            :is-link="true"
            type="rounded-outline"
            class="with-icon"
            tag="div"
          >
            <a :href="SOCIAL_LINKS.WHATSAPP" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon="fa-brands fa-whatsapp" />
              WhatsApp
            </a>
          </BaseButton>

          <BaseButton
            id="viber-contact"
            :is-link="true"
            type="rounded-outline"
            class="with-icon"
            tag="div"
          >
            <a :href="SOCIAL_LINKS.VIBER">
              <FontAwesomeIcon icon="fa-brands fa-viber" />
              Viber
            </a>
          </BaseButton>

          <BaseButton
            id="github-contact"
            :is-link="true"
            type="rounded-outline"
            class="with-icon"
            tag="div"
          >
            <a :href="SOCIAL_LINKS.GITHUB_RESUME" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon="fa-brands fa-github" />
              GitHub
            </a>
          </BaseButton>
        </div>
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
  margin: 4rem auto 4rem auto;
  max-width: $contentMaxWidth;

  .wrapper {
    background-color: var(--card-color);
    padding: 1rem;
    border: 1px solid var(--border);
    box-shadow: 0 6px 12px var(--shadow-light);
    border-radius: 16px;
  }

  .with-icon {
    svg {
      width: 1.1em;
      height: 1.1em;
      flex-shrink: 0;
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
      font-weight: 600;
      color: var(--text);
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
      border-radius: 12px;
      font-size: 1.25rem !important;
      padding: 28px 24px;
      background: var(--card-bg);
    }

    .buttons-wrap {
      button {
        width: 100%;
        font-size: 1rem !important;
      }
    }
  }
}
</style>
