<template>
  <header
    data-component-name="TheHeader"
    class="centered-auto d-flex align-items-center justify-between TheHeader"
    :class="{ 'is-scrolled': isScrolled }"
    ref="headerRef"
  >
    <a
      @click.prevent="onScrollToSection(menuListItems?.[0]?.id)"
      href="#about"
      class="link-logo"
      :aria-label="t('logo')"
      :title="t('logo')"
      >&lt;SR/&gt;</a
    >

    <nav class="nav" aria-label="Main navigation" ref="navRef">
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
            :aria-current="activeId === menuListItem?.id ? 'location' : undefined"
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SECTIONS_NAMES } from '@/constants.js'
import { scrollWindowToSelector } from '@/helpers/index.js'

const SCROLLED_THRESHOLD = 8

const activeId = ref(null)
const headerRef = ref(null)
const navRef = ref(null)
const isScrolled = ref(false)
///
let sections = []
let observer = null

const { t } = useI18n()

const menuListItems = computed(() => {
  return [
    { id: SECTIONS_NAMES.ABOUT_ME, title: t('aboutMe') },
    { id: SECTIONS_NAMES.EXPERIENCE, title: t('myExperience') },
    { id: SECTIONS_NAMES.PROJECTS, title: t('projects') },
    { id: SECTIONS_NAMES.SKILLS, title: t('skills') },
    { id: SECTIONS_NAMES.ARTICLES, title: t('articles') },
    { id: SECTIONS_NAMES.CONTACTS, title: t('contacts') },
  ]
})

const onScroll = () => {
  isScrolled.value = window.scrollY > SCROLLED_THRESHOLD
}

watch(activeId, (id) => {
  const link = navRef.value?.querySelector(`#${id}-link`)
  navRef.value?.scrollTo({
    left: link ? link.offsetLeft - (navRef.value.clientWidth - link.offsetWidth) / 2 : 0,
    behavior: 'smooth',
  })
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  sections = Array.from(document.querySelectorAll('section'))
  setupIntersectionObserver()
  setTimeout(() => {
    activeId.value = SECTIONS_NAMES.ABOUT_ME
  }, 150)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)

  if (observer) {
    observer.disconnect()
  }
})

const setupIntersectionObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      if (!activeId.value) {
        return false
      }

      let mostVisibleEntry = null
      let highestRatio = 0

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio
          mostVisibleEntry = entry
        }
      })

      if (mostVisibleEntry?.target?.id) {
        activeId.value = mostVisibleEntry?.target?.id
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

$headerGlassOpacity: 70%;
$headerGlassBlur: 12px;
$headerBorderOpacity: 60%;
$headerPaddingBlock: 0.375rem;
$logoHeight: 2.25rem;
$navLinkGap: 0.25rem;
$navLinkPaddingBlock: 0.4rem;
$navLinkPaddingInline: 0.85rem;
$navPillRadius: 999px;
$navHoverPillOpacity: 12%;
$headerMinSidePadding: 1rem;

.TheHeader {
  width: 100%;
  padding: $headerPaddingBlock max(#{$headerMinSidePadding}, calc((100% - #{$contentMaxWidth}) / 2));
  border-bottom: 1px solid transparent;
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 2;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &.is-scrolled {
    border-bottom-color: color-mix(in srgb, var(--border) $headerBorderOpacity, transparent);
    background: color-mix(in srgb, var(--bg-color) $headerGlassOpacity, transparent);
    backdrop-filter: blur($headerGlassBlur);
  }

  .link-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    height: $logoHeight;
    padding: 0 0.6rem;
    border-radius: 0.6rem;
    background: var(--accent);
    color: var(--white);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      background: var(--accent2);
      transform: translateY(-1px);
    }
  }

  .nav {
    position: relative;
  }

  .nav-container {
    margin: 0;
    gap: $navLinkGap;

    .nav-item-link {
      display: block;
      padding: $navLinkPaddingBlock $navLinkPaddingInline;
      border-radius: $navPillRadius;
      color: var(--accent);
      font-weight: 600;
      font-size: 1.05rem;
      text-decoration: none;
      transition:
        color 0.25s ease,
        background-color 0.25s ease,
        box-shadow 0.25s ease;
      cursor: pointer;

      &:hover {
        color: var(--accent2);
        background: color-mix(in srgb, var(--accent) $navHoverPillOpacity, transparent);
      }

      &.active {
        color: var(--white);
        background: var(--accent);
        box-shadow: 0 4px 14px var(--shadow-light);
      }
    }
  }

  @include maxWidth(1024) {
    gap: 0.75rem;
    padding: $headerPaddingBlock 1rem;
    width: 100%;

    .nav {
      min-width: 0;
      overflow-x: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    .nav-container {
      flex-wrap: nowrap;
      white-space: nowrap;

      a {
        margin-bottom: 0;
        font-size: 0.95rem !important;
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
