<template>
  <div>
    <h3 class="flex items-center gap-3">
      {{ $t('common.recommend') }}
      <img alt="Arrow" url="/icons/chevron_down.svg" />
    </h3>

    <div class="overflox-x-auto flex gap-4 mt-6">
      <div
        v-for="item in blockData.item"
        :key="item.id"
        class="bg-white border-brand-dark-gray p-3 border-[1px] rounded-[12px] flex flex-col md:flex-row gap-4 cursor-pointer"
        @click="navigateTo(`/product/${item.slug || item.id}`)"
      >
        <Cover
          :image-title="item?.title_image"
          :image-background="item?.background_image"
          class="aspect-[2/1] xl:w-[120px] xl:min-w-[120px] xl:h-auto lg:w-[70px] lg:min-w-[70px] lg:h-[35px] rounded-[12px] overflow-hidden"
        />

        <div class="flex flex-col justify-between gap-[16px] h-fit">
          <h1 class="text-xl md:text-2xl font-medium uppercase text-brand-red">
            {{ item.name }}
          </h1>

          <TagsBlock :tags="getTagsFromProduct(item, $t)" white-bg />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  blockData: any
}>()
</script>
