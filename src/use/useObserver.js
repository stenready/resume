import { SECTIONS_NAMES } from '@/constants.js'
import { onMounted, onUnmounted, ref } from 'vue'

const activeSection = ref(SECTIONS_NAMES.ABOUT_ME)
let observer = ref(null)

const createObserver = (listenIds) => {
  if (observer.value) {
    destroyObserver()
  }

  const options = {
    root: null,
    threshold: 0.25,
  }

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target?.id
      }
    })
  }, options)

  listenIds.forEach((id) => {
    const section = document.getElementById(id)
    if (section) {
      observer.value.observe(section)
    }
  })
}

function destroyObserver() {
  if (observer.value) {
    observer.value.disconnect()
  }
}

export default function useObserver(listenIds = []) {
  onMounted(() => {
    setTimeout(() => {
      createObserver(listenIds)
    }, 1200)
  })

  onUnmounted(() => {
    destroyObserver()
  })

  return {
    createObserver,
    observer,
    activeSection,
  }
}
