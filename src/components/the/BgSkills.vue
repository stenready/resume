<template>
  <canvas
    data-component-name="BgSkills"
    ref="canvasRef"
    class="bg-skills"
    aria-hidden="true"
  ></canvas>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useTheme from '@/use/useTheme.js'
import { BACKGROUND_SKILL_GROUPS } from '@/use/useBg.js'

const ICON_VIEWBOX = 24
const ICON_SIZE_MIN = 26
const ICON_SIZE_MAX = 38
const LABEL_FONT_SIZE = 12
const LABEL_GAP = 6
const TEXT_FONT_SIZE = 15

const ROW_ICON_SIZE = 20
const ROW_FONT_SIZE = 13
const ROW_ICON_GAP = 8
const ROW_HEIGHT = 28
const GROUP_GAP = 18

const CONTENT_MAX_WIDTH = 1024
const COLUMN_GAP = 24
const MIN_COLUMN_WIDTH = 140
const COLUMNS_TOP = 190
const COLUMNS_BOTTOM_MARGIN = 40
const COLUMN_EDGE_MARGIN = 8
const ROW_LINE_HEIGHT = 17

const INTRO_DELAY = 500
const APPEAR_WINDOW = 1600
const APPEAR_DURATION = 700
const SCATTER_PAUSE = 1400
const GATHER_STAGGER = 110
const FLIGHT_DURATION = 1800
const FLIGHT_MORPH_START = 0.7
const APPEAR_SCALE = 0.85
const FLIGHT_CURVE = 70
const TRAIL_LENGTH = 8
const TRAIL_WIDTH = 1.5
const TRAIL_OPACITY = 0.2

const SCATTER_TOP = 80
const SCATTER_MARGIN = 60
const SCATTER_CANDIDATES = 24

const SPAWN_WINDOW = 5000
const FLOAT_LIFETIME_MIN = 6000
const FLOAT_LIFETIME_MAX = 11000
const RESPAWN_DELAY_MAX = 3000
const FADE_DURATION = 800

const RISE_SPEED_MIN = 6
const RISE_SPEED_MAX = 18
const SWAY_AMPLITUDE = 10
const SWAY_SPEED = 0.35

const REPEL_RADIUS = 140
const REPEL_FORCE = 0.8
const DAMPING = 0.9

const ACCENT_RGB = '30, 144, 255'
const INTRO_OPACITY_LIGHT = 0.6
const INTRO_OPACITY_DARK = 0.7
const FLOATING_OPACITY_LIGHT = 0.22
const FLOATING_OPACITY_DARK = 0.32
const DOCKED_OPACITY_LIGHT = 0.85
const DOCKED_OPACITY_DARK = 0.9

const MOBILE_BREAKPOINT = 768
const MOBILE_SKILLS_LIMIT = 16

const STATE = {
  WAITING: 'waiting',
  FLOATING: 'floating',
  FLYING: 'flying',
  DOCKED: 'docked',
  LEAVING: 'leaving',
}

const canvasRef = ref(null)
const { getCurrentTheme } = useTheme()

let ctx = null
let particles = []
let rafId = null
let lastFrameTime = null
let width = 0
let height = 0
let reducedMotionQuery = null
let columnsMode = false
const pointer = { x: -Infinity, y: -Infinity }

const randomBetween = (min, max) => min + Math.random() * (max - min)
const clamp01 = (value) => Math.min(1, Math.max(0, value))

const easeOutCubic = (t) => 1 - (1 - t) ** 3
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

const quadraticBezier = (from, control, to, t) => ({
  x: (1 - t) ** 2 * from.x + 2 * (1 - t) * t * control.x + t ** 2 * to.x,
  y: (1 - t) ** 2 * from.y + 2 * (1 - t) * t * control.y + t ** 2 * to.y,
})

const getGutterWidth = () => (width - CONTENT_MAX_WIDTH) / 2

const hasRoomForColumns = (columnsHeight) => {
  const neededHeight = COLUMNS_TOP + columnsHeight + COLUMNS_BOTTOM_MARGIN
  return getGutterWidth() >= MIN_COLUMN_WIDTH + COLUMN_GAP && height >= neededHeight
}

const getRowIconWidth = (skill) => (skill.path ? ROW_ICON_SIZE + ROW_ICON_GAP : 0)

const measureText = (text) => {
  ctx.font = `700 ${ROW_FONT_SIZE}px Inter, system-ui, sans-serif`
  return ctx.measureText(text).width
}

const getColumnAvailableWidth = () => getGutterWidth() - COLUMN_GAP - COLUMN_EDGE_MARGIN

const splitRowLines = (skill) => {
  const maxTextWidth = getColumnAvailableWidth() - getRowIconWidth(skill)

  return skill.label.split(' ').reduce((lines, word) => {
    const lastLine = lines[lines.length - 1]
    const joined = `${lastLine} ${word}`

    if (lastLine !== undefined && measureText(joined) <= maxTextWidth) {
      lines[lines.length - 1] = joined
    } else {
      lines.push(word)
    }

    return lines
  }, [])
}

const measureRowWidth = (particle) =>
  getRowIconWidth(particle) + Math.max(...particle.rowLines.map(measureText))

const assignSlot = (particle) => {
  const gutterWidth = getGutterWidth()
  const edgeX = particle.isLeft ? gutterWidth - COLUMN_GAP : width - gutterWidth + COLUMN_GAP

  particle.rowWidth = measureRowWidth(particle)

  const halfRowWidth = particle.rowWidth / 2
  particle.slot = {
    x: particle.isLeft ? edgeX - halfRowWidth : edgeX + halfRowWidth,
    y: COLUMNS_TOP + particle.columnY,
  }
}

const resizeCanvas = () => {
  const canvas = canvasRef.value
  const pixelRatio = window.devicePixelRatio || 1

  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
}

const createParticle = (skill, isLeft, columnY) => ({
  label: skill.label,
  path: skill.path ? new Path2D(skill.path) : null,
  size: skill.path ? randomBetween(ICON_SIZE_MIN, ICON_SIZE_MAX) : 0,
  riseSpeed: randomBetween(RISE_SPEED_MIN, RISE_SPEED_MAX),
  state: STATE.WAITING,
  stateUntil: 0,
  x: 0,
  y: 0,
  anchorX: 0,
  swayPhase: randomBetween(0, Math.PI * 2),
  alpha: 0,
  scale: 1,
  rowness: 0,
  isLeft,
  columnY,
  slot: null,
  rowWidth: 0,
  rowLines: [skill.label],
  scatterPoint: null,
  departAt: 0,
  appearedAt: null,
  flight: null,
  trail: [],
  pushX: 0,
  pushY: 0,
})

const createParticles = () => {
  const isNarrow = width < MOBILE_BREAKPOINT
  const columnHeights = { left: 0, right: 0 }

  const allParticles = BACKGROUND_SKILL_GROUPS.flatMap((group) => {
    if (columnHeights[group.side] > 0) {
      columnHeights[group.side] += GROUP_GAP
    }

    return group.skills.map((skill) => {
      const particle = createParticle(skill, group.side === 'left', columnHeights[group.side])
      particle.rowLines = splitRowLines(skill)
      columnHeights[group.side] += ROW_HEIGHT + (particle.rowLines.length - 1) * ROW_LINE_HEIGHT
      return particle
    })
  })

  particles = isNarrow ? allParticles.slice(0, MOBILE_SKILLS_LIMIT) : allParticles
  columnsMode = !isNarrow && hasRoomForColumns(Math.max(columnHeights.left, columnHeights.right))
}

const randomScatterPoint = () => ({
  x: randomBetween(SCATTER_MARGIN, width - SCATTER_MARGIN),
  y: randomBetween(SCATTER_TOP, height - SCATTER_MARGIN),
})

const distanceToNearest = (point, points) =>
  Math.min(Infinity, ...points.map((other) => Math.hypot(other.x - point.x, other.y - point.y)))

const spreadPoints = (count, taken = []) => {
  const points = []

  for (let idx = 0; idx < count; idx++) {
    const occupied = [...taken, ...points]
    const candidates = Array.from({ length: SCATTER_CANDIDATES }, randomScatterPoint)
    points.push(
      candidates.reduce((best, point) =>
        distanceToNearest(point, occupied) > distanceToNearest(best, occupied) ? point : best,
      ),
    )
  }

  return points
}

const pairScatterPoints = () => {
  const points = spreadPoints(particles.length).sort((a, b) => a.x - b.x)
  const byColumnY = (a, b) => a.columnY - b.columnY
  const byY = (a, b) => a.y - b.y
  const leftParticles = particles.filter(({ isLeft }) => isLeft).sort(byColumnY)
  const rightParticles = particles.filter(({ isLeft }) => !isLeft).sort(byColumnY)
  const leftPoints = points.slice(0, leftParticles.length).sort(byY)
  const rightPoints = points.slice(leftParticles.length).sort(byY)

  leftParticles.forEach((particle, idx) => (particle.scatterPoint = leftPoints[idx]))
  rightParticles.forEach((particle, idx) => (particle.scatterPoint = rightPoints[idx]))
}

const startIntro = (now) => {
  pairScatterPoints()

  const gatherStart = INTRO_DELAY + APPEAR_WINDOW + APPEAR_DURATION + SCATTER_PAUSE
  const byRow = [...particles].sort((a, b) => a.columnY - b.columnY)

  byRow.forEach((particle, order) => {
    assignSlot(particle)
    particle.state = STATE.WAITING
    particle.stateUntil = now + INTRO_DELAY + randomBetween(0, APPEAR_WINDOW)
    particle.departAt = now + gatherStart + order * GATHER_STAGGER
  })
}

const scheduleSpawn = (particle, now, maxDelay) => {
  particle.state = STATE.WAITING
  particle.stateUntil = now + randomBetween(0, maxDelay)
  particle.alpha = 0
}

const startFloating = (now) => {
  particles.forEach((particle) => scheduleSpawn(particle, now, SPAWN_WINDOW))
}

const placeInColumns = () => {
  particles.forEach((particle) => {
    assignSlot(particle)
    particle.alpha = 1
    particle.scale = 1
    particle.rowness = 1
    particle.x = particle.slot.x
    particle.y = particle.slot.y
    particle.state = STATE.DOCKED
  })
}

const appear = (particle, now) => {
  const point = columnsMode
    ? particle.scatterPoint
    : spreadPoints(
        1,
        particles.filter(({ alpha }) => alpha > 0),
      )[0]

  particle.x = point.x
  particle.y = point.y
  particle.anchorX = point.x
  particle.appearedAt = now
  particle.state = STATE.FLOATING
  particle.stateUntil = columnsMode
    ? particle.departAt
    : now + randomBetween(FLOAT_LIFETIME_MIN, FLOAT_LIFETIME_MAX)
}

const getCurveControl = (from, to, isLeft) => {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1
  const bend = FLIGHT_CURVE * (isLeft ? 1 : -1)

  return {
    x: (from.x + to.x) / 2 + (-dy / length) * bend,
    y: (from.y + to.y) / 2 + (dx / length) * bend,
  }
}

const takeOff = (particle, now) => {
  const from = { x: particle.x, y: particle.y }

  particle.flight = {
    from,
    control: getCurveControl(from, particle.slot, particle.isLeft),
    startTime: now,
  }
  particle.trail = []
  particle.state = STATE.FLYING
}

const float = (particle, seconds) => {
  particle.swayPhase += SWAY_SPEED * seconds
  particle.x = particle.anchorX + Math.sin(particle.swayPhase) * SWAY_AMPLITUDE
  particle.y -= particle.riseSpeed * seconds
}

const getAppearProgress = (particle, now) =>
  particle.appearedAt === null ? 1 : clamp01((now - particle.appearedAt) / APPEAR_DURATION)

const fly = (particle, now) => {
  const t = clamp01((now - particle.flight.startTime) / FLIGHT_DURATION)
  const { from, control } = particle.flight
  const point = quadraticBezier(from, control, particle.slot, easeInOutCubic(t))

  particle.trail.push({ x: particle.x, y: particle.y })
  if (particle.trail.length > TRAIL_LENGTH) {
    particle.trail.shift()
  }

  particle.x = point.x
  particle.y = point.y
  particle.rowness = clamp01((t - FLIGHT_MORPH_START) / (1 - FLIGHT_MORPH_START))

  if (t >= 1) {
    particle.x = particle.slot.x
    particle.y = particle.slot.y
    particle.flight = null
    particle.trail = []
    particle.state = STATE.DOCKED
  }
}

const applyPointer = (particle) => {
  const dx = particle.x + particle.pushX - pointer.x
  const dy = particle.y + particle.pushY - pointer.y
  const distance = Math.hypot(dx, dy)

  if (distance > 0 && distance < REPEL_RADIUS) {
    const strength = (1 - distance / REPEL_RADIUS) * REPEL_FORCE
    particle.pushX += (dx / distance) * strength
    particle.pushY += (dy / distance) * strength
  }

  particle.pushX *= DAMPING
  particle.pushY *= DAMPING
}

const updateParticle = (particle, now, seconds) => {
  switch (particle.state) {
    case STATE.WAITING:
      if (now >= particle.stateUntil) {
        appear(particle, now)
      }
      break

    case STATE.FLOATING: {
      const progress = getAppearProgress(particle, now)
      particle.alpha = easeOutCubic(progress)
      particle.scale = APPEAR_SCALE + (1 - APPEAR_SCALE) * easeOutCubic(progress)
      float(particle, seconds)

      if (now >= particle.stateUntil) {
        if (columnsMode) {
          takeOff(particle, now)
        } else {
          particle.state = STATE.LEAVING
        }
      }
      break
    }

    case STATE.FLYING:
      fly(particle, now)
      break

    case STATE.LEAVING:
      particle.alpha -= (seconds * 1000) / FADE_DURATION
      float(particle, seconds)

      if (particle.alpha <= 0) {
        scheduleSpawn(particle, now, RESPAWN_DELAY_MAX)
      }
      break
  }

  applyPointer(particle)
}

const drawFloating = (particle, x, y) => {
  if (!particle.path) {
    ctx.font = `700 ${TEXT_FONT_SIZE}px Inter, system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(particle.label, x, y)
    return
  }

  const scale = particle.size / ICON_VIEWBOX

  ctx.save()
  ctx.translate(x - particle.size / 2, y)
  ctx.scale(scale, scale)
  ctx.fill(particle.path)
  ctx.restore()

  ctx.font = `600 ${LABEL_FONT_SIZE}px Inter, system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'
  ctx.fillText(particle.label, x, y + particle.size + LABEL_GAP)
}

const drawRow = (particle, x, y) => {
  const middleY = y + ROW_ICON_SIZE / 2
  const iconWidth = particle.path ? ROW_ICON_SIZE + ROW_ICON_GAP : 0
  const rowStartX = x - particle.rowWidth / 2

  ctx.font = `700 ${ROW_FONT_SIZE}px Inter, system-ui, sans-serif`
  ctx.textBaseline = 'middle'

  if (particle.path) {
    const scale = ROW_ICON_SIZE / ICON_VIEWBOX

    ctx.save()
    ctx.translate(rowStartX, y)
    ctx.scale(scale, scale)
    ctx.fill(particle.path)
    ctx.restore()
  }

  ctx.textAlign = 'left'
  particle.rowLines.forEach((line, idx) => {
    ctx.fillText(line, rowStartX + iconWidth, middleY + idx * ROW_LINE_HEIGHT)
  })
}

const drawTrail = (particle) => {
  const points = [...particle.trail, { x: particle.x, y: particle.y }]

  ctx.lineCap = 'round'
  for (let idx = 1; idx < points.length; idx++) {
    const share = idx / points.length
    ctx.globalAlpha = TRAIL_OPACITY * share
    ctx.lineWidth = TRAIL_WIDTH * share
    ctx.beginPath()
    ctx.moveTo(points[idx - 1].x, points[idx - 1].y)
    ctx.lineTo(points[idx].x, points[idx].y)
    ctx.stroke()
  }
}

const draw = () => {
  const isDark = getCurrentTheme.value.isDark
  const floatingOpacity = columnsMode
    ? isDark
      ? INTRO_OPACITY_DARK
      : INTRO_OPACITY_LIGHT
    : isDark
      ? FLOATING_OPACITY_DARK
      : FLOATING_OPACITY_LIGHT
  const dockedOpacity = isDark ? DOCKED_OPACITY_DARK : DOCKED_OPACITY_LIGHT

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = `rgb(${ACCENT_RGB})`
  ctx.strokeStyle = `rgb(${ACCENT_RGB})`

  particles.forEach((particle) => {
    if (particle.alpha <= 0) {
      return
    }

    if (particle.trail.length) {
      drawTrail(particle)
    }

    ctx.save()
    ctx.translate(particle.x + particle.pushX, particle.y + particle.pushY)
    ctx.scale(particle.scale, particle.scale)

    if (particle.rowness < 1) {
      ctx.globalAlpha = particle.alpha * (1 - particle.rowness) * floatingOpacity
      drawFloating(particle, 0, 0)
    }

    if (particle.rowness > 0) {
      ctx.globalAlpha = particle.alpha * particle.rowness * dockedOpacity
      drawRow(particle, 0, 0)
    }

    ctx.restore()
  })

  ctx.globalAlpha = 1
}

const hasAssembled = () => columnsMode && particles.every(({ state }) => state === STATE.DOCKED)

const tick = (now) => {
  const seconds = lastFrameTime === null ? 0 : (now - lastFrameTime) / 1000
  lastFrameTime = now

  particles.forEach((particle) => updateParticle(particle, now, seconds))
  draw()
  rafId = requestAnimationFrame(tick)
}

const showStill = () => {
  if (columnsMode) {
    placeInColumns()
  } else {
    const points = spreadPoints(particles.length)
    particles.forEach((particle, idx) => {
      particle.alpha = 1
      particle.x = points[idx].x
      particle.y = points[idx].y
      particle.state = STATE.FLOATING
    })
  }

  draw()
}

const start = () => {
  if (reducedMotionQuery.matches) {
    showStill()
    return
  }

  if (rafId === null && !document.hidden) {
    lastFrameTime = null
    rafId = requestAnimationFrame(tick)
  }
}

const stop = () => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

const restart = () => {
  stop()
  createParticles()

  const now = performance.now()
  if (columnsMode) {
    startIntro(now)
  } else {
    startFloating(now)
  }

  start()
}

const onResize = () => {
  const previousWidth = width
  const wasAssembled = hasAssembled()
  resizeCanvas()

  if (width === previousWidth) {
    return
  }

  if (!wasAssembled) {
    restart()
    return
  }

  createParticles()

  if (columnsMode) {
    placeInColumns()
  } else {
    startFloating(performance.now())
  }

  if (rafId === null) {
    draw()
  }
}

const onPointerMove = (event) => {
  pointer.x = event.clientX
  pointer.y = event.clientY
}

const onPointerLeave = () => {
  pointer.x = -Infinity
  pointer.y = -Infinity
}

const onVisibilityChange = () => (document.hidden ? stop() : start())

watch(
  () => getCurrentTheme.value.isDark,
  () => {
    if (ctx && rafId === null) {
      draw()
    }
  },
)

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  resizeCanvas()
  restart()

  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove)
  document.documentElement.addEventListener('pointerleave', onPointerLeave)
  document.addEventListener('visibilitychange', onVisibilityChange)
  reducedMotionQuery.addEventListener('change', restart)
})

onBeforeUnmount(() => {
  stop()
  window.removeEventListener('resize', onResize)
  window.removeEventListener('pointermove', onPointerMove)
  document.documentElement.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibilityChange)
  reducedMotionQuery.removeEventListener('change', restart)
})
</script>

<style scoped lang="scss">
.bg-skills {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
