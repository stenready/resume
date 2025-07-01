<template>
  <header
    data-component-name="HeaderComponent"
    class="centered-auto d-flex align-items-center justify-between HeaderComponent"
  >
    <a @click="scrollToSection(menuList?.[0])" href="#about" class="link-logo">{{ t('logo') }}</a>

    <nav class="nav" aria-label="Main navigation">
      <ul class="nav-container d-flex align-items-center">
        <li
          @click="scrollToSection(menuListItem)"
          v-for="menuListItem of menuListItems"
          :key="menuListItem?.id"
          class="nav-item"
          :aria-label="menuListItem?.title"
        >
          <a
            :class="{ active: activeSection === menuListItem?.id }"
            :href="`#${menuListItem?.id}`"
            :id="`${menuListItem?.id}-link`"
            class="nav-item-link"
          >
            {{ menuListItem?.title }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { SECTIONS_NAMES } from '@/constants.js'
import useObserver from '@/use/useObserver.js'

const { activeSection } = useObserver(Object.values(SECTIONS_NAMES))
////

const { t } = useI18n()

const menuListItems = computed(() => {
  return [
    { id: SECTIONS_NAMES.ABOUT_ME, title: t('aboutMe') },
    { id: SECTIONS_NAMES.EXPERIENCE, title: t('myExperience') },
    { id: SECTIONS_NAMES.SKILLS, title: t('skills') },
    { id: SECTIONS_NAMES.ARTICLES, title: t('articles') },
    { id: SECTIONS_NAMES.CONTACTS, title: t('contacts') },
  ]
})

const scrollToSection = (menuItem) => {
  const element = document.getElementById(menuItem?.id)
  if (element) {
    activeSection.value = menuItem?.id
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

header.HeaderComponent {
  max-width: $desktopContainerMaxWidth;
  background: var(--bg-color);
  position: sticky;
  top: 0;
  z-index: 2;

  .link-logo {
    font-size: 2rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--accent);
    transition: transform 0.3s linear;

    &:hover {
      transform: scale(1.05);
      color: var(--accent2);
    }
  }

  .nav-container {
    gap: 1rem;

    .nav-item-link {
      color: var(--accent);
      font-weight: 600;
      font-size: 1.2rem;
      position: relative;
      text-decoration: none;
      padding-bottom: 4px;
      transition: color 0.3s ease;
      cursor: pointer;

      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 3px;
        background: var(--accent2);
        border-radius: 2px;
        transition: width 0.3s ease;
      }

      &:hover {
        color: var(--accent2);

        &:after {
          width: 100%;
        }
      }

      &.active {
        color: var(--selected-section-color);

        &:after {
          background: var(--selected-section-color) !important;
        }
      }
    }
  }

  @include maxWidth(1024) {
    justify-content: center !important;
    text-align: center;
    padding: 10px 10px 4.5rem 10px;
    width: 100%;
    flex-wrap: wrap;

    .nav-container {
      justify-content: center;
      flex-wrap: wrap;

      a {
        margin-bottom: 0;
        text-transform: uppercase;
        font-size: 1rem !important;
      }
    }
  }

  @include minWidth(579) {
    justify-content: space-between !important;
  }

  @include between(1025, 1200) {
    padding: 1rem 3rem;
  }
}
</style>
