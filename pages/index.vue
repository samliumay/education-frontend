<template>
  <div v-if="!pending" class="flex flex-col gap-14 mt-10 mb-20">
    <PageConstructor :blocks="main.items[0].body" />
  </div>
</template>
<script setup lang="ts">
import PageConstructor from '../components/cms/PageConstructor.vue'
import { getApiAddress } from '../utils/getApiAddress'

useHead({
  title: 'Clavis - Home',
  meta: [
    {
      name: 'description',
      content: "That's a home page at Clavis",
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/',
    },
  ],
})

// API
const { data: main, pending } = await useFetch(
  getApiAddress(`/api/v2/wagtail/homepage/`),
  { deep: true },
)

console.debug(main)
</script>
