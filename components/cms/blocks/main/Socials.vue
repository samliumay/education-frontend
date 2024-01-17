<template>
  <div class="mx-[28px] md:mx-[48px] flex flex-col items-center">
    <h2 class="text-[48px] mb-[48px] font-medium">Social Media</h2>

    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <div class="w-7/12 rounded-lg border-2 border-brand-gray">
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
            arcu et pretium.
          </p>
        </div>
        <div class="w-5/12 rounded-lg border-2 border-brand-gray">
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
            arcu et pretium.
          </p>
        </div>
      </div>

      <div class="flex gap-2">
        <div class="w-5/12 rounded-lg border-2 border-brand-gray">
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
            arcu et pretium.
          </p>
        </div>
        <div class="w-7/12 rounded-lg border-2 border-brand-gray">
          <p>
            Lorem ipsum dolor sit amet consectetur. Euismod elit enim cursus
            arcu et pretium.
            {{ items }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PageBlock } from '../../../../types/cms'

defineProps<{
  items: PageBlock[]
}>()
</script>
