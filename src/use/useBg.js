import { reactive, ref } from 'vue'
import BIRDS from 'vanta/dist/vanta.birds.min'
import NET from 'vanta/dist/vanta.net.min.js'
import GLOBE from 'vanta/dist/vanta.globe.min.js'
import DOTS from 'vanta/dist/vanta.dots.min.js'

const bgList = reactive([
  {
    id: crypto.randomUUID(),
    bg: BIRDS,
    urlImage: '/images/birds.jpg',
    isActive: false,
    options: {
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      scale: 1.0,
      scaleMobile: 1.0,
      colorMode: 'variance',
      birdSize: 0.7,
      wingSpan: 10,
      speedLimit: 4,
      cohesion: 100.0,
    },
  },
  {
    id: crypto.randomUUID(),
    urlImage: '/images/net.jpg',
    isActive: false,
    bg: NET,
    options: {
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      scale: 1.0,
      scaleMobile: 1.0,
      points: 7.0,
      maxDistance: 30.0,
    },
  },
  {
    id: crypto.randomUUID(),
    urlImage: '/images/globe.jpg',
    isActive: false,
    bg: GLOBE,
    options: {},
  },
  {
    id: crypto.randomUUID(),
    urlImage: '/images/dots.jpg',
    isActive: false,
    bg: DOTS,
    options: {},
  },
])

const selectedBg = ref(bgList?.[0])

if (selectedBg.value) {
  selectedBg.value.isActive = true
}

const setActive = (item) => {
  if (!item) {
    console.error('required element bgListItem', item)
    return false
  }

  selectedBg.value = item
  bgList.forEach((iter) => {
    iter.isActive = item?.id === iter?.id
  })
}

export default function useBg() {
  return {
    bgList,
    setActive,
    selectedBg,
  }
}
