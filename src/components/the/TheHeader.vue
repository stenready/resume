<template>
  <header
    data-component-name="TheHeader"
    class="centered-auto d-flex align-items-center justify-between TheHeader"
    ref="headerRef"
  >
    <a @click.prevent="onScrollToSection(menuListItems?.[0]?.id)" href="#about" class="link-logo">{{
      t('logo')
    }}</a>

    <nav class="nav" aria-label="Main navigation">
      <ul class="nav-container d-flex align-items-center">
        <li
          @click.prevent="onScrollToSection(menuListItem?.id)"
          v-for="menuListItem of menuListItems"
          :key="menuListItem?.id"
          class="nav-item"
          :aria-label="menuListItem?.title"
        >
          <a
            :href="`#${menuListItem?.id}`"
            :id="`${menuListItem?.id}-link`"
            :class="[{ active: activeId === menuListItem?.id }]"
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { SECTIONS_NAMES } from '@/constants.js'
import { scrollWindowToSelector } from '@/helpers/index.js'

const activeId = ref(SECTIONS_NAMES.ABOUT_ME)
const headerRef = ref(null)
///
let sections = []
let observer = null

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

onMounted(() => {
  sections = Array.from(document.querySelectorAll('section'))
  setupIntersectionObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})

const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      let mostVisibleEntry = null
      let highestRatio = 0

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio
          mostVisibleEntry = entry
        }
      })

      if (mostVisibleEntry?.target?.id) {
        activeId.value = mostVisibleEntry.target.id
      }

      const lastSection = sections[sections.length - 1]
      const rect = lastSection.getBoundingClientRect()
      if (rect.bottom <= window.innerHeight && rect.top >= 0) {
        activeId.value = lastSection?.id
      }
    },
    {
      threshold: [0.15, 0.3, 0.45, 0.6, 0.75, 0.85, 1.0],
      root: null,
    },
  )

  sections.forEach((section) => {
    if (section.id) {
      observer.observe(section)
    }
  })
}

const onScrollToSection = (menuItemId) => {
  if (!menuItemId) {
    return false
  }

  if (observer) {
    observer.disconnect()
  }

  activeId.value = menuItemId
  scrollWindowToSelector(`#${menuItemId}`, headerRef?.value.offsetHeight)
  setTimeout(() => {
    setupIntersectionObserver()
  }, 1000)
}
</script>

<style lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

header.TheHeader {
  max-width: $desktopContainerMaxWidth;
  background: var(--bg-color);
  position: sticky;
  top: 0;
  z-index: 2;

  .link-logo {
    font-size: 1.8rem;
    font-weight: 700;
    text-decoration: none;
    color: var(--accent);
    transition: transform 0.3s ease-in;

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
      transition: color 0.1s ease;
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
          @include minWidth(768) {
            width: 100%;
          }
        }
      }

      &.active {
        color: var(--selected-section-color);

        &:after {
          background: var(--selected-section-color) !important;
          width: 100%;
        }
      }
    }
  }

  @include maxWidth(1024) {
    justify-content: center !important;
    text-align: center;
    padding: 10px 10px 3rem 10px;
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
