<script setup lang="ts">
import { computed } from 'vue'

export type FieldLabelType = 'hero'

export interface FieldLabelProps {
  label: string
  type?: FieldLabelType
}

const props = withDefaults(defineProps<FieldLabelProps>(), {
  label: '',
  type: undefined,
})

const buttonClasses = computed(() => [props.type && `is-${props.type}`])
</script>

<template>
  <span class="field-label" :class="buttonClasses">
    <slot>{{ props.label }}</slot>
  </span>
</template>

<style lang="scss" scoped>
.field-label {
  font-family: var(--font);
  font-size: 0.9rem;
  color: var(--medium-text);

  &.is-hero {
    font-size: 18px;
    color: #6342ff;
    line-height: 1.556;
  }
}
</style>
