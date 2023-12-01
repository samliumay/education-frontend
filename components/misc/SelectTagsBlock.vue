<template>
  <div class="flex gap-[8px] text-[16px] font-medium">
    <button
      v-for="tag in tags"
      :key="tag"
      class="rounded-[88px] border-[1px] px-[12px] py-[8px]"
      :class="{
        'bg-white': selectedTags.length < 3 || selectedTags.includes(tag),
        'bg-transparent': selectedTags.length >= 3,
        'border-black': selectedTags.includes(tag),
        'border-gray-300': !selectedTags.includes(tag),
      }"
      :disabled="selectedTags.length >= 3"
      @click="
        $emit(
          'update:selectedTags',
          selectedTags.includes(tag)
            ? selectedTags.filter((selectedTag: string) => selectedTag !== tag)
            : [...selectedTags, tag],
        )
      "
    >
      {{ tag }}
    </button>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  tags: Array<string>;
  selectedTags: Array<string>;
}>()

defineEmits("update:selectedTags")
</script>
