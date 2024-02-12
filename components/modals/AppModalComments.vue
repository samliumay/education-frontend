<template>
  <n-modal :show="isOpen" @mask-click="$emit('close')">
    <div
      class="fixed w-[70%] h-fit bg-white rounded-md top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 overflow-y-auto"
    >
      <div class="flex flex-col">
        <div
          class="flex justify-between items-center border-b-[1px] border-black py-[16px]"
        >
          <h1 class="font-medium text-4xl ml-10">
            {{ $t('common.modals.comment') }}
          </h1>

          <div
            class="flex gap-[20px] items-center mr-10"
            @click="$emit('close')"
          >
            <button
              class="bg-white border-[1px] border-brand-black w-[35px] h-[35px] rounded-full flex items-center justify-center hover:bg-brand-light-gray transition ease-in delay-100 transform active:scale-[0.93]"
            >
              <img
                src="/icons/cross.svg"
                alt="close"
                class="w-[15px] h-[15px]"
              />
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-10 m-10">
          <div>
            <p>{{ String(comment).trim() || $t('common.notFound') }}</p>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { NModal } from 'naive-ui'

defineProps<{
  isOpen: boolean
  comment: string
}>()

defineEmits(['close'])
</script>
