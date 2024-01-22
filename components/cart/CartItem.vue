<template>
  <div v-if="loadingProduct" class="p-4">
    <Loader />
  </div>
  <div class="flex flex-col gap-2">
    <div class="flex gap-[36px]">
      <Cover
        v-if="!loadingProduct"
        class="h-[200px]"
        :image-title="product?.background_image"
        :image-background="product?.title_image"
      />

      <div class="flex flex-col gap-[16px]">
        <div class="flex justify-between">
          <h3 class="font-medium text-[20px]">
            {{ order?.product_page?.name ?? 'Unknown' }}
          </h3>
          <button
            v-show="!deletingProduct"
            class="transition ease-in delay-100 transform active:scale-[0.93]"
            @click="deleteProduct"
          >
            <img src="/icons/cross.svg" alt="Close icon" />
          </button>
        </div>

        <div class="flex gap-[12px]">
          <!-- <div class="bg-gray-200 px-[16px] p-[8px] rounded-[10px]">
          Опция:
          {{
            order.schedule_type !== 'TERMINKARTEN'
              ? 'Абонемент'
              : 'Карта встреч'
          }}
        </div> -->
          <div class="bg-gray-200 px-[16px] p-[8px] rounded-[10px]">
            Ребенок: Иван Иванов
            <span class="text-blue-500 ml-[8px]"> Изменить </span>
          </div>
        </div>

        <p class="font-medium text-[24px]">
          {{ `${order?.purchase_options?.[0]?.base_price ?? 0} €` }}
          <span class="text-gray-400 ml-[8px]"> /мес </span>
        </p>

        <p class="flex gap-[8px] items-center font-medium cursor-pointer">
          Выбранные дни посещения
          <img src="/icons/chevron_down.svg" alt="Arrow down" />
        </p>
      </div>
    </div>
    <div v-if="deletingProduct" class="flex gap-4 items-center">
      <Loader class="!w-6 !h-6" />
      <p class="text text-brand-red">Deleting...</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

import { useCartStore } from '../../store/cart'
import { type OrderItem } from '../../types'
import Loader from '../AppLoader.vue'
import Cover from '../cms/blocks/misc/Cover.vue'

const props = defineProps<{
  order: OrderItem
}>()

defineEmits(['close'])

// Init store
const cart = useCartStore()

// APIs
// Get cover
const id = computed(() => props.order?.product_page?.id ?? 0)
const { data: product, pending: loadingProduct } = await useFetch(
  `https://api.clavis.the-o.co/api/v2/wagtail/products/${id.value}/?fields=*`,
  { deep: true },
)

// Delete item
const deletingProduct = ref(false)
const orderId = computed(() => props.order?.id ?? 0)
const deleteProduct = async () => {
  deletingProduct.value = true
  await cart.deleteOrderItem(orderId.value)
  deletingProduct.value = false
}
</script>
