<template>
  <div v-if="loadingProduct" class="p-4">
    <Loader />
  </div>
  <div class="flex flex-col gap-2 relative">
    <div class="flex flex-col md:flex-row gap-[12px] md:gap-[36px]">
      <button
        v-show="!deletingProduct"
        type="button"
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
        class="xl:w-[260px] xl:h-[140px] lg:w-[220px] lg:h-[110px] md:w-[280px] md:h-[140px]"
        :image-title="product?.title_image"
        :image-background="product?.background_image"
        :category="String(product?.product_type).toLocaleLowerCase()"
        :age-group="String(product?.age_group).toLocaleLowerCase()"
      />

      <div class="flex flex-col gap-[16px] w-6/12">
        <div class="flex justify-between">
          <h3 class="font-medium text-3xl text-brand-red uppercase">
            {{ order?.product_page?.name ?? $t('cart.unknown') }}
          </h3>
        </div>

        <div class="flex gap-[12px]">
          <div
            class="bg-brand-light-gray px-4 p-2 rounded-full items-center"
          >
            {{ $t('common.tableOptions.option') }}: <span
              class="font-medium"
              >{{
                $t(
                  `common.purchaseOption.${purchaseOption.schedule_type}`,
                ) ===
                `common.purchaseOption.${purchaseOption.schedule_type}`
                  ? $t(`common.purchaseOption.default`)
                  : $t(
                      `common.purchaseOption.${purchaseOption.schedule_type}`,
                    )
              }}</span>
          </div>
          <div
            class="bg-brand-light-gray px-4 p-2 rounded-full flex items-center"
          >
            Ребенок:
            <AppSelect
              :placeholder="$t('common.children.selectChild')"
              :options="userStore.getVisitorOptions"
              :value="order?.visitor?.id ?? 1"
              class="min-w-[200px]"
              @update:value="updateVisitor"
            />
          </div>
        </div>

        <p class="font-medium text-[24px]">
          {{ `${order?.calculated_price ?? 0} €` }}
          <span
            v-if="
              ['Abonnement (1 visit / week)', 'Abonnement (2 visit / week)', 'Abonnement (3 visit / week)'].includes(purchaseOption.schedule_type)
            "
            class="text-gray-400 ml-[8px]"
          >
            {{ $t('cart.perMonth') }}
          </span>
        </p>
      </div>
    </div>
    <div>
      <n-space vertical>
        <div class="w-full flex gap-9">
          <div
            class="hidden xl:w-[260px] xl:block lg:w-[220px] lg:block md:w-[280px] md:block"
          />
          <button
            type="button"
            class="flex gap-2 items-center text-xl font-medium cursor-pointe"
            @click="isShowDetails = !isShowDetails"
          >
            {{ $t('cart.selectedDays') }}
            <img
              src="/icons/chevron_down.svg"
              alt="Arrow down"
              :class="{ '-rotate-90': !isShowDetails }"
            />
          </button>
        </div>
        <n-collapse-transition :show="isShowDetails">
          <div class="w-full flex gap-9">
            <div
              class="hidden xl:w-[260px] xl:block lg:w-[220px] lg:block md:w-[280px] md:block"
            />
            <div class="flex flex-col gap-6">
              <div
                v-for="item in order?.schedule_slots"
                :key="item.key"
                class="bg-brand-light-gray py-1 px-4 rounded-full w-fit"
              >
                <p class="font-medium">
                  {{ item?.weekday ?? $t('common.weekdays.monday') }}
                  {{ String(item?.start ?? '00:00').slice(0, 5) }}
                </p>
              </div>

              <div>
                <p class="text-xl font-medium mb-2">
                  {{ $t('cart.firstAppointment') }}
                </p>

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
      <p class="text text-brand-red">{{ $t('common.status.delete') }}</p>
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

const purchaseOption = computed(() => props.order ? props.order.product_page.purchase_options.find(option => props.order.purchase_option === option.id) : {})

// Init store
const cart = useCartStore()

const { locale } = useI18n({ useScope: 'global' })

// APIs
// Get cover
const id = computed(() => props.order?.product_page?.id ?? 0)

const { data: product, pending: loadingProduct } = await useAsyncData(
  'products',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/products/${id.value}/`), {
      params: {
        locale: locale.value,
        fields: '*',
      },
    }),
  { watch: [locale], deep: true },
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

const updateVisitor = async el => {
  await cart.updateOrderItem(orderId.value, { visitor: el })
  await cart.getCurrentOrder()
  visitor.value = el
}
</script>
