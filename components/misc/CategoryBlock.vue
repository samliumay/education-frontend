<template>
  <div class="flex items-center">
    <slot name="icon" />
    <template v-if="items.length && !isAcademy">
      <span v-for="(item, idx) in items" :key="item.id">
        {{
          `${$t(`common.weekdays.short.${item.weekday.toLowerCase()}`)} ` +
          `${item.start.slice(0, 5)}`
        }}
        {{ idx + 1 !== items.length ? '•&nbsp;' : '' }}
      </span>
    </template>
    <template v-else-if="items.length && isAcademy">
      <span v-for="(item, idx) in items" :key="item.id">
        {{ $t(`mappers.${item.schedule_type}`) }}
        {{ idx + 1 !== items.length ? '•&nbsp;' : '' }}
      </span>
    </template>
    <span v-else>{{ $t('common.unknown') }}</span>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  items: Array<any>
  isAcademy?: boolean
}>()
</script>
