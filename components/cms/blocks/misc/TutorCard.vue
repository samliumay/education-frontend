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
    <!-- <p class="font-medium mb-6">
      {{ instructor.subject }}
    </p> -->

    <p class="text-red-400 underline" role="navigation">Подробнее →</p>
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
  }
}>()

// Get data
const imageId = computed(() => props?.instructor?.profile_pic)
const { data: image, pending } = await useFetch(
  getApiAddress(`/api/v2/wagtail/images/${imageId.value}/`),
  {
    deep: true,
    headers: {
      Authorization: 'Token f26dcfe588f64dd942c18451edab0a52a5d95a08',
    },
  },
)
</script>
