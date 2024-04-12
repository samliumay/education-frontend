<template>
  <render v-if="blocks?.length > 0" />
  <AppNotFound v-else />
</template>
<script setup lang="ts">
import { computed, h } from 'vue'

import { mapTypeBlock } from '../../mappers/cms'
import type { PageBlock } from '../../types/cms'
import AppNotFound from '../AppNotFound.vue'
import ErrorBoundaryBlock from './blocks/misc/ErrorBoundaryBlock.vue'

const props = defineProps<{
  blocks: PageBlock[]
  blockProps?: any
  blockClasses?: string
}>()

// Get components from blocks meta type
const pageComponents = computed(() => {
  if (props.blocks?.length > 0) {
    return props.blocks.map(blockData => () => {
      const blockType = blockData?.type
        ? blockData?.type
        : blockData?.meta?.type

      if (!blockType) return undefined

      return h(mapTypeBlock[blockType], {
        blockData,
        extraProps: props.blockProps,
        ...props.blockProps,
      })
    })
  }

  return []
})

// Render props
const renderProps = computed(() => {
  if (props.blockClasses) {
    return { class: `${props?.blockClasses}` }
  }

  return {}
})

// Render components
const render = computed(() =>
  h(
    'div',
    renderProps.value,
    pageComponents.value.map(item =>
      h(ErrorBoundaryBlock, {}, item ? [item()] : []),
    ),
  ),
)
</script>
