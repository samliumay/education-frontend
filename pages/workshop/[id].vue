<template>
  <HeaderBlock class="mt-[96px]" :product="product" type="course" />
  <DescriptionBlock class="mt-[96px] mb-[96px]" :product="product" />
</template>
<script setup lang="ts">
import { type Ref, ref } from "vue"

import DescriptionBlock from "../../components/products/DescriptionBlock.vue"
import HeaderBlock from "../../components/products/HeaderBlock.vue"
import type { Product } from "../../types"

const product: Ref<Product> = ref({} as Product)
</script>
