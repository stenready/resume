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

      <section :id="SECTIONS_NAMES.PROJECTS">
        <ProjectsSection />
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
import { SECTIONS_NAMES } from '@/constants.js'
import TheBg from '@/components/the/TheBg.vue'
import TheHeader from '@/components/the/TheHeader.vue'
import TheSettingsPanel from '@/components/the/TheSettingsPanel.vue'
import TheFooter from '@/components/the/TheFooter.vue'
import AboutMeSection from '@/components/sections/AboutMeSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ArticlesSection from '@/components/sections/ArticlesSection.vue'
import ContactsSection from '@/components/sections/ContactsSection.vue'
</script>
