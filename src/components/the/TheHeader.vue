<template>
  <header
    data-component-name="TheHeader"
    class="centered-auto d-flex align-items-center justify-between TheHeader"
    :class="{ 'is-scrolled': isScrolled }"
  >
    <a
      :href="`#${SECTIONS_NAMES.ABOUT_ME}`"
      class="link-logo"
      :title="t('logo')"
      @click="onNavigate(SECTIONS_NAMES.ABOUT_ME)"
      ><span aria-hidden="true">&lt;SR/&gt;</span
      ><span class="visually-hidden">{{ t('logo') }}</span></a
    >

    <nav class="nav" :aria-label="t('mainNavigation')" ref="navRef">
      <ul class="nav-container d-flex align-items-center">
        <li v-for="menuListItem of menuListItems" :key="menuListItem.id" class="nav-item">
          <a
            :href="`#${menuListItem.id}`"
            :id="`${menuListItem.id}-link`"
            :class="{ active: activeId === menuListItem.id }"
            :aria-current="activeId === menuListItem.id ? 'location' : undefined"
            class="nav-item-link"
            @click="onNavigate(menuListItem.id)"
          >
            {{ menuListItem.title }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SECTIONS_NAMES } from '@/constants'

const SCROLLED_THRESHOLD = 8
const NAVIGATION_FALLBACK_MS = 1000
const VISIBILITY_THRESHOLDS = [0.15, 0.3, 0.45, 0.6, 0.75, 0.85, 1.0]

const activeId = ref<string>(SECTIONS_NAMES.ABOUT_ME)
const navRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)

let sections: HTMLElement[] = []
let observer: IntersectionObserver | null = null
let isNavigating = false
let navigationTimer: ReturnType<typeof setTimeout> | undefined

const { t } = useI18n()

const menuListItems = computed(() => [
  { id: SECTIONS_NAMES.ABOUT_ME, title: t('aboutMe') },
  { id: SECTIONS_NAMES.EXPERIENCE, title: t('myExperience') },
  { id: SECTIONS_NAMES.PROJECTS, title: t('projects') },
  { id: SECTIONS_NAMES.SKILLS, title: t('skills') },
  { id: SECTIONS_NAMES.ARTICLES, title: t('articles') },
  { id: SECTIONS_NAMES.CONTACTS, title: t('contacts') },
])

const onScroll = () => {
  isScrolled.value = window.scrollY > SCROLLED_THRESHOLD
}

watch(activeId, (id) => {
  const nav = navRef.value
  if (!nav) {
    return
  }

  const link = nav.querySelector<HTMLElement>(`#${id}-link`)
  nav.scrollTo({
    left: link ? link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2 : 0,
    behavior: 'smooth',
  })
})

const onIntersect = (entries: IntersectionObserverEntry[]) => {
  // while a menu click scrolls the page, sections flying by must not steal the highlight
  if (isNavigating) {
    return
  }

  let mostVisibleEntry: IntersectionObserverEntry | null = null
  let highestRatio = 0

  for (const entry of entries) {
    if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
      highestRatio = entry.intersectionRatio
      mostVisibleEntry = entry
    }
  }

  if (mostVisibleEntry) {
    activeId.value = mostVisibleEntry.target.id
  }

  const lastSection = sections.at(-1)
  if (!lastSection) {
    return
  }

  const rect = lastSection.getBoundingClientRect()
  if (rect.bottom <= window.innerHeight && rect.top >= 0) {
    activeId.value = lastSection.id
  }
}

const stopNavigating = () => {
  isNavigating = false
  clearTimeout(navigationTimer)
}

const onNavigate = (sectionId: string) => {
  activeId.value = sectionId
  isNavigating = true
  clearTimeout(navigationTimer)
  navigationTimer = setTimeout(stopNavigating, NAVIGATION_FALLBACK_MS)
  window.addEventListener('scrollend', stopNavigating, { once: true })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  sections = Array.from(document.querySelectorAll<HTMLElement>('main > section'))
  const sectionObserver = new IntersectionObserver(onIntersect, {
    threshold: VISIBILITY_THRESHOLDS,
  })
  sections.forEach((section) => sectionObserver.observe(section))
  observer = sectionObserver
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('scrollend', stopNavigating)
  clearTimeout(navigationTimer)
  observer?.disconnect()
})
</script>

<style lang="scss">
@use '@/assets/vars' as *;
@use '@/assets/mixins' as *;

$headerGlassOpacity: 70%;
$headerGlassBlur: 12px;
$headerBorderOpacity: 60%;
$navLinkGap: 0.25rem;
$navLinkPaddingBlock: 0.4rem;
$navLinkPaddingInline: 0.85rem;
$navPillRadius: 999px;
$navHoverPillOpacity: 12%;
$headerMinSidePadding: 1rem;

.TheHeader {
  width: 100%;
  padding: $headerPaddingBlock max(#{$headerMinSidePadding}, calc((100% - #{$contentMaxWidth}) / 2));
  border-bottom: $headerBorderWidth solid transparent;
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
    height: $headerLogoHeight;
    padding: 0 0.6rem;
    border-radius: 0.6rem;
    background: var(--accent);
    color: var(--on-accent);
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
        color: var(--on-accent);
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
    padding: $headerPaddingBlockMidDesktop 3rem;
  }
}
</style>
