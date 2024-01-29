<template>
  <div class="flex items-center">
    <slot name="icon" />
    <template v-if="items.length">
      <span v-for="(item, idx) in items" :key="item.id">
        {{ `${item.weekday.slice(0, 2)} ${item.start.slice(0, 5)}` }}
        {{ idx + 1 !== items.length ? '•&nbsp;' : '' }}
      </span>
    </template>
    <span v-else>Unknown</span>
  </div>
</template>
<script setup lang="ts">
import type { Slot } from '../../types'

defineProps<{
  items: Array<Slot>
}>()
</script>
