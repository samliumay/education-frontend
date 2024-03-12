<template>
  <div
    class="block-padding-y block-padding-x overflow-hidden"
    data-cms="tariff-block"
  >
    <div class="grid grid-cols-1 md:grid-cols-7 gap-[24px] md:mb-6">
      <AppHeading class="col-span-1 md:col-span-3">
        {{ blockData.value.title }}
      </AppHeading>

      <p
        class="text-brand-gray text-lg font-medium col-span-1 md:col-span-4 mb-3 md:mb-10"
      >
        {{ blockData.value.description }}
      </p>
    </div>

    <AppButton class="block mb-8 w-full md:w-auto" @click="navigateToCatalog">
      {{ $t('common.actions.buy') }}
    </AppButton>

    <PaymentOptions without-title :block-data="blockData.value.tariff_cards" />
  </div>
</template>
<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import AppHeading from '@/components/AppHeading.vue'
import type { PageBlock } from '@/types/cms'

import PaymentOptions from '../products/details/PaymentOptions.vue'

const props = defineProps<{
  blockData: PageBlock[]
}>()

const navigateToCatalog = () => {
  navigateTo(props.blockData.value.link.replace(window.location.origin, ''))
}
</script>
