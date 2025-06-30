<template>
  <div class="app" data-page-name="App">
    <TheBg />
    <TheHeader />
    <TheSettingsPanel />

    <main>
      <section :id="SECTIONS_NAMES.ABOUT_ME">
        <AboutMeSection />
      </section>

      <section :id="SECTIONS_NAMES.EXPERIENCE">
        <ExperienceSection />
      </section>

      <section :id="SECTIONS_NAMES.SKILLS">
        <SkillsSection />
      </section>

      <section :id="SECTIONS_NAMES.ARTICLES">
        <ArticlesSection />
      </section>

      <section :id="SECTIONS_NAMES.CONTACTS">
        <ContactsSection />
      </section>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
//imports
import { defineAsyncComponent } from 'vue'
import { SECTIONS_NAMES } from '@/constants.js'

//components
const TheBg = defineAsyncComponent(() => import('@/components/the/TheBg.vue'))
const TheHeader = defineAsyncComponent(() => import('@/components/the/TheHeader.vue'))
const TheSettingsPanel = defineAsyncComponent(() => import('@/components/the/TheSettingsPanel.vue'))
const AboutMeSection = defineAsyncComponent(
  () => import('@/components/sections/AboutMeSection.vue'),
)
const ExperienceSection = defineAsyncComponent(
  () => import('@/components/sections/ExperienceSection.vue'),
)

const SkillsSection = defineAsyncComponent(() => import('@/components/sections/SkillsSection.vue'))

const ArticlesSection = defineAsyncComponent(
  () => import('@/components/sections/ArticlesSection.vue'),
)

const ContactsSection = defineAsyncComponent(
  () => import('@/components/sections/ContactsSection.vue'),
)

const TheFooter = defineAsyncComponent(() => import('@/components/the/TheFooter.vue'))
</script>
