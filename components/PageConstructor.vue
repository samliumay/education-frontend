<template>
  <render />
</template>
<script setup lang="ts">
import { h } from "vue"

import { mapTypeBlock } from "../mappers/cms"
import type { PageBlock } from "../types"

const props = defineProps<{
  pageBlocks: PageBlock[];
}>()

let pageItems: any[] = []

if (true) {
  pageItems = props.pageBlocks.map(
    pageBlock => () =>
      h(mapTypeBlock[pageBlock.meta.type as keyof typeof mapTypeBlock], {
        ...pageBlock,
      }),
  )
}

const render = h(
  "div",
  { class: "mt-[96px]" },
  pageItems.map(item => item?.()),
)
</script>
