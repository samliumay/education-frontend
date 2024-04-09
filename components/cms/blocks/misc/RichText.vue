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
<style lang="scss">
.rich-text h1, .rich-text h2, .rich-text h3, .rich-text p {
  color: #202020;
}

.rich-text h1 {
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 40px;
}

.rich-text h2 {
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 24px;

  @media screen and (max-width: 1024px) {
    font-size: 24px;
  }
}

.rich-text h3 {
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 12px;

  @media screen and (max-width: 1024px) {
    font-size: 20px;
  }
}

.rich-text p {
  margin-bottom: 6px;
}

.rich-text a {
  text-decoration: underline;
  color: #db3b4e;
}
</style>
