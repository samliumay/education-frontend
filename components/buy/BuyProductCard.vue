<template>
  <div class="bg-white rounded-[12px] p-[16px] flex gap-[16px]">
    <div class="aspect-video rounded-[12px] overflow-hidden">
      <img
        v-if="product.photo"
        :src="product.photo"
        class="rounded-[12px]"
        alt="Course image"
      />
      <div v-else class="bg-gray-100 rounded-[12px] h-full w-full" />
    </div>

    <div class="flex flex-col gap-[16px]">
      <h1 class="text-[24px] font-medium">
        {{ product.name }}
      </h1>

      <TagsBlock :tags="getTagsFromProduct(product)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { getTagsFromProduct } from '../../helpers/products'
import type { Product } from '../../types'
import TagsBlock from '../misc/TagsBlock.vue'

defineProps<{
  product: Product
}>()
</script>
