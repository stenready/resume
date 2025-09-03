<template>
  <button
    :aria-label="ariaLabel"
    v-bind="attrs"
    :class="[classes]"
    :id="id"
    data-component-name="BaseButton"
    class="BaseButton"
    type="button"
  >
    <span v-if="$slots.icon" class="icon">
      <slot name="icon"></slot>
    </span>

    <slot></slot>
  </button>
</template>

<script setup>
import { computed, useAttrs } from 'vue'

//props
const props = defineProps({
  id: {
    type: String,
    default: '',
    required: true,
  },
  ariaLabel: {
    type: String,
    default: '',
    required: true,
  },
  isLink: {
    type: Boolean,
    default: false,
    required: false,
  },
  size: {
    type: String,
    default: '',
    required: false,
    validator: (value) => {
      const validTypes = ['small', '']
      return validTypes.includes(value)
    },
  },
  type: {
    type: String,
    default: 'main',
    required: false,
    validator: (value) => {
      const validTypes = ['rounded', 'circle', 'main', 'social', 'rounded-outline']
      return validTypes.includes(value)
    },
  },
})

///vars
const attrs = useAttrs()

//computed
const classes = computed(() => {
  let classNames = ''
  if (props?.size) {
    classNames += ' ' + props?.size
  }

  if (props.type) {
    classNames += ' ' + props?.type
  }

  if (props.isLink) {
    classNames += ' ' + 'link-btn'
  }

  return classNames
})
</script>

<style lang="scss">
$buttonPadding: 0.75rem 1.5rem;
$paddingSmall: 0.55rem;

.BaseButton {
  background: var(--card-bg);
  color: var(--text);
  border: 1.5px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  padding: $buttonPadding;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px var(--shadow-light);
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background: var(--accent);
    color: #fff;
    box-shadow: 0 6px 12px var(--accent);
    transform: translateY(-2px);
  }

  &.small {
    padding: $paddingSmall;
  }

  &.social {
    padding: 0;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transform-origin: center;

    a {
      color: inherit !important;
      font-size: 1.25rem;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      transform: scale(1.15);
    }
  }

  &.rounded-outline {
    background-color: var(--card-color);
    color: var(--accent);
    border: 2px solid var(--accent);
    border-radius: 2rem;
    font-weight: 600;
    font-size: 1rem;
    box-shadow: none;

    &.link-btn {
      padding: 0;

      a {
        color: inherit !important;
        text-decoration: none;
        padding: $buttonPadding;
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    &:hover {
      background-color: var(--accent);
      color: var(--white);
      transform: none;
    }
  }
}
</style>
