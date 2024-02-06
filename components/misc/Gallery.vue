<template>
  <div>
    <img
      :src="currentPhoto.url"
      :alt="currentPhoto.title"
      class="block w-full aspect-square rounded-[12px]"
    />
    <div class="flex flex-row items-center justify-center sm:relative sm:block">
      <img
        class="rotate-180 sm:absolute sm:-left-2 sm:top-1/2 sm:-translate-y-1/2"
        :class="displayIndex > 0 ? 'fill-gray-200' : 'fill-gray-400'"
        src="/icons/chevron_left_base.svg"
        alt="Arrow"
        @click="handleChangeDisplay('left')"
      />
      <div class="hidden sm:grid grid-cols-4 gap-2">
        <img
          v-for="(photo, idx) in displayPhotos"
          :key="photo.title + photo.url"
          :alt="photo.title"
          :src="photo.url"
          @click="selectPhoto(idx + displayIndex)"
        />
      </div>
      <img
        class="ml-1 sm:absolute sm:-right-2 sm:top-1/2 sm:-translate-y-1/2"
        :class="displayIndex > 0 ? 'fill-gray-200' : 'fill-gray-400'"
        src="/icons/chevron_left_base.svg"
        alt="Arrow"
        @click="handleChangeDisplay('right')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

interface Photo {
  url: string
  title: string
}

const props = defineProps<{
  photos: Photo[]
}>()

const currentPhotoIdx = ref(0)

const displayIndex = ref(0)

const currentPhoto = computed(() => props.photos[currentPhotoIdx.value])

const displayPhotos = computed(() =>
  props.photos.slice(displayIndex.value, displayIndex.value + 4),
)

const selectPhoto = (id: number) => {
  currentPhotoIdx.value = id
}

const handleChangeDisplay = (direction: 'left' | 'right') => {
  if (direction === 'left' && displayIndex.value !== 0) {
    displayIndex.value--
    if (currentPhotoIdx.value > displayIndex.value + 3) {
      currentPhotoIdx.value = displayIndex.value + 3
    }
  } else if (displayIndex.value !== props.photos.length - 1) {
    displayIndex.value++
    if (currentPhotoIdx.value < displayIndex.value) {
      currentPhotoIdx.value = displayIndex.value
    }
  }
}
</script>
