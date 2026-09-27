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
            v-for="contact of contacts"
            :id="`${contact.key}-contact`"
            :key="contact.key"
            :href="contact.href"
            v-bind="contact.isExternal ? EXTERNAL_LINK_ATTRS : {}"
            tag="a"
            variant="rounded-outline"
            class="with-icon"
          >
            <FontAwesomeIcon :icon="contact.icon" />
            {{ contact.label || contact.name }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { EXTERNAL_LINK_ATTRS, SOCIAL_CONTACTS } from '@/constants.js'
import BaseButton from '@/components/app/BaseButton.vue'

const CONTACT_KEYS = ['email', 'linkedIn', 'telegram', 'instagram', 'whatsApp', 'viber', 'github']

const { t } = useI18n()

const contacts = CONTACT_KEYS.map((key) => ({ key, ...SOCIAL_CONTACTS[key] }))
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
      .BaseButton {
        width: 100%;
        font-size: 1rem !important;
      }
    }
  }
}
</style>
