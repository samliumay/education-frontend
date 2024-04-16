<template>
  <div class="inline-block gap-[8px] font-medium">
    <button
      v-for="tag in tags"
      :key="tag.value"
      class="rounded-[88px] border-[1px] px-[12px] py-[8px] text-[16px] mr-[8px] mb-[8px]"
      :class="{
        'bg-white':
          (selectedTags.length < 3 && maxThree) ||
          selectedTags.includes(tag.value),
        'bg-transparent': selectedTags.length >= 3,
        'border-brand-black': selectedTags.includes(tag.value),
        'border-gray-300': !selectedTags.includes(tag.value),
      }"
      :disabled="selectedTags.length >= 3 && maxThree"
      @click="
        $emit(
          'update:selectedTags',
          selectedTags.includes(tag.value)
            ? selectedTags.filter(
                (selectedTag: string | number) => selectedTag !== tag.value,
              )
            : [...selectedTags, tag.value],
        )
      "
    >
      {{ tag.label }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{
  tags: Array<{
    label: string
    value: number | string
  }>
  selectedTags: Array<string | number>
  maxThree?: boolean
}>()

const emit = defineEmits('update:selectedTags')

watch(
  () => props.maxThree,
  () => {
    if (props.maxThree) {
      emit('update:selectedTags', props.selectedTags.slice(0, 3))
    }
  },
)
</script>
