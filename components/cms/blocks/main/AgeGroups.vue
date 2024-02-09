<template>
  <div class="block-padding-y" data-cms="main-age-groups">
    <AppHeading class="block-padding-x">
      {{ blockData.value.heading }}
    </AppHeading>

    <div
      v-for="(item, idx) in blockData.value.blocks"
      :key="item.description"
      class="item-hover grid grid-cols-1 md:grid-cols-3 border-t-[1px] last:border-b-[1px] border-black block-padding-x py-4 gap-4 md:gap-16 hover:bg-brand-light-gray"
      :class="{ 'relative -top-[1px]': idx !== 0 }"
    >
      <div class="flex flex-col">
        <p
          class="text-brand-red text-[24px] md:text-[36px] font-medium mb-[16px] md:mb-[32px]"
        >
          {{ item.title }}
        </p>

        <p class="brand-gray font-medium">
          {{ item.description }}
        </p>
      </div>

      <div class="flex flex-wrap justify-start content-start gap-4">
        <a
          v-for="tag in item.tags"
          :key="tag.link"
          class="rounded-[48px] py-1 px-3 font-medium text-brand-gray border-[1px] border-brand-gray h-fit flex gap-2 items-center transition ease-in delay-100 transform active:scale-[0.93]"
          :href="tag.link"
        >
          <p>{{ tag.inner_text }}</p>
          <img
            class="transform -rotate-90"
            src="/icons/chevron_down.svg"
            alt="Arrow"
          />
        </a>
      </div>

      <div
        class="flex md:justify-center items-center opacity-100 md:opacity-40 image-hover"
      >
        <ImageBlock :image="item.icon" class="h-[130px]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import AppHeading from '@/components/AppHeading.vue'
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
