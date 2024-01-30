<template>
  <input
    class="bg-white w-full rounded-[12px] px-[24px] py-[16px] border-gray-200 border-[1px] disabled:bg-brand-light-gray"
    :placeholder="placeholder"
    :type="type ? type : 'text'"
    :value="modelValue"
    v-maska
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
}>()

defineEmits(['update:modelValue', 'blur'])
</script>
