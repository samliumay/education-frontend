<template>
  <div class="block items-center">
    <div class="inline-block align-middle"><slot name="icon" /></div>
    <template v-if="items.length && !isAcademy">
      <span v-for="(item, idx) in items" :key="item.id" class="align-middle">
        {{
          `${$t(`common.weekdays.short.${item.weekday.toLowerCase()}`)} ` +
          `${item.start.slice(0, 5)}`
        }}
        {{ idx + 1 !== items.length ? '• ' : '' }}
      </span>
    </template>
    <template v-else-if="items.length && isAcademy">
      <span v-for="(item, idx) in items" :key="item.id" class="align-middle">
        {{ $t(`mappers.${item.schedule_type}`) }}
        {{ idx + 1 !== items.length ? '• ' : '' }}
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
