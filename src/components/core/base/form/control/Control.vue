<script setup lang="ts">
import { computed } from 'vue'

export type IconSize = 'sm' | 'md' | 'lg'

export interface ControlProps {
  icon?: string
  validation?: boolean
  isValid?: boolean
  error?: string
  expanded?: boolean
  iconSize?: IconSize
}

const props = withDefaults(defineProps<ControlProps>(), {
  icon: undefined,
  validation: false,
  isValid: false,
  error: 'Please enter a valid value',
  expanded: false,
  iconSize: 'md',
  were: 'USDT',
})

const controlClasses = computed(() => [
  props.icon && `has-icon`,
  props.validation && `has-validation`,
  props.isValid && `is-valid`,
  !props.isValid && `is-invalid`,
  props.expanded && `is-expanded`,
  props.iconSize && `icon-size-${props.iconSize}`,
  props.were && `were-${props.iconSize}`,
])
</script>

<template>
  <div class="control" :class="controlClasses">
    <slot></slot>
    <div v-if="props.icon" class="form-icon">
      <i class="iconify" :data-icon="props.icon"></i>
    </div>
    <div
      v-if="props.validation && props.isValid"
      class="validation-icon valid-icon"
    >
      <!-- <i class="iconify" data-icon="feather:check"></i> -->
    </div>
    <div
      v-if="props.validation && !props.isValid"
      class="validation-icon invalid-icon"
    >
      <!-- <i class="iconify" data-icon="feather:x"></i> -->
    </div>
    <slot v-if="props.validation && !props.isValid" name="error">
      <span
        class="spanErrorModificado is-block text rem-75 text-danger px-1 pt-1"
      >
        {{ props.error }}
      </span>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.spanErrorModificado {
  text-transform: none !important;
}
.control {
  &.icon-size-lg {
    .form-icon {
      top: 8px !important;
    }
  }

  &.has-icon {
    position: relative;

    .form-icon {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      z-index: 1;

      .iconify {
        color: var(--input-form-icon-color);
        transition: color 0.3s;
      }
    }

    .input {
      &:focus ~ .form-icon {
        .iconify {
          color: var(--primary);
        }
      }
    }
  }

  &.has-validation {
    position: relative;

    .validation-icon {
      position: absolute;
      // top: 0;
      top: 10px !important;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
      z-index: 1;

      .iconify {
        transition: color 0.3s;
      }
    }

    &.is-valid {
      .validation-icon {
        .iconify {
          color: var(--success);
        }

        &.valid-icon {
          display: flex;
        }

        &.invalid-icon {
          display: none;
        }
      }
    }

    &.is-invalid {
      .validation-icon {
        .iconify {
          color: var(--danger);
        }

        &.valid-icon {
          display: none;
        }

        &.invalid-icon {
          display: flex;
        }
      }
    }
  }
}
</style>
