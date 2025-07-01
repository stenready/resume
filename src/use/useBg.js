import { reactive, ref } from 'vue'
import BIRDS from 'vanta/dist/vanta.birds.min'
import NET from 'vanta/dist/vanta.net.min.js'
import GLOBE from 'vanta/dist/vanta.globe.min.js'

const bgList = reactive([
  {
    id: 'birds',
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
    id: 'net',
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
    id: 'globe',
    urlImage: '/images/globe.jpg',
    isActive: false,
    bg: GLOBE,
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
