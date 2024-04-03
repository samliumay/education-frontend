<!-- eslint-disable vuejs-accessibility/no-distracting-elements -->

// ! Warning: There may be problems with this component, since its support has
ended. // ! If problems arise, it is better to rewrite it in css + js

<template>
  <div
    class="my-10 text-4xl text-brand-red font-medium w-[100vw] self-center"
    data-cms="main-running-text"
  >
    <marquee direction="left" behavior="scroll">
      <div class="flex gap-6 w-max p-2">
        <template v-for="(link, index) in [...blockData, ...blockData, ...blockData, ...blockData, ...blockData, ...blockData] as Array<any>" :key="link">
          <img
            v-if="index % 8 === 0"
            src="/icons/running_1.svg"
            alt="Star"
            class="w-[40px] h-[40px] -mb-1 object-fill"
          />
          <img
            v-else-if="index % 4 === 0"
            src="/icons/running_2.svg"
            alt="Star"
            class="w-[40px] h-[40px] -mb-1 object-fill"
          />
          <img
            :src="link"
            alt="Star"
            class="w-[40px] h-[40px] -mb-1 object-fill rounded-full"
          />
        </template>
      </div>
    </marquee>
    <marquee direction="right" behavior="scroll">
      <div class="flex gap-6 w-max p-2">
        <template
          v-for="(link, index) in [...blockData, ...blockData, ...blockData, ...blockData, ...blockData, ...blockData].reduce((acc, link) => {
            acc.unshift(link)
            return acc
          }, [] as Array<any>)"
          :key="link"
        >
          <img
            v-if="index % 8 === 0"
            src="/icons/running_3.svg"
            alt="Star"
            class="w-[40px] h-[40px] -mb-1 object-fill"
          />
          <img
            v-else-if="index % 4 === 0"
            src="/icons/running_4.svg"
            alt="Star"
            class="w-[40px] h-[40px] -mb-1 object-fill"
          />
          <img
            :src="link"
            alt="Star"
            class="w-[40px] h-[40px] -mb-1 object-fill rounded-full"
          />
        </template>
      </div>
    </marquee>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  blockData: PageBlock[]
}>()
</script>
