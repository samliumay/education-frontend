<!-- eslint-disable vue-scoped-css/enforce-style-type -->
<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    class="rich-text text-brand-gray"
    :class="withoutBlockPadding ? '' : 'block-padding-x'"
    v-html="sanitizedDescription"
  />
</template>
<script setup lang="ts">
import DOMPurify from 'dompurify'
import { computed } from 'vue'

const props = defineProps<{
  html: string
  blockData?: string
  withoutBlockPadding?: boolean
}>()

const sanitizedDescription = computed(() =>
  DOMPurify.sanitize(props?.html ?? props?.blockData ?? '<p>Unknown</p>'),
)
</script>
<style>
.rich-text a {
  color: #db3b4d;
  text-decoration: underline;
}
</style>
