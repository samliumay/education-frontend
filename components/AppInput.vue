<template>
  <input
    v-maska
    class="w-full rounded-[12px] px-[24px] py-[16px] border-gray-200 border-[1px] "
    :class="{ 'bg-brand-light-gray': isGray && modelValue, 'bg-white disabled:bg-brand-light-gray': !isGray || !modelValue }"
    :placeholder="placeholder"
    :type="type ? type : 'text'"
    :value="modelValue"
    maxlength="64"
    minlength="1"
    :data-maska="maska"
    @input="
      $emit(
        'update:modelValue',
        ($event.target as unknown as IEventTarget).value,
      )
    "
    @blur="event => $emit('blur', event)"
  />
</template>
<script setup lang="ts">
import type { IEventTarget } from '../types'

defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  maska?: string
  isGray?: boolean
}>()

defineEmits(['update:modelValue', 'blur'])
</script>
