<template>
  <div v-if="loadingProduct" class="p-4">
    <Loader />
  </div>
  <div class="flex flex-col gap-2 relative">
    <div class="flex flex-col sm:flex-row gap-[12px] sm:gap-[36px]">
      <button
        v-show="!deletingProduct"
        class="transition ease-in delay-100 transform active:scale-[0.93] absolute right-0 top-0"
        @click="deleteProduct"
      >
        <img
          src="/icons/cross.svg"
          alt="Close icon"
          class="w-[20px] h-[20px]"
        />
      </button>
      <Cover
        v-if="!loadingProduct"
        class="w-4/12"
        :image-title="product?.title_image"
        :image-background="product?.background_image"
      />

      <div class="flex flex-col gap-[16px] w-6/12">
        <div class="flex justify-between">
          <h3 class="font-medium text-3xl text-brand-red uppercase">
            {{ order?.product_page?.name ?? 'Unknown' }}
          </h3>
        </div>

        <div class="flex gap-[12px]">
          <div
            class="bg-brand-light-gray px-4 p-2 rounded-full flex items-center"
          >
            Ребенок:
            <AppSelect
              placeholder="Выберите ребенка"
              :options="userStore.getVisitorOptions"
              :value="order?.visitor?.id ?? 1"
              class="min-w-[200px]"
              @update:value="updateVisitor"
            />
          </div>
        </div>

        <p class="font-medium text-[24px]">
          {{ `${order?.calculated_price ?? 0} €` }}
          <span class="text-gray-400 ml-[8px]"> /мес </span>
        </p>
      </div>
    </div>
    <div>
      <n-space vertical>
        <div class="w-full flex gap-9">
          <div class="w-4/12 h-1" />
          <button
            class="flex gap-2 items-center text-xl font-medium cursor-pointe"
            @click="isShowDetails = !isShowDetails"
          >
            Выбранные дни посещения
            <img
              src="/icons/chevron_down.svg"
              alt="Arrow down"
              :class="{ '-rotate-90': !isShowDetails }"
            />
          </button>
        </div>
        <n-collapse-transition :show="isShowDetails">
          <div class="w-full flex gap-9">
            <div class="w-4/12 h-full" />
            <div class="flex flex-col gap-6">
              <div
                v-for="item in order?.schedule_slots"
                :key="item.key"
                class="bg-brand-light-gray py-1 px-4 rounded-full w-fit"
              >
                <p class="font-medium">
                  {{ item?.weekday ?? 'Monday' }}
                  {{ String(item?.start ?? '00:00').slice(0, 5) }}
                </p>
              </div>

              <div>
                <p class="text-xl font-medium mb-2">Дата первого посещения</p>

                <div class="bg-brand-light-gray py-1 px-4 rounded-full w-fit">
                  <p class="font-medium">
                    {{
                      `${getNearDate(
                        order?.schedule_slots[0]?.weekday,
                        order?.schedule_slots[0]?.start,
                      )}.${new Date().getFullYear()}`
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </n-collapse-transition>
      </n-space>
    </div>
    <div v-if="deletingProduct" class="flex gap-4 items-center">
      <Loader class="!w-6 !h-6" />
      <p class="text text-brand-red">Deleting...</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NCollapseTransition, NSpace } from 'naive-ui'
import { computed, ref } from 'vue'

import { useCartStore } from '../../store/cart'
import { useUserStore } from '../../store/user'
import { type OrderItem } from '../../types'
import { getApiAddress } from '../../utils/getApiAddress'
import { getNearDate } from '../../utils/getNearDate'
import Loader from '../AppLoader.vue'
import Cover from '../cms/blocks/misc/Cover.vue'

// Init props and emits
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
  getApiAddress(`/api/v2/wagtail/products/${id.value}/?fields=*`),
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

// Additional details
const isShowDetails = ref(false)

// Visitors
const userStore = useUserStore()
await userStore.getVisitors()

// eslint-disable-next-line vue/require-typed-ref
const visitor = ref()

const updateVisitor = async(el) => {
  await cart.updateOrderItem(orderId.value, { visitor: el })
  await cart.getCurrentOrder()
  visitor.value = el
}
</script>
