<template>
  <article
    class="p-2 border-slate-500 border-2 rounded bg-slate-100 hover:bg-slate-200"
    :class="{ active: selected }"
  >
    <dl>
      <div>
        <dt>{{ $t("slots.selected") }}</dt>
        <dd>
          <n-icon size="20">
            <check v-if="selected" />
            <times v-else />
          </n-icon>
        </dd>
      </div>
      <div>
        <dt>{{ $t("slots.weekday") }}</dt>
        <dd>{{ $t(`dates.weekdays.${slotValue.weekday}`) }}</dd>
      </div>
      <div>
        <dt>{{ $t("slots.start") }}</dt>
        <dd>{{ slotValue.start }}</dd>
      </div>
      <div>
        <dt>{{ $t("slots.end") }}</dt>
        <dd>{{ slotValue.end }}</dd>
      </div>
      <div>
        <dt>{{ $t("slots.space") }}</dt>
        <dd>{{ slotValue.space }}</dd>
      </div>
      <div>
        <dt>{{ $t("slots.instructor") }}</dt>
        <dd>{{ slotValue.instructor }}</dd>
      </div>
    </dl>
  </article>
</template>
<script setup lang="ts">
import { Check, Times } from "@vicons/fa"
import { NIcon } from "naive-ui"

import { type Slot } from "../types"

defineProps<{ slotValue: Slot; selected: boolean }>()
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
.active {
  @apply bg-slate-300;
}
</style>
