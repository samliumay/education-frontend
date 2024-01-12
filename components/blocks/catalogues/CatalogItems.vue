<template>
  <div class="mt-[48px] mb-[48px] grid grid-cols-3 gap-[24px] mx-[48px]">
    <div
      v-for="item in items"
      :key="item.product.id"
      class="flex flex-col rounded-[12px] bg-white p-[16px] cursor-pointer"
      @click="navigateTo(item.meta.detail_url)"
    >
      <img
        v-if="item.image_url"
        :src="item.image_url"
        :alt="item.alt_text"
        class="aspect-video w-full rounded-[12px]"
      />
      <div v-else class="aspect-video bg-gray-100 w-full rounded-[12px]" />

      <h2 class="text-[24px] font-medium my-[16px]">
        {{ item.product.name }}
      </h2>

      <TagsBlock :tags="getTagsFromProduct(item.product)" />

      <div class="flex-grow" />

      <CategoryBlock :items="item.product.schedule_slots" class="mt-[24px]">
        <template #icon>
          <img
            v-if="catalogue_type === 'course'"
            src="../../../assets/icons/products/course_calendar.svg"
            alt="Schedule icon"
            class="mr-[8px]"
          />
          <img
            v-else
            src="../../../assets/icons/products/other_clock.svg"
            alt="Schedule icon"
            class="mr-[8px]"
          />
        </template>
      </CategoryBlock>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getTagsFromProduct } from '../../../helpers/products'
import { type PageBlock, type Product } from '../../../types'
import CategoryBlock from '../../misc/CategoryBlock.vue'
import TagsBlock from '../../misc/TagsBlock.vue'

defineProps<{
  items: Array<PageBlock & { product: Product }>
  catalogue_type: 'academy' | 'course' | 'workshop'
}>()
</script>
