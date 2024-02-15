<template>
  <div
    class="bg-white border-brand-dark-gray p-4 border-[1px] rounded-[12px] flex gap-6"
  >
    <Cover
      :image-title="product?.title_image"
      :image-background="product?.background_image"
      class="xl:w-[180px] xl:min-w-[180px] xl:h-auto lg:w-[140px] lg:min-w-[140px] lg:h-[70px] rounded-[12px] overflow-hidden"
    />

    <div class="flex flex-col justify-between gap-[16px] h-fit">
      <h1 class="text-2xl font-medium uppercase text-brand-red">
        {{ product.name }}
      </h1>

      <TagsBlock :tags="getTagsFromProduct(product, $t)" />
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
