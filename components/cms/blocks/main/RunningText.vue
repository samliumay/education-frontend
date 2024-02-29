<!-- eslint-disable vuejs-accessibility/no-distracting-elements -->

// ! Warning: There may be problems with this component, since its support has
ended. // ! If problems arise, it is better to rewrite it in css + js

<template>
  <div
    class="my-10 text-4xl text-brand-red font-medium"
    data-cms="main-running-text"
  >
    <marquee direction="left" behavior="scroll">
      <div class="flex gap-6 w-max p-2">
        <template
          v-for="text in blockData.value.row1[0].split(' ')"
          :key="text"
        >
          <p>{{ text }}</p>
          <img
            src="/icons/star.svg"
            alt="Star"
            class="w-[40px] h-[40px] -mb-1"
          />
        </template>
      </div>
    </marquee>
    <marquee direction="right" behavior="scroll">
      <div class="flex gap-6 w-max p-2">
        <template
          v-for="text in blockData.value.row2[0].split(' ')"
          :key="text"
        >
          <p>{{ text }}</p>
          <img
            src="/icons/star.svg"
            alt="Star"
            class="w-[40px] h-[40px] -mb-1"
          />
        </template>
      </div>
    </marquee>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  blockData: PageBlock
}>()
</script>
