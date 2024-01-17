<template>
  <div class="flex flex-col gap-[8px]">
    <img
      :src="product.title_img.meta.download_url"
      :alt="product.title_img.title"
      class="w-full"
    />
    <div class="text-gray-400">Wissenschaftliche Kurse • DE • ABS 234</div>
    <h3 class="text-[48px] text-red-400 font-medium">
      {{ product.title }}
    </h3>
    <TagsBlock :tags="getTagsFromProduct(product)" />

    <div
      v-for="slot in product.schedule_slots"
      :key="slot.id"
      class="grid grid-cols-8 gap-[8px]"
    >
      <p>
        {{ slot.weekday.slice(0, 2) }}
      </p>
      <img src="/icons/arrow_right__long.svg" alt="Arrow" />
      <p>
        {{ slot.start }}
      </p>
    </div>

    <button class="bg-gray-200 text-center block w-full py-[12px] px-[24px]">
      Подробнее
    </button>
  </div>
</template>
<script setup lang="ts">
import { getTagsFromProduct } from '../../../../helpers/products'
import { type Product } from '../../../../types'
import { type PageBlock } from '../../../../types/cms'
import TagsBlock from '../../../misc/TagsBlock.vue'

defineProps<{
  product: PageBlock & Product
}>()
</script>
