<template>
  <div class="flex items-center">
    <slot name="icon" />
    <span v-for="(item, idx) in items" :key="item.id">
      {{ `${item.weekday.slice(0, 2)} ${item.start.slice(0, 5)}` }}
      {{ idx + 1 !== items.length ? "•&nbsp;" : "" }}
    </span>
  </div>
</template>
<script setup lang="ts">
import type { Slot } from "../../types"

defineProps<{
  items: Array<Slot>;
}>()
</script>
