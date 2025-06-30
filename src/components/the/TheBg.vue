<template>
  <div ref="wrapRef" class="bg"></div>
</template>

<script setup>
//imports
import useTheme from '@/use/useTheme.js'
import useBg from '@/use/useBg.js'
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { BG_ENUMS } from '@/constants.js'

const { selectedBg } = useBg()

//custom hooks
const { getCurrentTheme } = useTheme()

//vars
const wrapRef = ref(null)
let vantaElement = null

//computed
const getColor = computed(() => {
  return getCurrentTheme.value.isDark ? BG_ENUMS.DARK : BG_ENUMS.WHITE
})

//watches
watch([() => getCurrentTheme.value?.isDark, () => selectedBg.value], () => {
  initVanta()
})

//methods
const destroyVanta = () => {
  if (vantaElement) {
    vantaElement.destroy()
  }
}

const initVanta = () => {
  destroyVanta()

  vantaElement = selectedBg.value.bg({
    el: wrapRef.value,
    backgroundColor: getColor.value,
    ...selectedBg.value.options,
  })
}

//hooks
onMounted(() => {
  initVanta()
})

onBeforeUnmount(() => {
  destroyVanta()
})
</script>

<style scoped lang="scss">
.bg {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
}
</style>
