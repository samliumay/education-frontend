<template>
  <n-modal :show="isOpen" @mask-click="$emit('close')">
    <div
      class="fixed w-[96%] h-[96%] bg-white rounded-md top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 overflow-y-auto"
    >
      <div class="flex flex-col">
        <div
          class="flex justify-end items-center border-b-[1px] border-brand-black py-[16px]"
        >
          <div
            class="flex gap-[20px] items-center mr-10"
            @click="$emit('close')"
          >
            {{ $t('common.actions.close') }}
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

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-[44px] m-10">
          <div v-if="(!productsPending && isProductSelect) || !productPending">
            <template v-if="isProductSelect">
              <p class="text-[24px] font-medium mb-[16px]">
                {{ $t('common.modals.chooseOption') }}
              </p>
              <n-select
                v-model:value="chosenProduct"
                :options="productOptions"
                class="my-2"
              />
            </template>
            <p class="text-[24px] font-medium mb-[16px]">
              {{ $t('common.modals.youChoosed') }}
            </p>
            <BuyProductCard
              v-if="!isProductSelect || chosenProduct !== null"
              :product="calculatedProduct"
            />
          </div>

          <div>

            <h1 class="font-medium text-4xl mb-10">
              {{ $t('common.modals.fillApplication') }}
            </h1>
            <p class="text-[24px] font-medium">{{ $t('cart.registerDetails.isParent') }}</p>

            <n-space>
              <n-radio
                :checked="isParent === true"
                value="yes"
                name="Parent"
                @change="checkParent(true)"
              >
                {{ $t('cart.registerDetails.yes') }}
              </n-radio>

              <n-radio
                class="ml-[12px]"
                :checked="isParent === false"
                value="no"
                name="Other"
                @change="checkParent(false)"
              >
                {{ $t('cart.registerDetails.no') }}
              </n-radio>
            </n-space>

            <GetChildData
              v-if="isParent"
              :newVisitorData="newVisitor"
              :IsMultiple="true"
              :visitor="visitors"
              :product="calculatedProduct"
              @update:visitors="el => (visitors = el)"
              @update:newVisitorData="(data: any) => (newVisitor = data)"
            />

            <p v-if="!isParent" class="text-brand-red">
              Attention!!! Only the parent has the right to fill out the child’s personal data.
              You can register your child for a trial lesson, but your registration must be activated by the child’s parent.
            </p>
              <VueDatePicker
                class="mt-10"
                v-model="date"
                @update:model-value="handleDate"
                :allowed-dates="allowedDates"
                :enable-time-picker="false"
                placeholder="Select a trial lesson day"
              />
            <form
              ref="form"
              class="flex flex-col gap-2 mt-10 relative"
              @submit.prevent="sendModalCourse"
            >
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-[12px]">
                <AppInput
                  v-model="registrationForm.first_name"
                  :placeholder="$t('cart.registerDetails.name')"
                  required
                  pattern=".{1,64}"
                  title="The name must be from 1 to 64 characters"
                  @blur="checkValidity"
                />
                <AppInput
                  v-model="registrationForm.last_name"
                  :placeholder="$t('cart.registerDetails.surname')"
                  required
                  pattern=".{1,64}"
                  title="Last name must be from 1 to 64 characters"
                  @blur="checkValidity"
                />
                <AppInput
                  v-model="registrationForm.relation"
                  :placeholder="$t('cart.registerDetails.relation')"
                  required
                  pattern=".{1,64}"
                  title="The name must be from 1 to 64 characters"
                  @blur="checkValidity"
                />
              </div>
              <AppInput
                v-model="registrationForm.email"
                :placeholder="$t('cart.registerDetails.email')"
                type="email"
                required
                @blur="checkValidity"
              />
              <AppInput
                v-model="registrationForm.phone"
                placeholder="+491112221212"
                pattern="^\+\d{8,15}$"
                type="tel"
                required
                @blur="checkValidity"
              />

              <div class="w-full mt-5 flex gap-4">
                <NCheckbox v-model:checked="checkbox" required class="pt-1" />
                <p>
                  {{ $t('common.modals.registerInService') }}
                  <NuxtLink
                    to="/legal"
                    class="underline underline-offset-8 cursor-pointer text-brand-black hover:text-brand-red"
                  >
                    {{ $t('common.modals.termsOfAgreement') }}
                  </NuxtLink>
                </p>
              </div>

              <AppButton
                class="w-full mt-10"
                type="submit"
                :disabled="!(form?.checkValidity() && checkbox)"
              >
                {{ $t('common.actions.send') + $t(' / ') + $t('common.actions.submit')}}
              </AppButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  </n-modal>
</template>
<script setup lang="ts">
import { NCheckbox, NModal, NSelect, NRadio } from 'naive-ui'
import { computed, type Ref, ref, type VNodeRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import AppInput from '@/components/AppInput.vue'
import BuyProductCard from '@/components/buy/BuyProductCard.vue'
import GetChildData from '@/components/buy/GetChildData.vue'
import { useCartStore } from '@/store/cart'
import { useUserStore } from '@/store/user'
import { getApiAddress } from '@/utils/getApiAddress'
import { email } from '@vuelidate/validators';

const props = defineProps<{
  isOpen: boolean
  isProductSelect?: boolean
}>()
// Init component
const emit = defineEmits(['close'])

// Init hooks
const route = useRoute()

const userStore = useUserStore()
const cartStore = useCartStore()

const date = ref();
const allowedDates = computed(() => {
  const dates = [];
  const schedule_slots = product.value.schedule_slots;
  const weekdayMap = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  };

  const targetWeekdays = schedule_slots.map(slot => weekdayMap[slot.weekday]);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    if (targetWeekdays.includes(date.getDay())) {
      dates.push(date);
    }
  }

  return dates;
});


const handleDate = (modelData) => {
  date.value = modelData;
}

const visitors = ref<any>()
const checkbox = ref(false)

const selectedDate =ref({
  today: new Date()
})

const isParent = ref(true)
const parent = ref({
  parent: 'parent',
  other:'other'
})

const { locale } = useI18n({ useScope: 'global' })

const isSlug = computed(() => !/^\d+$/.test(route.params.id as string))

const { data: products, pending: productsPending } = await useAsyncData(
  'productsListModal',
  () =>
    $fetch(getApiAddress(`/api/v2/wagtail/products/`), {
      params: {
        locale: locale.value,
        fields: '*',
        product_type: 'Course',
      },
    }),
  { watch: [locale], deep: true },
)

const productOptions = computed(
  () =>
    products.value?.items.map(targetProduct => ({
      value: targetProduct.id,
      label: targetProduct.name,
    })) || [],
)

// Get data
const { data: product, pending: productPending } = await useAsyncData(
  'productsModal',
  () =>
    $fetch(
      getApiAddress(
        isSlug.value
          ? `/api/v2/wagtail/products/`
          : `/api/v2/wagtail/products/${route.params.id}/`,
      ),
      {
        params: {
          locale: locale.value,
          fields: '*',
          slug: isSlug.value ? route.params.id : undefined,
        },
      },
    ).then(data => (isSlug.value ? data?.items[0] : data)),
  { watch: [locale, isSlug], deep: true },
)

//Child Data
const newVisitor = ref({
  first_name: '',
  last_name: '',
  birth_date: ''
})




// Registration
const registrationForm = ref({
  first_name: userStore.user.first_name,
  last_name: userStore.user.last_name,
  email: userStore.user.email,
  phone: userStore.user.phone_number,
  relation: ''
})

const checkParent = (isParentFlag : boolean) => {
  isParent.value = isParentFlag
  if(!isParentFlag){
    registrationForm.value.first_name = ''
    registrationForm.value.last_name = ''
    registrationForm.value.email = ''
    registrationForm.value.phone = ''
    registrationForm.value.relation = ''
  }else{
    registrationForm.value.first_name = userStore.user.first_name,
    registrationForm.value.last_name = userStore.user.last_name,
    registrationForm.value.email = userStore.user.email,
    registrationForm.value.phone = userStore.user.phone_number,
    registrationForm.value.relation = ''
  }
}

const chosenProduct: Ref<any> = ref(null)

const calculatedProduct = computed(() =>
  props.isProductSelect
    ? products.value?.items.find(
        targetProduct => targetProduct.id === chosenProduct.value,
      )
    : product.value,
)

const sendModalCourse = async () => {
  try {
    if(newVisitor.value.first_name.length > 0 && newVisitor.value.last_name.length > 0 && newVisitor.value.birth_date.length > 0)
    {

    let newVisitorID: number;

    await userStore.postVisitor(newVisitor.value).then((res: any) => {
      newVisitorID = res.id
      cartStore.sendVisitRequest({
      product_page: calculatedProduct.value.id,
      children: userStore.visitors.filter(el => newVisitorID === el.id),
      adults: [registrationForm.value],
      date: date.value,
    });
    });
  }else{
    await cartStore.sendVisitRequest({
      product_page: calculatedProduct.value.id,
      children: userStore.visitors.filter(el => visitors.value.includes(el.id)),
      adults: [registrationForm.value],
      date: date.value,
    });
  }
    emit('close');
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

// Form
const checkValidity = (event: {
  target: { reportValidity: () => void }
  relatedTarget: { focus: () => void }
}) => {
  event.target.reportValidity()
  event.relatedTarget?.focus()
}

const form = ref<VNodeRef | undefined>(undefined)
</script>
<style>
  .dp__input {
    height: 58px;
    border-radius: 12px;
  }
</style>