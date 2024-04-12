<template>
  <div v-if="blockData.length !== 0">
    <h3 class="flex items-center gap-3 text-xl md:text-2xl font-medium">
      {{ $t('common.recommend') }}
      <img
        alt="Arrow"
        src="/icons/chevron_down.svg"
        @click="showBlock = !showBlock"
      />
    </h3>

    <div v-if="showBlock" class="overflow-x-auto flex gap-4 mt-6">
      <div
        v-for="item in blockData"
        :key="item.id"
        class="bg-brand-light-gray border-brand-dark-gray p-3 border-[1px] rounded-[12px] flex flex-col md:flex-row gap-4 cursor-pointer max-w-[50%]"
        @click="
          navigateTo(
            `/product/${
              item.recommended_page.slug || item.recommended_page.id
            }`,
          )
        "
      >
        <Cover
          :image-title="item?.recommended_page.title_image"
          :image-background="item?.recommended_page.background_image"
          class="aspect-[2/1] xl:w-[120px] xl:min-w-[120px] xl:h-auto lg:w-[70px] lg:min-w-[70px] lg:h-[35px] rounded-[12px] overflow-hidden"
        />

        <div class="flex flex-col justify-between gap-[16px] h-fit">
          <h1 class="text-xl md:text-2xl font-medium uppercase text-brand-red">
            {{ item?.recommended_page.name }}
          </h1>

          <TagsBlock
            :tags="getTagsFromProduct(item.recommended_page, $t)"
            white-bg
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { getTagsFromProduct } from '../helpers/products'
import Cover from './cms/blocks/misc/Cover.vue'

defineProps<{
  blockData: any
}>()

const showBlock = ref(false)
</script>
