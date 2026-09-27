<template>
  <canvas
    data-component-name="BgSkills"
    ref="canvasRef"
    class="bg-skills"
    aria-hidden="true"
  ></canvas>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useTheme from '@/use/useTheme'
import { BACKGROUND_SKILL_GROUPS, type BackgroundSkill } from '@/use/useBg'

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
} as const

type ParticleState = (typeof STATE)[keyof typeof STATE]
type Side = 'left' | 'right'

interface Point {
  x: number
  y: number
}

interface Flight {
  from: Point
  control: Point
  startTime: number
}

interface Particle extends Point {
  label: string
  path: Path2D | null
  size: number
  riseSpeed: number
  state: ParticleState
  stateUntil: number
  anchorX: number
  swayPhase: number
  alpha: number
  scale: number
  rowness: number
  isLeft: boolean
  columnY: number
  slot: Point
  rowWidth: number
  rowLines: string[]
  scatterPoint: Point
  departAt: number
  appearedAt: number | null
  flight: Flight | null
  trail: Point[]
  pushX: number
  pushY: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { getCurrentTheme } = useTheme()

let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let rafId: number | null = null
let lastFrameTime: number | null = null
let width = 0
let height = 0
let reducedMotionQuery: MediaQueryList | null = null
let columnsMode = false
const pointer: Point = { x: -Infinity, y: -Infinity }

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)
const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

const quadraticBezier = (from: Point, control: Point, to: Point, t: number): Point => ({
  x: (1 - t) ** 2 * from.x + 2 * (1 - t) * t * control.x + t ** 2 * to.x,
  y: (1 - t) ** 2 * from.y + 2 * (1 - t) * t * control.y + t ** 2 * to.y,
})

const getGutterWidth = () => (width - CONTENT_MAX_WIDTH) / 2

const hasRoomForColumns = (columnsHeight: number) => {
  const neededHeight = COLUMNS_TOP + columnsHeight + COLUMNS_BOTTOM_MARGIN
  return getGutterWidth() >= MIN_COLUMN_WIDTH + COLUMN_GAP && height >= neededHeight
}

const getRowIconWidth = (skill: { path?: unknown }) =>
  skill.path ? ROW_ICON_SIZE + ROW_ICON_GAP : 0

const measureText = (text: string) => {
  if (!ctx) {
    return 0
  }

  ctx.font = `700 ${ROW_FONT_SIZE}px Inter, system-ui, sans-serif`
  return ctx.measureText(text).width
}

const getColumnAvailableWidth = () => getGutterWidth() - COLUMN_GAP - COLUMN_EDGE_MARGIN

const splitRowLines = (skill: BackgroundSkill) => {
  const maxTextWidth = getColumnAvailableWidth() - getRowIconWidth(skill)

  return skill.label.split(' ').reduce<string[]>((lines, word) => {
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

const measureRowWidth = (particle: Particle) =>
  getRowIconWidth(particle) + Math.max(...particle.rowLines.map(measureText))

const assignSlot = (particle: Particle) => {
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
  if (!canvas || !ctx) {
    return
  }

  const pixelRatio = window.devicePixelRatio || 1

  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
}

const createParticle = (skill: BackgroundSkill, isLeft: boolean, columnY: number): Particle => ({
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
  slot: { x: 0, y: 0 },
  rowWidth: 0,
  rowLines: [skill.label],
  scatterPoint: { x: 0, y: 0 },
  departAt: 0,
  appearedAt: null,
  flight: null,
  trail: [],
  pushX: 0,
  pushY: 0,
})

const createParticles = () => {
  const isNarrow = width < MOBILE_BREAKPOINT
  const columnHeights: Record<Side, number> = { left: 0, right: 0 }

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

const randomScatterPoint = (): Point => ({
  x: randomBetween(SCATTER_MARGIN, width - SCATTER_MARGIN),
  y: randomBetween(SCATTER_TOP, height - SCATTER_MARGIN),
})

const distanceToNearest = (point: Point, points: Point[]) =>
  Math.min(Infinity, ...points.map((other) => Math.hypot(other.x - point.x, other.y - point.y)))

const spreadPoints = (count: number, taken: Point[] = []) => {
  const points: Point[] = []

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
  const byColumnY = (a: Particle, b: Particle) => a.columnY - b.columnY
  const byY = (a: Point, b: Point) => a.y - b.y
  const leftParticles = particles.filter(({ isLeft }) => isLeft).sort(byColumnY)
  const rightParticles = particles.filter(({ isLeft }) => !isLeft).sort(byColumnY)
  const leftPoints = points.slice(0, leftParticles.length).sort(byY)
  const rightPoints = points.slice(leftParticles.length).sort(byY)

  leftParticles.forEach((particle, idx) => (particle.scatterPoint = leftPoints[idx]))
  rightParticles.forEach((particle, idx) => (particle.scatterPoint = rightPoints[idx]))
}

const startIntro = (now: number) => {
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

const scheduleSpawn = (particle: Particle, now: number, maxDelay: number) => {
  particle.state = STATE.WAITING
  particle.stateUntil = now + randomBetween(0, maxDelay)
  particle.alpha = 0
}

const startFloating = (now: number) => {
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

const appear = (particle: Particle, now: number) => {
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

const getCurveControl = (from: Point, to: Point, isLeft: boolean): Point => {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.hypot(dx, dy) || 1
  const bend = FLIGHT_CURVE * (isLeft ? 1 : -1)

  return {
    x: (from.x + to.x) / 2 + (-dy / length) * bend,
    y: (from.y + to.y) / 2 + (dx / length) * bend,
  }
}

const takeOff = (particle: Particle, now: number) => {
  const from = { x: particle.x, y: particle.y }

  particle.flight = {
    from,
    control: getCurveControl(from, particle.slot, particle.isLeft),
    startTime: now,
  }
  particle.trail = []
  particle.state = STATE.FLYING
}

const float = (particle: Particle, seconds: number) => {
  particle.swayPhase += SWAY_SPEED * seconds
  particle.x = particle.anchorX + Math.sin(particle.swayPhase) * SWAY_AMPLITUDE
  particle.y -= particle.riseSpeed * seconds
}

const getAppearProgress = (particle: Particle, now: number) =>
  particle.appearedAt === null ? 1 : clamp01((now - particle.appearedAt) / APPEAR_DURATION)

const fly = (particle: Particle, now: number) => {
  if (!particle.flight) {
    return
  }

  const { from, control, startTime } = particle.flight
  const t = clamp01((now - startTime) / FLIGHT_DURATION)
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

const applyPointer = (particle: Particle) => {
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

const updateParticle = (particle: Particle, now: number, seconds: number) => {
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

const drawFloating = (
  context: CanvasRenderingContext2D,
  particle: Particle,
  x: number,
  y: number,
) => {
  if (!particle.path) {
    context.font = `700 ${TEXT_FONT_SIZE}px Inter, system-ui, sans-serif`
    context.textAlign = 'center'
    context.textBaseline = 'top'
    context.fillText(particle.label, x, y)
    return
  }

  const scale = particle.size / ICON_VIEWBOX

  context.save()
  context.translate(x - particle.size / 2, y)
  context.scale(scale, scale)
  context.fill(particle.path)
  context.restore()

  context.font = `600 ${LABEL_FONT_SIZE}px Inter, system-ui, sans-serif`
  context.textAlign = 'center'
  context.textBaseline = 'top'
  context.fillText(particle.label, x, y + particle.size + LABEL_GAP)
}

const drawRow = (context: CanvasRenderingContext2D, particle: Particle, x: number, y: number) => {
  const middleY = y + ROW_ICON_SIZE / 2
  const iconWidth = particle.path ? ROW_ICON_SIZE + ROW_ICON_GAP : 0
  const rowStartX = x - particle.rowWidth / 2

  context.font = `700 ${ROW_FONT_SIZE}px Inter, system-ui, sans-serif`
  context.textBaseline = 'middle'

  if (particle.path) {
    const scale = ROW_ICON_SIZE / ICON_VIEWBOX

    context.save()
    context.translate(rowStartX, y)
    context.scale(scale, scale)
    context.fill(particle.path)
    context.restore()
  }

  context.textAlign = 'left'
  particle.rowLines.forEach((line, idx) => {
    context.fillText(line, rowStartX + iconWidth, middleY + idx * ROW_LINE_HEIGHT)
  })
}

const drawTrail = (context: CanvasRenderingContext2D, particle: Particle) => {
  const points = [...particle.trail, { x: particle.x, y: particle.y }]

  context.lineCap = 'round'
  for (let idx = 1; idx < points.length; idx++) {
    const share = idx / points.length
    context.globalAlpha = TRAIL_OPACITY * share
    context.lineWidth = TRAIL_WIDTH * share
    context.beginPath()
    context.moveTo(points[idx - 1].x, points[idx - 1].y)
    context.lineTo(points[idx].x, points[idx].y)
    context.stroke()
  }
}

const draw = () => {
  const context = ctx
  if (!context) {
    return
  }

  const isDark = getCurrentTheme.value.isDark
  const floatingOpacity = columnsMode
    ? isDark
      ? INTRO_OPACITY_DARK
      : INTRO_OPACITY_LIGHT
    : isDark
      ? FLOATING_OPACITY_DARK
      : FLOATING_OPACITY_LIGHT
  const dockedOpacity = isDark ? DOCKED_OPACITY_DARK : DOCKED_OPACITY_LIGHT

  context.clearRect(0, 0, width, height)
  context.fillStyle = `rgb(${ACCENT_RGB})`
  context.strokeStyle = `rgb(${ACCENT_RGB})`

  particles.forEach((particle) => {
    if (particle.alpha <= 0) {
      return
    }

    if (particle.trail.length) {
      drawTrail(context, particle)
    }

    context.save()
    context.translate(particle.x + particle.pushX, particle.y + particle.pushY)
    context.scale(particle.scale, particle.scale)

    if (particle.rowness < 1) {
      context.globalAlpha = particle.alpha * (1 - particle.rowness) * floatingOpacity
      drawFloating(context, particle, 0, 0)
    }

    if (particle.rowness > 0) {
      context.globalAlpha = particle.alpha * particle.rowness * dockedOpacity
      drawRow(context, particle, 0, 0)
    }

    context.restore()
  })

  context.globalAlpha = 1
}

const hasAssembled = () => columnsMode && particles.every(({ state }) => state === STATE.DOCKED)

const tick = (now: number) => {
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
  if (reducedMotionQuery?.matches) {
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

const onPointerMove = (event: PointerEvent) => {
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
  ctx = canvasRef.value?.getContext('2d') ?? null
  if (!ctx) {
    return
  }

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
  reducedMotionQuery?.removeEventListener('change', restart)
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
