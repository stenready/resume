<template>
  <div data-component-name="TheBg" class="bg-aurora" aria-hidden="true">
    <span class="aurora-spot spot-blue"></span>
    <span class="aurora-spot spot-violet"></span>
    <span class="aurora-spot spot-cyan"></span>
    <span class="aurora-spot spot-deep-blue"></span>
  </div>
  <BgSkills />
</template>

<script setup>
import BgSkills from '@/components/the/BgSkills.vue'
</script>

<style scoped lang="scss">
$blue: 30, 144, 255;
$violet: 139, 92, 246;
$cyan: 34, 211, 238;
$deepBlue: 16, 95, 169;

.bg-aurora {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.aurora-spot {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(var(--spot-color), var(--aurora-opacity)) 0%,
    rgba(var(--spot-color), 0) 70%
  );
  will-change: transform;
  animation: drift var(--drift-duration) ease-in-out infinite alternate;
}

.spot-blue {
  --spot-color: #{$blue};
  --drift-duration: 28s;
  --drift-x: 18vw;
  --drift-y: 12vh;
  width: 70vmax;
  height: 70vmax;
  top: -30vmax;
  left: -20vmax;
}

.spot-violet {
  --spot-color: #{$violet};
  --drift-duration: 34s;
  --drift-x: -16vw;
  --drift-y: 18vh;
  width: 60vmax;
  height: 60vmax;
  top: -10vmax;
  right: -25vmax;
}

.spot-cyan {
  --spot-color: #{$cyan};
  --drift-duration: 40s;
  --drift-x: 20vw;
  --drift-y: -14vh;
  width: 55vmax;
  height: 55vmax;
  bottom: -30vmax;
  left: 10vmax;
}

.spot-deep-blue {
  --spot-color: #{$deepBlue};
  --drift-duration: 25s;
  --drift-x: -14vw;
  --drift-y: -16vh;
  width: 50vmax;
  height: 50vmax;
  bottom: -20vmax;
  right: -10vmax;
}

@keyframes drift {
  from {
    transform: translate(0, 0) scale(1);
  }

  to {
    transform: translate(var(--drift-x), var(--drift-y)) scale(1.15);
  }
}

@media (prefers-reduced-motion: reduce) {
  .aurora-spot {
    animation: none;
  }
}
</style>
