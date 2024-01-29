<template>
  <div class="bg-white rounded-[12px] flex gap-[16px] flex-col">
    <div class="aspect-video rounded-[12px] overflow-hidden">
      <Cover :image-title="product?.title_image" :image-background="product?.background_image" />
    </div>

    <div class="flex flex-col gap-[16px]">
      <h1 class="text-2xl font-medium">
        {{ product.name }}
      </h1>

      <TagsBlock :tags="getTagsFromProduct(product)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { getTagsFromProduct } from '../../helpers/products'
import type { Product } from '../../types'
import Cover from '../cms/blocks/misc/Cover.vue'
import TagsBlock from '../misc/TagsBlock.vue'

defineProps<{
  product: Product
}>()
</script>
