<template>
  <div class="m-[48px] grid grid-cols-3 gap-[24px]">
    <div class="flex flex-col ml-[64px]">
      <img
        :src="item.quote_img.meta.download_url"
        :alt="item.quote_img.title"
        class="mb-[36px]"
      />
      <p
        class="font-medium mb-[36px]"
        :class="item.text_color ? `text-[${item.text_color}]` : 'text-red-400'"
      >
        {{ item.description }}
      </p>

      <p class="font-medium">
        {{
          item.person
            ? `${item.person.first_name} ${item.person.last_name}`
            : ""
        }}
      </p>
    </div>

    <div class="flex justify-center items-center">
      <img
        :src="item.title_img.meta.download_url"
        :alt="item.title_img.title"
        class="max-w-full relative -top-[18px]"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PageBlock } from "../../../types"

defineProps<{
  item: PageBlock;
}>()
</script>
