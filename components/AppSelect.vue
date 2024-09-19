<template>
  <n-select
    :value="modelValue"
    :options="options"
    class="min-w-[65px] !border-0 select"
    :class="{
      solid: variant === 'solid',
    }"
    :default-value="defaultValue"
    :clearable="clearable"
    :placeholder="placeholder"
    :multiple="multiple"
    @update:value="emit('update:modelValue', $event)"
  />
</template>
<script setup lang="ts">
import type { SelectOption } from 'naive-ui'
import { NSelect } from 'naive-ui'
import { ref,   watch, defineProps, defineEmits, } from 'vue'
import type { IEventTarget } from '../types'

const props = withDefaults(
  defineProps<{
    modelValue?: any
    options?: SelectOption[]
    variant?: 'solid' | 'transparent'
    defaultValue?: string
    clearable?: boolean
    placeholder?: string
    multiple?: boolean
  }>(),
  {
    variant: 'solid',
    multiple: false,
  },
)

const emit = defineEmits(['update:modelValue'])
</script>
<style>
/* ! GLOBAL STYLES */

/* SELECT */
.select .n-base-selection__border {
  display: none !important;
}

.select .n-base-selection__state-border {
  display: none !important;
}

.select .n-base-suffix__arrow {
  filter: invert(100%);
}

.select .n-base-selection-input__content {
  font-weight: 500;
  font-size: 16px;
  font-weight: 500 !important;
  color: #202020;
}

.select .n-base-selection-label {
  background: transparent !important;
  border-radius: 12px;
}

.solid .n-base-selection-label {
  background: #f2f2f2 !important;
  border-radius: 12px;
}

.select .n-base-selection-tags {
  background: transparent !important;
  border-radius: 12px;
}

.solid .n-base-selection-tags {
  background: #f2f2f2 !important;
  border-radius: 12px;
}

/* DROPDOWN */
.n-select-menu {
  box-shadow: none !important;
  background: #f2f2f2;
  border-radius: 12px;
}

.n-base-select-menu .n-base-select-option.n-base-select-option--selected {
  color: #db3b4d !important;
}

.n-base-select-menu .n-base-select-option .n-base-select-option__check {
  color: #db3b4d !important;
}

.n-base-select-menu .n-base-select-option:active {
  color: #db2b4d;
}

.n-base-select-menu .n-base-select-option.n-base-select-option--pending {
  border-radius: 12px !important;
}

.n-base-select-menu
  .n-base-select-option.n-base-select-option--pending::before {
  background-color: transparent !important;
  border: 1px solid #db2b4d;
}
</style>
