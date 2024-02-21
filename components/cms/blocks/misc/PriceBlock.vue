<template>
  <div
    class="block-padding-y block-padding-x overflow-hidden"
    data-cms="tariff-block"
  >
    <div class="grid grid-cols-1 md:grid-cols-5 gap-[24px]">
      <AppHeading class="col-span-1 md:col-span-2">
        {{ blockData.value.title }}
      </AppHeading>

      <p
        class="text-brand-gray text-lg font-medium col-span-1 md:col-span-3 mb-6 md:mb-10"
      >
        {{ blockData.value.description }}
      </p>
    </div>

    <PaymentOptions without-title :block-data="blockData.value.tariff_cards" />
  </div>
</template>
<script setup lang="ts">
import AppHeading from '@/components/AppHeading.vue'
import type { PageBlock } from '@/types/cms'

import PaymentOptions from '../products/details/PaymentOptions.vue'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
