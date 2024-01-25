<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="rich-text text-gray-400 mt-[24px] mx-10"
    v-html="sanitizedDescription"
  />
</template>
<script setup lang="ts">
import DOMPurify from 'dompurify'
import { computed } from 'vue'

const props = defineProps<{
  html: string
}>()

const sanitizedDescription = computed(() =>
  DOMPurify.sanitize(props?.html ?? '<p>Unknown</p>'),
)
</script>
<style>
.rich-text a {
  color: #DB3B4D;
  text-decoration: underline;
}
</style>
