<template>
  <div class="my-10">
    <h2
      class="text-4xl md:text-6xl mb-8 uppercase w-full font-medium mx-10"
    >
      {{ blockData.value.title }}
    </h2>

    <div
      v-for="(item, idx) in blockData.value.tags"
      :key="item.id"
      class="item-hover grid grid-cols-1 md:grid-cols-3 border-t-[1px] last:border-b-[1px] border-black px-10 py-4 gap-4 md:gap-16 hover:bg-brand-light-gray"
      :class="{ 'relative -top-[1px]': idx !== 0 }"
    >
      <div class="flex flex-col">
        <p
          class="text-red-400 text-[24px] md:text-[36px] font-medium mb-[16px] md:mb-[32px]"
        >
          {{ item.inner_text }}
        </p>

        <p class="text-gray-400">
          {{ item.inner_text }}
        </p>
      </div>

      <div class="flex flex-wrap justify-start gap-4">
        <a
          v-for="link in [item.link]"
          :key="link.id"
          class="rounded-[48px] py-1 px-3 font-medium text-brand-gray border-[1px] border-brand-gray h-fit flex gap-2
          items-center transition ease-in delay-100 transform active:scale-[0.93]"
          :href="link"
        >
          <p>{{ link }}</p>
          <img
            class="transform -rotate-90"
            src="/icons/chevron_down.svg"
            alt="Arrow"
          />
        </a>
      </div>

      <div class="flex md:justify-center items-center opacity-100 md:opacity-40 image-hover">
        <ImageBlock :image="blockData.value.icon" class="h-[160px]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ImageBlock from '@/components/cms/blocks/misc/ImageBlock.vue'
import type { PageBlock } from '@/types/cms'

defineProps<{
  blockData: PageBlock[]
}>()

</script>
<style scoped>
.item-hover:hover .image-hover {
  opacity: 1;
}
</style>
