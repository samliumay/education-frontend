<template>
  <n-breadcrumb class="mt-6 mb-10 px-10">
    <n-breadcrumb-item class="text-brand-gray">
      <NuxtLink to="/">{{ $t('common.main') }}</NuxtLink>
    </n-breadcrumb-item>
    <n-breadcrumb-item сlass="text-brand-gray">
      {{ $t('common.schoolOffer') }}
    </n-breadcrumb-item>
  </n-breadcrumb>

  <AppModalBackCall
    v-if="isOpenModalBackCall"
    :is-open="isOpenModalBackCall"
    @close="isOpenModalBackCall = false"
  />

  <h1
    class="px-3 lg:px-10 text-[48px] lg:text-[72px] text-brand-red font-semibold mb-6 uppercase"
  >
    {{ blockData.heading }}
  </h1>

  <div class="flex flex-col mb-24 px-3 lg:px-10">
    <div class="pt-4">
      <div class="flex flex-col lg:flex-row gap-5 lg:gap-40">
        <div class="flex flex-col gap-4">
          <h2 class="text-[28px] lg:text-[36px] mb-3 lg:mb-6 font-medium">
            {{ blockData.apply_block[0].value?.title }}
          </h2>
          <p class="font-medium">
            {{ blockData.apply_block[0].value?.inner_text }}
          </p>
          <div>
            <button
              class="rounded-[12px] bg-brand-yellow py-3 px-6 w-full md:w-auto mt-4 inline-block"
              @click="isOpenModalBackCall = true"
            >
              {{ $t('schoolOffer.application') }}
            </button>
          </div>
        </div>

        <ImageBlock
          :image="blockData.apply_block[0].value?.photo"
          image-class="rounded-md order-2 lg:order-1"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { ref } from 'vue'

import type { PageBlock } from '../../../../types/cms'
import AppModalBackCall from '../../../modals/AppModalBackCall.vue'
import ImageBlock from '../misc/ImageBlock.vue'

defineProps<{
  blockData: PageBlock[]
}>()

const isOpenModalBackCall = ref(false)
</script>
