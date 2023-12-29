<template>
  <div class="flex flex-col rounded-[12px] bg-white p-[16px] cursor-pointer">
    <img v-if="image" :src="image" alt="Course image" />
    <div v-else class="aspect-video bg-gray-100 w-full rounded-[12px]" />

    <h2 class="text-[24px] font-medium my-[16px]">
      {{ name }}
    </h2>

    <TagsBlock :tags="tags" />

    <div class="flex-grow" />

    <CategoryBlock :items="times" class="mt-[24px]">
      <template #icon>
        <img
          v-if="type === 'course'"
          src="../../assets/icons/products/course_calendar.svg"
          alt="Schedule icon"
          class="mr-[8px]"
        />
        <img
          v-else
          src="../../assets/icons/products/other_clock.svg"
          alt="Schedule icon"
          class="mr-[8px]"
        />
      </template>
    </CategoryBlock>
  </div>
</template>
<script setup lang="ts">
import type { Slot } from "../../types"
import CategoryBlock from "../misc/CategoryBlock.vue"
import TagsBlock from "../misc/TagsBlock.vue"

defineProps<{
  image?: string;
  name: string;
  times: Array<Slot>;
  tags: Array<string>;
  type: "course" | "academy" | "workshop";
}>()
</script>
