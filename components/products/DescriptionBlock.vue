<template>
  <div class="grid grid-cols-2 gap-[24px] px-[48px] min-h-[200px]">
    <div class="relative">
      <h2 class="text-[48px] font-medium mr-[36px]">О курсе</h2>
      <img
        src="../../assets/icons/products/line_pen.svg"
        alt="Pen"
        class="absolute top-[45px] left-[150px]"
      />
    </div>

    <div class="flex gap-[12px] mt-[48px]">
      <p class="whitespace-pre-wrap font-medium text-[16px]">
        {{ product.description }}
      </p>
      <div class="shrink-0">
        <img src="../../assets/icons/products/guitar.svg" alt="Guitar" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from "../../types"

defineProps<{
  product: Product;
}>()
</script>
