<template>
  <render v-if="pageBlocks.length > 0" />
  <p v-else>Nothing to show</p>
</template>
<script setup lang="ts">
import { h } from "vue";

import { mapTypeBlock } from "../mappers/cms";
import type { PageBlock } from "../types";

const props = defineProps<{
  pageBlocks: PageBlock[];
}>();

let pageItems: any[] = [];

if (true) {
  pageItems = props.pageBlocks.map(
    (pageBlock) => () =>
      h(mapTypeBlock[pageBlock.meta.type as keyof typeof mapTypeBlock], {
        ...pageBlock,
      }),
  );
}

const render = h(
  "div",
  { class: "" },
  pageItems.map((item) => item?.()),
);
</script>
