<template>
  <div
    class="bg-white pb-[40px] p-[16px] rounded-xl cursor-pointer text-center"
  >
    <ImageBlock
      v-if="!pending"
      :image="image"
      class="w-full h-[300px] rounded-xl overflow-hidden"
    />
    <p class="mt-[24px] text-[20px] text-red-400">
      {{ `${instructor.first_name} ${instructor.last_name}` }}
    </p>
    <p v-show="instructor.subject" class="font-medium mb-6">
      {{ instructor.subject }}
    </p>

    <NuxtLink :to="`/instructor/${instructor.id}`" class="text-red-400 underline" role="navigation">
      {{ $t('common.moreDetails') }} →
    </NuxtLink>
</div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

import { getApiAddress } from '../../../../utils/getApiAddress'
import ImageBlock from './ImageBlock.vue'

// Init component
const props = defineProps<{
  instructor: {
    first_name: string
    last_name: string
    subject: string
    profile_pic: number
    id: number
  }
}>()

// Get data
const imageId = computed(() => props?.instructor?.profile_pic)
const { data: image, pending } = await useFetch(
  getApiAddress(`/api/v2/wagtail/images/${imageId.value}/`),
  {
    deep: true,
    headers: {
      Authorization: 'Token ab09aca4ef07f510bb919bf24040997d4372b9d5',
    },
  },
)
</script>
