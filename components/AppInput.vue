<template>
  <input
    class="bg-white w-full rounded-[12px] px-[24px] py-[16px] border-gray-200 border-[1px] disabled:bg-brand-light-gray"
    :placeholder="placeholder"
    :type="type ? type : 'text'"
    :value="modelValue"
    @input="
      $emit(
        'update:modelValue',
        ($event.target as unknown as IEventTarget).value,
      )
    "
    @blur="$emit('blur')"
  />
</template>
<script setup lang="ts">
import type { IEventTarget } from '../types'

defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
}>()

defineEmits(['update:modelValue', 'blur'])
</script>
