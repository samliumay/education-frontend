<template>
  <TemplatePrices />
</template>
<script setup lang="ts">
import TemplatePrices from '../components/cms/templates/TemplatePrices.vue'

useHead({
  title: 'Clavis - Prices',
  meta: [
    {
      name: 'description',
      content: "That's a prices page at Clavis",
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://clavis-schule.de/',
    },
  ],
})
</script>
