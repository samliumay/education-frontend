<template>
  <TemplateHome />
</template>
<script setup lang="ts">
import TemplateHome from '../components/cms/templates/TemplateHome.vue'

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
</script>
