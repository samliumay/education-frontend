<template>
  <render v-if="blocks?.length > 0" />
  <AppNotFound v-else />
</template>
<script setup lang="ts">
import { computed, h } from 'vue'

import { mapTypeBlock } from '../../mappers/cms'
import type { PageBlock } from '../../types/cms'
import AppNotFound from '../AppNotFound.vue'

const props = defineProps<{
  blocks: PageBlock[]
  blockProps?: any
  blockClasses?: string
}>()

// Get components from blocks meta type
const pageComponents = computed(() => {
  if (props.blocks?.length > 0) {
    return props.blocks.map(
      blockData => () =>
        h(mapTypeBlock[blockData.meta.type], {
          blockData,
          extraProps: props.blockProps,
        }),
    )
  }

  return []
})

// Render components
const render = computed(() =>
  h(
    'div',
    { class: `${props.blockClasses}` },
    pageComponents.value.map(item => item?.()),
  ),
)
</script>
