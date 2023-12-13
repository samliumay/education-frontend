<template>
  <div class="flex gap-[8px] text-[16px] font-medium">
    <button
      v-for="tag in tags"
      :key="tag.value"
      class="rounded-[88px] border-[1px] px-[12px] py-[8px]"
      :class="{
        'bg-white': selectedTags.length < 3 || selectedTags.includes(tag.value),
        'bg-transparent': selectedTags.length >= 3,
        'border-black': selectedTags.includes(tag.value),
        'border-gray-300': !selectedTags.includes(tag.value),
      }"
      :disabled="selectedTags.length >= 3"
      @click="
        $emit(
          'update:selectedTags',
          selectedTags.includes(tag.value)
            ? selectedTags.filter((selectedTag: string | number) => selectedTag !== tag.value)
            : [...selectedTags, tag.value],
        )
      "
    >
      {{ tag.label }}
    </button>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  tags: Array<{
    label: string,
    value: number | string,
  }>;
  selectedTags: Array<string | number>;
}>()

defineEmits("update:selectedTags")
</script>
