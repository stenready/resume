<template>
  <component
    :is="tag"
    :id="id"
    :aria-label="ariaLabel || undefined"
    :type="tag === 'button' ? 'button' : undefined"
    :class="['BaseButton', variant, size]"
    data-component-name="BaseButton"
  >
    <span v-if="$slots.icon" class="icon">
      <slot name="icon"></slot>
    </span>

    <slot></slot>
  </component>
</template>

<script>
const TAGS = ['button', 'a']
const SIZES = ['small', '']
const VARIANTS = ['main', 'social', 'rounded-outline']
</script>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  ariaLabel: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: 'button',
    validator: (value) => TAGS.includes(value),
  },
  size: {
    type: String,
    default: '',
    validator: (value) => SIZES.includes(value),
  },
  variant: {
    type: String,
    default: 'main',
    validator: (value) => VARIANTS.includes(value),
  },
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
  text-decoration: none;
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
    color: var(--on-accent);
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
    font-size: 1.25rem;
    transform-origin: center;

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
    gap: 10px;
    box-shadow: none;

    &:hover {
      background-color: var(--accent);
      color: var(--on-accent);
      transform: none;
    }
  }
}
</style>
