<template>
  <div class="mx-[48px]">
    <h2 class="text-[48px] mb-[48px] font-medium">UNSERE ANGEBOTE</h2>

    <div
      class="mb-[64px] rounded-[12px] bg-gray-200 grid grid-cols-3 gap-[24px] p-[8px]"
    >
      <div
        v-for="option in catalogueOptions"
        :key="option.value"
        class="font-medium rounded-[12px]"
        :class="{ 'bg-orange-400': option.value === currentCatalogue }"
        @click="currentCatalogue = option.value"
      >
        {{ option.label }}
      </div>
    </div>

    <div class="grid grid-cols-3 gap-x-[24px] gap-y-[64px]">
      <ProductCard
        v-for="item in items"
        :key="item.id"
        :product="item as any"
      />
    </div>

    <div class="mt-[64px] text-center">
      <button
        class="px-[64px] py-[12px] font-medium bg-orange-400 rounded-[12px]"
      >
        Перейти в каталог
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

import { PageBlock } from "../../../types"
import ProductCard from "../misc/ProductCard.vue"

defineProps<{
  items: PageBlock[];
}>()

const catalogueOptions = [
  {
    value: "course",
    label: "Kurse",
  },
  {
    value: "academy",
    label: "Akademie",
  },
  {
    value: "workshop",
    label: "Workshops",
  },
]

const currentCatalogue = ref("course")
</script>
