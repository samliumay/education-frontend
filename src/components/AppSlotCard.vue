<template>
  <article
    class="p-2 border-slate-500 border-2 rounded bg-slate-100 hover:bg-slate-200"
  >
    <dl>
      <div>
        <dt>{{ $t('slots.weekday') }}</dt>
        <dd>{{ slotValue.weekday }}</dd>
      </div>
      <div>
        <dt>{{ $t('slots.start') }}</dt>
        <!-- <dd><n-time :value="slotValue.start" /></dd> -->
      </div>
      <div>
        <dt>{{ $t('slots.end') }}</dt>
        <!-- <dd><n-time :value="slotValue.end" /></dd> -->
      </div>
      <div>
        <dt>{{ $t('slots.space') }}</dt>
        <dd>{{ slotValue.space }}</dd>
      </div>
      <div>
        <dt>{{ $t('slots.instructor') }}</dt>
        <dd>{{ slotValue.instuctor }}</dd>
      </div>
    </dl>
  </article>
</template>
<script setup lang="ts">
// import { NTime } from 'naive-ui'

import { Slot } from '@/types'

defineProps<{ slotValue: Slot }>()
</script>
<style scoped lang="scss">
dt,
dd {
  display: inline-block;
  padding: 0 1rem;
  width: 50%;
}

dt {
  font-weight: 600;
}

dl > div {
}
</style>
